import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWallet } from "@/hooks/useWallet";
import { useBalance } from "@/hooks/useBalance";
import { toast } from "@/hooks/use-toast";
import {
  ArrowDownUp,
  Loader,
  AlertCircle,
  TrendingUp,
  Zap,
  Settings2,
} from "lucide-react";
import { ALL_TOKENS, TokenConfig, getTokenBySymbol } from "@/config/tokens";
import { dexRouter, SwapQuote } from "@/services/dexRouter";
import { ethers } from "ethers";

const swapSchema = z.object({
  inputToken: z.string(),
  outputToken: z.string(),
  inputAmount: z.string().regex(/^\d+(\.\d+)?$/, "Invalid amount"),
  slippage: z.string().regex(/^\d+(\.\d+)?$/, "Must be 0-100"),
});

type SwapFormValues = z.infer<typeof swapSchema>;

interface SwapInterfaceProps {
  defaultInputToken?: string;
  defaultOutputToken?: string;
}

export function SwapInterface({
  defaultInputToken = "USDh",
  defaultOutputToken = "ETH",
}: SwapInterfaceProps) {
  const [swapQuote, setSwapQuote] = useState<SwapQuote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedDex, setSelectedDex] = useState<string>("best");

  const { isConnected } = useWallet();
  const { balance } = useBalance({ refetchInterval: 30000 });

  const form = useForm<SwapFormValues>({
    resolver: zodResolver(swapSchema),
    defaultValues: {
      inputToken: defaultInputToken,
      outputToken: defaultOutputToken,
      inputAmount: "",
      slippage: "0.5",
    },
  });

  const inputTokenSymbol = form.watch("inputToken");
  const outputTokenSymbol = form.watch("outputToken");
  const inputAmount = form.watch("inputAmount");

  const inputToken = getTokenBySymbol(inputTokenSymbol);
  const outputToken = getTokenBySymbol(outputTokenSymbol);

  // Fetch quote when tokens or amount changes
  useEffect(() => {
    const fetchQuote = async () => {
      if (
        !inputToken ||
        !outputToken ||
        !inputAmount ||
        parseFloat(inputAmount) <= 0
      ) {
        setSwapQuote(null);
        return;
      }

      try {
        setIsLoading(true);
        const quote = await dexRouter.getSwapQuote(
          inputToken,
          outputToken,
          inputAmount,
        );

        if (quote) {
          setSwapQuote(quote);
        } else {
          setSwapQuote(null);
          toast({
            title: "Error",
            description: "Unable to get swap quote",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Quote fetch error:", error);
        setSwapQuote(null);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchQuote, 500); // Debounce
    return () => clearTimeout(timer);
  }, [inputToken, outputToken, inputAmount]);

  const handleSwapTokens = () => {
    const temp = form.getValues("inputToken");
    form.setValue("inputToken", form.getValues("outputToken"));
    form.setValue("outputToken", temp);
  };

  const onSubmit = async (values: SwapFormValues) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to swap",
        variant: "destructive",
      });
      return;
    }

    if (!swapQuote) {
      toast({
        title: "Invalid Quote",
        description: "No swap quote available",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsExecuting(true);

      const route =
        selectedDex === "best" ? swapQuote.bestRoute : swapQuote.routes[0];

      const txHash = await dexRouter.executeSwap(
        route,
        swapQuote.inputToken,
        swapQuote.outputToken,
        swapQuote.totalOutput,
        parseFloat(values.slippage),
      );

      if (txHash) {
        toast({
          title: "Swap Executed",
          description: `Swap successful: ${txHash}`,
        });
        form.reset();
        setSwapQuote(null);
      } else {
        toast({
          title: "Swap Failed",
          description: "Transaction execution failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Swap failed";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Connect your wallet to swap tokens
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const inputTokenData = inputToken;
  const outputTokenData = outputToken;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-accent" />
          Swap Tokens
        </CardTitle>
        <CardDescription>
          Swap any token with best DEX routing on Optimism
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Input Token */}
            <div className="space-y-2">
              <FormLabel>From</FormLabel>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="inputToken"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ALL_TOKENS.map((token) => (
                          <SelectItem key={token.symbol} value={token.symbol}>
                            {token.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FormField
                  control={form.control}
                  name="inputAmount"
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.0"
                        step="0.01"
                        {...field}
                      />
                    </FormControl>
                  )}
                />
              </div>
              {inputTokenData && (
                <FormDescription>
                  Balance:{" "}
                  {balance
                    ? ethers.formatUnits(balance, inputTokenData.decimals)
                    : "0"}{" "}
                  {inputTokenData.symbol}
                </FormDescription>
              )}
            </div>

            {/* Swap Direction Button */}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSwapTokens}
              >
                <ArrowDownUp size={20} />
              </Button>
            </div>

            {/* Output Token */}
            <div className="space-y-2">
              <FormLabel>To</FormLabel>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="outputToken"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ALL_TOKENS.map((token) => (
                          <SelectItem key={token.symbol} value={token.symbol}>
                            {token.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <Input
                  type="number"
                  placeholder="0.0"
                  disabled
                  value={
                    swapQuote
                      ? parseFloat(swapQuote.totalOutput).toFixed(6)
                      : "0"
                  }
                />
              </div>
            </div>

            {/* Swap Details */}
            {swapQuote && (
              <div className="space-y-3 bg-muted p-4 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price Impact</span>
                  <span
                    className={
                      parseFloat(swapQuote.priceImpact) > 5
                        ? "text-red-500 font-semibold"
                        : "text-green-500 font-semibold"
                    }
                  >
                    {swapQuote.priceImpact}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Best Route</span>
                  <span className="font-semibold uppercase text-xs">
                    {swapQuote.bestRoute.dex}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gas Estimate</span>
                  <span className="font-semibold">
                    {swapQuote.bestRoute.gasEstimate}
                  </span>
                </div>
              </div>
            )}

            {/* DEX Selection */}
            {swapQuote && swapQuote.routes.length > 1 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <FormLabel className="flex items-center gap-2">
                    <Settings2 size={16} />
                    Select DEX
                  </FormLabel>
                </div>
                <Tabs value={selectedDex} onValueChange={setSelectedDex}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="best">Best</TabsTrigger>
                    {swapQuote.routes.map((route) => (
                      <TabsTrigger key={route.dex} value={route.dex}>
                        {route.dex.split("-")[0]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            )}

            {/* Slippage Tolerance */}
            <FormField
              control={form.control}
              name="slippage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slippage Tolerance (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Maximum acceptable price difference
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Warnings */}
            {swapQuote && parseFloat(swapQuote.priceImpact) > 5 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  High price impact detected. Swap amount may be too large.
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading || isExecuting || !swapQuote || !isConnected}
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Getting Quote...
                </>
              ) : isExecuting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Swapping...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Swap
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
