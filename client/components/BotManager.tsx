import { useState, useEffect } from "react";
import { useWeb3 } from "@/context/Web3Context";
import { useWallet } from "@/hooks/useWallet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Loader,
  Play,
  Pause,
  TrendingUp,
  Zap,
  AlertCircle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ethers } from "ethers";

interface BotData {
  id: string;
  status?: {
    isActive: boolean;
    nextExecution: string;
    capitalRemaining: string;
  };
  performance?: {
    totalProfit: string;
    totalTrades: string;
    successRate: string;
    currentApy: string;
  };
  isLoading?: boolean;
}

interface BotManagerProps {
  bots?: string[];
  onBotStatusChange?: (botId: string, isActive: boolean) => void;
}

export function BotManager({ bots = [], onBotStatusChange }: BotManagerProps) {
  const { getBotStatus, getBotPerformance, setBotActive, withdrawBotProfits } =
    useWeb3();
  const { isConnected } = useWallet();
  const [botDataMap, setBotDataMap] = useState<Map<string, BotData>>(new Map());
  const [loadingBots, setLoadingBots] = useState<Set<string>>(new Set());
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [selectedBotId, setSelectedBotId] = useState("");

  const fetchBotData = async (botId: string) => {
    try {
      setLoadingBots((prev) => new Set(prev).add(botId));

      const [status, performance] = await Promise.all([
        getBotStatus(botId),
        getBotPerformance(botId),
      ]);

      setBotDataMap((prev) => {
        const newMap = new Map(prev);
        newMap.set(botId, {
          id: botId,
          status,
          performance,
        });
        return newMap;
      });
    } catch (error) {
      console.error(`Failed to fetch data for bot ${botId}:`, error);
      toast({
        title: "Error",
        description: `Failed to load data for bot ${botId}`,
        variant: "destructive",
      });
    } finally {
      setLoadingBots((prev) => {
        const newSet = new Set(prev);
        newSet.delete(botId);
        return newSet;
      });
    }
  };

  useEffect(() => {
    bots.forEach((botId) => {
      if (!botDataMap.has(botId)) {
        fetchBotData(botId);
      }
    });

    const interval = setInterval(() => {
      bots.forEach((botId) => {
        fetchBotData(botId);
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [bots, getBotStatus, getBotPerformance]);

  const handleToggleBotStatus = async (botId: string, currentStatus: boolean) => {
    try {
      setLoadingBots((prev) => new Set(prev).add(botId));
      await setBotActive(botId, !currentStatus);

      setBotDataMap((prev) => {
        const newMap = new Map(prev);
        const botData = newMap.get(botId);
        if (botData && botData.status) {
          botData.status.isActive = !currentStatus;
        }
        return newMap;
      });

      toast({
        title: "Success",
        description: `Bot ${!currentStatus ? "activated" : "deactivated"} successfully`,
      });

      onBotStatusChange?.(botId, !currentStatus);
      await fetchBotData(botId);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update bot status";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoadingBots((prev) => {
        const newSet = new Set(prev);
        newSet.delete(botId);
        return newSet;
      });
    }
  };

  const handleWithdrawProfits = async () => {
    if (!selectedBotId || !withdrawalAmount) {
      toast({
        title: "Error",
        description: "Please select a bot and enter an amount",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoadingBots((prev) => new Set(prev).add(selectedBotId));
      const amountWei = ethers.parseUnits(withdrawalAmount, 18);
      await withdrawBotProfits(selectedBotId, amountWei.toString());

      toast({
        title: "Success",
        description: `Withdrawn ${withdrawalAmount} USDh from ${selectedBotId}`,
      });

      setWithdrawalAmount("");
      setSelectedBotId("");
      await fetchBotData(selectedBotId);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Withdrawal failed";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoadingBots((prev) => {
        const newSet = new Set(prev);
        newSet.delete(selectedBotId);
        return newSet;
      });
    }
  };

  const formatNumber = (value: string, decimals = 2) => {
    try {
      const num = parseFloat(ethers.formatUnits(value, 18));
      return num.toFixed(decimals);
    } catch {
      return "0";
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Connect your wallet to manage bots
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (bots.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Zap className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No bots deployed yet. Deploy your first bot to get started!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Bot Management</h2>
        <Badge variant="secondary">{bots.length} bots</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bots.map((botId) => {
          const botData = botDataMap.get(botId);
          const isLoading = loadingBots.has(botId);

          return (
            <Card key={botId} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{botId}</CardTitle>
                    <CardDescription>Bot Status</CardDescription>
                  </div>
                  {botData?.status?.isActive ? (
                    <Badge className="bg-green-500">Active</Badge>
                  ) : (
                    <Badge variant="secondary">Inactive</Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {isLoading && !botData ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <>
                    {botData?.status && (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Capital Remaining:</span>
                          <span className="font-mono font-semibold">
                            {formatNumber(botData.status.capitalRemaining)} USDh
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Next Execution:</span>
                          <span className="font-mono text-xs">
                            {new Date(parseInt(botData.status.nextExecution) * 1000).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {botData?.performance && (
                      <div className="space-y-2 border-t pt-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-muted-foreground">Performance</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-muted-foreground">Total Profit</p>
                            <p className="font-semibold text-green-600">
                              {formatNumber(botData.performance.totalProfit, 4)} USDh
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Trades</p>
                            <p className="font-semibold">
                              {parseInt(botData.performance.totalTrades)}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Success Rate</p>
                            <p className="font-semibold">
                              {(parseInt(botData.performance.successRate) / 100).toFixed(2)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Current APY</p>
                            <p className="font-semibold text-blue-600">
                              {(parseInt(botData.performance.currentApy) / 100).toFixed(2)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="border-t pt-3 space-y-2">
                      <Button
                        variant={botData?.status?.isActive ? "destructive" : "default"}
                        size="sm"
                        className="w-full"
                        onClick={() =>
                          handleToggleBotStatus(
                            botId,
                            botData?.status?.isActive || false
                          )
                        }
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                        ) : botData?.status?.isActive ? (
                          <Pause className="mr-2 h-4 w-4" />
                        ) : (
                          <Play className="mr-2 h-4 w-4" />
                        )}
                        {botData?.status?.isActive ? "Pause" : "Activate"}
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => setSelectedBotId(botId)}
                          >
                            Withdraw Profits
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Withdraw Profits</DialogTitle>
                            <DialogDescription>
                              Withdraw profits from {botId}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Input
                              type="number"
                              placeholder="Amount in USDh"
                              value={withdrawalAmount}
                              onChange={(e) => setWithdrawalAmount(e.target.value)}
                            />
                            <Button
                              onClick={handleWithdrawProfits}
                              disabled={isLoading || !withdrawalAmount}
                              className="w-full"
                            >
                              {isLoading ? (
                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                              ) : null}
                              Confirm Withdrawal
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
