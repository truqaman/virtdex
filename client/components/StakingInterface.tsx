import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWeb3 } from "@/context/Web3Context";
import { useBalance, useStakedBalance } from "@/hooks/useBalance";
import { useWallet } from "@/hooks/useWallet";
import { toast } from "@/hooks/use-toast";
import { Loader, Lock, Unlock, TrendingUp, AlertCircle } from "lucide-react";
import { ethers } from "ethers";
import { STAKING_CONFIG } from "@/config/web3";

const stakingSchema = z.object({
  amount: z.string().regex(/^\d+(\.\d{1,18})?$/, "Invalid amount"),
});

type StakingFormValues = z.infer<typeof stakingSchema>;

export function StakingInterface() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"stake" | "unstake">("stake");
  const [reward, setReward] = useState("0");
  const [apy] = useState((STAKING_CONFIG.apy / 10000) * 100);

  const { stake, unstake, calculateStakingReward } = useWeb3();
  const { balance } = useBalance({ refetchInterval: 30000 });
  const { stakedBalance, refetch: refetchStaked } = useStakedBalance({ refetchInterval: 30000 });
  const { isConnected } = useWallet();

  const form = useForm<StakingFormValues>({
    resolver: zodResolver(stakingSchema),
    defaultValues: {
      amount: "",
    },
  });

  useEffect(() => {
    const fetchReward = async () => {
      try {
        const rewardValue = await calculateStakingReward();
        setReward(rewardValue || "0");
      } catch (error) {
        console.error("Failed to fetch reward:", error);
      }
    };

    if (isConnected) {
      fetchReward();
      const interval = setInterval(fetchReward, 60000);
      return () => clearInterval(interval);
    }
  }, [isConnected, calculateStakingReward]);

  const handleStakeAmountChange = (value: number[]) => {
    form.setValue("amount", value[0].toString());
  };

  const formatUSDh = (value: string) => {
    try {
      const num = parseFloat(ethers.formatUnits(value, 18));
      return num.toFixed(2);
    } catch {
      return "0.00";
    }
  };

  const onStake = async (values: StakingFormValues) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);
      const amountWei = ethers.parseUnits(values.amount, 18);

      await stake(amountWei.toString());

      toast({
        title: "Staking Successful",
        description: `Successfully staked ${values.amount} USDh`,
      });

      form.reset();
      await refetchStaked();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Staking failed";
      toast({
        title: "Staking Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const onUnstake = async (values: StakingFormValues) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);
      const amountWei = ethers.parseUnits(values.amount, 18);

      await unstake(amountWei.toString());

      toast({
        title: "Unstaking Successful",
        description: `Successfully unstaked ${values.amount} USDh`,
      });

      form.reset();
      await refetchStaked();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unstaking failed";
      toast({
        title: "Unstaking Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Connect your wallet to stake USDh
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxStakeAmount = parseFloat(ethers.formatUnits(balance || "0", 18));
  const maxUnstakeAmount = parseFloat(ethers.formatUnits(stakedBalance || "0", 18));
  const rewardAmount = parseFloat(ethers.formatUnits(reward || "0", 18));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatUSDh(balance || "0")}</div>
            <p className="text-xs text-muted-foreground mt-1">USDh available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Staked Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatUSDh(stakedBalance || "0")}</div>
            <p className="text-xs text-muted-foreground mt-1">USDh staked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Earned Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +{rewardAmount.toFixed(4)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">APY: {apy.toFixed(2)}%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stake USDh</CardTitle>
          <CardDescription>
            Stake your USDh tokens and earn {apy.toFixed(2)}% APY in rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as "stake" | "unstake")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stake" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Stake
              </TabsTrigger>
              <TabsTrigger value="unstake" className="flex items-center gap-2">
                <Unlock className="h-4 w-4" />
                Unstake
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stake" className="space-y-4 mt-6">
              {maxStakeAmount === 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You don't have any USDh available to stake
                  </AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onStake)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Amount to Stake</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Input
                              type="number"
                              step="0.01"
                              min="0.01"
                              max={maxStakeAmount}
                              placeholder="Enter amount"
                              value={value}
                              onChange={(e) => onChange(e.target.value)}
                            />
                            {maxStakeAmount > 0 && (
                              <Slider
                                min={0}
                                max={maxStakeAmount}
                                step={0.01}
                                value={[parseFloat(value) || 0]}
                                onValueChange={(v) => onChange(v[0].toString())}
                                className="w-full"
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Available: {maxStakeAmount.toFixed(2)} USDh
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {value && (
                    <div className="bg-muted p-4 rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Staking Amount:</span>
                        <span className="font-semibold">{parseFloat(form.watch("amount") || "0").toFixed(2)} USDh</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Annual Reward (est.):</span>
                        <span className="font-semibold text-green-600">
                          {((parseFloat(form.watch("amount") || "0") * apy) / 100).toFixed(2)} USDh
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Daily Reward (est.):</span>
                        <span className="font-semibold text-green-600">
                          {((parseFloat(form.watch("amount") || "0") * apy) / 100 / 365).toFixed(4)} USDh
                        </span>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isProcessing || maxStakeAmount === 0}
                  >
                    {isProcessing ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Staking...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Stake USDh
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="unstake" className="space-y-4 mt-6">
              {maxUnstakeAmount === 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You don't have any staked USDh to unstake
                  </AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onUnstake)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Amount to Unstake</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Input
                              type="number"
                              step="0.01"
                              min="0.01"
                              max={maxUnstakeAmount}
                              placeholder="Enter amount"
                              value={value}
                              onChange={(e) => onChange(e.target.value)}
                            />
                            {maxUnstakeAmount > 0 && (
                              <Slider
                                min={0}
                                max={maxUnstakeAmount}
                                step={0.01}
                                value={[parseFloat(value) || 0]}
                                onValueChange={(v) => onChange(v[0].toString())}
                                className="w-full"
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Staked: {maxUnstakeAmount.toFixed(2)} USDh
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full"
                    disabled={isProcessing || maxUnstakeAmount === 0}
                  >
                    {isProcessing ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Unstaking...
                      </>
                    ) : (
                      <>
                        <Unlock className="mr-2 h-4 w-4" />
                        Unstake USDh
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
