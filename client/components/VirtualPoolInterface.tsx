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
import { Progress } from "@/components/ui/progress";
import { useWeb3 } from "@/context/Web3Context";
import { useBalance } from "@/hooks/useBalance";
import { useWallet } from "@/hooks/useWallet";
import { toast } from "@/hooks/use-toast";
import { Loader, Droplet, BarChart3, AlertCircle, CheckCircle } from "lucide-react";
import { ethers } from "ethers";
import { POOL_CONFIG } from "@/config/web3";

const poolSchema = z.object({
  amount: z.string().regex(/^\d+(\.\d{1,18})?$/, "Invalid amount"),
});

type PoolFormValues = z.infer<typeof poolSchema>;

interface PoolInfo {
  committedAmount: string;
  availableAmount: string;
  feesEarned: string;
  isActive: boolean;
}

export function VirtualPoolInterface() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [poolInfo, setPoolInfo] = useState<PoolInfo | null>(null);
  const [poolInfoLoading, setPoolInfoLoading] = useState(false);
  const [hasPool, setHasPool] = useState(false);

  const { createVirtualPool, getVirtualPoolInfo } = useWeb3();
  const { balance } = useBalance({ refetchInterval: 30000 });
  const { isConnected, address } = useWallet();

  const form = useForm<PoolFormValues>({
    resolver: zodResolver(poolSchema),
    defaultValues: {
      amount: "",
    },
  });

  const feePercentage = (POOL_CONFIG.feePercentage / 10000) * 100;
  const minLiquidity = parseFloat(
    ethers.formatUnits(POOL_CONFIG.minimumLiquidity, 18)
  );

  useEffect(() => {
    const fetchPoolInfo = async () => {
      if (!isConnected || !address) return;

      try {
        setPoolInfoLoading(true);
        const info = await getVirtualPoolInfo(address);
        if (info) {
          setPoolInfo(info);
          setHasPool(info.isActive);
        }
      } catch (error) {
        console.error("Failed to fetch pool info:", error);
      } finally {
        setPoolInfoLoading(false);
      }
    };

    if (isConnected) {
      fetchPoolInfo();
      const interval = setInterval(fetchPoolInfo, 30000);
      return () => clearInterval(interval);
    }
  }, [isConnected, address, getVirtualPoolInfo]);

  const formatUSDh = (value: string) => {
    try {
      const num = parseFloat(ethers.formatUnits(value, 18));
      return num.toFixed(2);
    } catch {
      return "0.00";
    }
  };

  const formatUSDhFull = (value: string) => {
    try {
      const num = parseFloat(ethers.formatUnits(value, 18));
      return num.toFixed(4);
    } catch {
      return "0.0000";
    }
  };

  const onCreatePool = async (values: PoolFormValues) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(values.amount);
    if (amount < minLiquidity) {
      toast({
        title: "Amount Too Low",
        description: `Minimum liquidity is ${minLiquidity} USDh`,
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);
      const amountWei = ethers.parseUnits(values.amount, 18);

      await createVirtualPool(amountWei.toString());

      toast({
        title: "Pool Created Successfully",
        description: `Created virtual pool with ${values.amount} USDh`,
      });

      form.reset();
      const updatedInfo = await getVirtualPoolInfo(address!);
      if (updatedInfo) {
        setPoolInfo(updatedInfo);
        setHasPool(updatedInfo.isActive);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Pool creation failed";
      toast({
        title: "Pool Creation Failed",
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
              Connect your wallet to provide liquidity
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxAmount = parseFloat(ethers.formatUnits(balance || "0", 18));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Droplet className="h-4 w-4 text-blue-500" />
              Fee Percentage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feePercentage.toFixed(3)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Earned on each trade
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-green-500" />
              Available Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatUSDh(balance || "0")}</div>
            <p className="text-xs text-muted-foreground mt-1">USDh available</p>
          </CardContent>
        </Card>
      </div>

      {hasPool && poolInfo && (
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <CardTitle>Active Virtual Pool</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Committed</p>
                <p className="font-semibold text-lg">
                  {formatUSDhFull(poolInfo.committedAmount)} USDh
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Available</p>
                <p className="font-semibold text-lg">
                  {formatUSDhFull(poolInfo.availableAmount)} USDh
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Fees Earned</p>
                <p className="font-semibold text-lg text-green-600">
                  +{formatUSDhFull(poolInfo.feesEarned)} USDh
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Pool Utilization</span>
                <span className="font-semibold">
                  {(
                    (parseFloat(ethers.formatUnits(poolInfo.committedAmount, 18)) /
                      (parseFloat(ethers.formatUnits(poolInfo.committedAmount, 18)) +
                        parseFloat(ethers.formatUnits(poolInfo.availableAmount, 18)))) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
              <Progress
                value={
                  (parseFloat(ethers.formatUnits(poolInfo.committedAmount, 18)) /
                    (parseFloat(ethers.formatUnits(poolInfo.committedAmount, 18)) +
                      parseFloat(ethers.formatUnits(poolInfo.availableAmount, 18)))) *
                  100
                }
                className="h-2"
              />
            </div>

            <Alert>
              <BarChart3 className="h-4 w-4" />
              <AlertDescription>
                Your virtual pool is earning fees from arbitrage trades
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            {hasPool ? "Manage Virtual Pool" : "Create Virtual Pool"}
          </CardTitle>
          <CardDescription>
            Provide liquidity and earn {feePercentage.toFixed(3)}% on each trade
          </CardDescription>
        </CardHeader>
        <CardContent>
          {poolInfoLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onCreatePool)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <FormLabel>
                        {hasPool ? "Add More Liquidity" : "Initial Liquidity Amount"}
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input
                            type="number"
                            step="0.01"
                            min={minLiquidity}
                            max={maxAmount}
                            placeholder={`Minimum: ${minLiquidity} USDh`}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                          />
                          {maxAmount > 0 && (
                            <Slider
                              min={minLiquidity}
                              max={maxAmount}
                              step={100}
                              value={[parseFloat(value) || minLiquidity]}
                              onValueChange={(v) => onChange(v[0].toString())}
                              className="w-full"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Available: {maxAmount.toFixed(2)} USDh (Min:{" "}
                        {minLiquidity} USDh)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {value && parseFloat(value) >= minLiquidity && (
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Liquidity Amount:</span>
                      <span className="font-semibold">
                        {parseFloat(value).toFixed(2)} USDh
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Fee Earnings (est. annual):</span>
                      <span className="font-semibold text-green-600">
                        {((parseFloat(value) * feePercentage) / 100).toFixed(2)} USDh
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Daily Income (est.):</span>
                      <span className="font-semibold text-green-600">
                        {(
                          ((parseFloat(value) * feePercentage) / 100) /
                          365
                        ).toFixed(4)} USDh
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isProcessing || maxAmount < minLiquidity}
                >
                  {isProcessing ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Creating Pool...
                    </>
                  ) : (
                    <>
                      <Droplet className="mr-2 h-4 w-4" />
                      {hasPool ? "Add Liquidity" : "Create Pool"}
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
