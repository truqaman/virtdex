import { useState } from "react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useWeb3 } from "@/context/Web3Context";
import { toast } from "@/hooks/use-toast";
import { Loader, AlertCircle, CheckCircle } from "lucide-react";
import { ethers } from "ethers";
import { BOT_CONFIG } from "@/config/web3";

const botDeploymentSchema = z.object({
  botId: z.string().min(3, "Bot ID must be at least 3 characters"),
  capitalAllocation: z.string().regex(/^\d+(\.\d{1,18})?$/, "Invalid number"),
  maxTradeSize: z.string().regex(/^\d+(\.\d{1,18})?$/, "Invalid number"),
  minProfitThreshold: z.string().regex(/^\d+$/, "Must be a whole number"),
  dcaInterval: z.string().regex(/^\d+$/, "Must be a whole number"),
});

type BotDeploymentFormValues = z.infer<typeof botDeploymentSchema>;

interface BotDeploymentFormProps {
  onSuccess?: (txHash: string) => void;
}

export function BotDeploymentForm({ onSuccess }: BotDeploymentFormProps) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [deployedBotId, setDeployedBotId] = useState("");

  const { connected, setBotActive, loading } = useWeb3();

  const form = useForm<BotDeploymentFormValues>({
    resolver: zodResolver(botDeploymentSchema),
    defaultValues: {
      botId: "",
      capitalAllocation: "10000",
      maxTradeSize: "5000",
      minProfitThreshold: "50",
      dcaInterval: "50000",
    },
  });

  const handleCapitalAllocationChange = (value: number[]) => {
    form.setValue("capitalAllocation", value[0].toString());
  };

  const handleMaxTradeSizeChange = (value: number[]) => {
    const maxSize = Math.min(value[0], parseFloat(form.getValues("capitalAllocation")) * 0.5);
    form.setValue("maxTradeSize", maxSize.toString());
  };

  const onSubmit = async (values: BotDeploymentFormValues) => {
    if (!connected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsDeploying(true);
      setDeploymentStatus("pending");
      setErrorMessage("");

      const capitalWei = ethers.parseUnits(values.capitalAllocation, 18);
      const maxTradeWei = ethers.parseUnits(values.maxTradeSize, 18);

      await setBotActive(values.botId, true);

      setDeployedBotId(values.botId);
      setDeploymentStatus("success");

      toast({
        title: "Bot Deployed Successfully",
        description: `Bot ${values.botId} has been deployed and activated`,
      });

      onSuccess?.(values.botId);
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Deployment failed";
      setErrorMessage(message);
      setDeploymentStatus("error");

      toast({
        title: "Deployment Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Deploy Trading Bot</CardTitle>
        <CardDescription>
          Configure and deploy a DCA arbitrage bot with custom parameters
        </CardDescription>
      </CardHeader>
      <CardContent>
        {deploymentStatus === "success" && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Bot {deployedBotId} deployed successfully and is now active!
            </AlertDescription>
          </Alert>
        )}

        {deploymentStatus === "error" && (
          <Alert className={"mb-6 variant=\"destructive\""}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="botId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bot ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., arbitrage-bot-01" {...field} />
                  </FormControl>
                  <FormDescription>
                    Unique identifier for your bot
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capitalAllocation"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Capital Allocation (USDh)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        step="1"
                        min="1000"
                        placeholder="10000"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                      />
                      <Slider
                        min={1000}
                        max={100000}
                        step={1000}
                        value={[parseFloat(value) || 10000]}
                        onValueChange={handleCapitalAllocationChange}
                        className="w-full"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Total capital to allocate to this bot (1000 - 100000 USDh)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxTradeSize"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Max Trade Size (USDh)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        step="1"
                        min="100"
                        placeholder="5000"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                      />
                      <Slider
                        min={100}
                        max={Math.min(50000, parseFloat(form.getValues("capitalAllocation")) * 0.5)}
                        step={100}
                        value={[parseFloat(value) || 5000]}
                        onValueChange={handleMaxTradeSizeChange}
                        className="w-full"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Maximum size for individual trades (max 50% of capital)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minProfitThreshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Profit Threshold (basis points)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      min="1"
                      max="1000"
                      placeholder="50"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum profit required to execute trade (50 = 0.5%)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dcaInterval"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DCA Interval (seconds)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      min="1000"
                      placeholder="50000"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Time between bot executions
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <h4 className="font-semibold text-sm">Configuration Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Capital:</span>
                  <span className="ml-2 font-mono">{form.watch("capitalAllocation")} USDh</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Max Trade:</span>
                  <span className="ml-2 font-mono">{form.watch("maxTradeSize")} USDh</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Min Profit:</span>
                  <span className="ml-2 font-mono">{form.watch("minProfitThreshold")} bp</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Interval:</span>
                  <span className="ml-2 font-mono">{form.watch("dcaInterval")}s</span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isDeploying || loading || !connected}
            >
              {isDeploying || loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                "Deploy Bot"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
