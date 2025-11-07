import { Header } from "@/components/Header";
import { SwapInterface } from "@/components/SwapInterface";
import { StakingInterface } from "@/components/StakingInterface";
import { VirtualPoolInterface } from "@/components/VirtualPoolInterface";
import { useWallet } from "@/hooks/useWallet";
import { TrendingUp, BarChart3, AlertCircle, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Trading() {
  const { isConnected } = useWallet();

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-card to-background">
        <Header />
        <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
              <h1 className="text-3xl font-bold mb-2">Connect Your Wallet</h1>
              <p className="text-lg text-foreground/70">
                Connect your wallet to access VirtDEX trading features
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card to-background">
      <Header />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-black">VirtDEX Trading</h1>
            <p className="text-xl text-foreground/70">
              Trade tokens with optimal DEX routing, earn passive income, and
              provide liquidity
            </p>
          </div>

          {/* Trading Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  24h Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2.4M</div>
                <p className="text-xs text-muted-foreground mt-1">+12.5%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Total Trades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15.2K</div>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-green-500" />
                  Total Liquidity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$18.5M</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Virtual pools
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Avg. Fee</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.25%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Lowest in DeFi
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Trading Interface */}
          <Tabs defaultValue="swap" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="swap" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Swap</span>
              </TabsTrigger>
              <TabsTrigger
                value="liquidity"
                className="flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">Liquidity</span>
              </TabsTrigger>
              <TabsTrigger value="stake" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Stake</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex items-center gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Stats</span>
              </TabsTrigger>
            </TabsList>

            {/* Swap Tab */}
            <TabsContent value="swap" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Swap Tokens</h2>
                <p className="text-foreground/70">
                  Get the best price across multiple DEX protocols with
                  automatic routing
                </p>
              </div>
              <SwapInterface
                defaultInputToken="USDh"
                defaultOutputToken="ETH"
              />
            </TabsContent>

            {/* Liquidity Tab */}
            <TabsContent value="liquidity" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Virtual Liquidity Pool</h2>
                <p className="text-foreground/70">
                  Provide liquidity to earn 0.3% fees on every arbitrage trade
                </p>
              </div>
              <VirtualPoolInterface />
            </TabsContent>

            {/* Staking Tab */}
            <TabsContent value="stake" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Earn Rewards</h2>
                <p className="text-foreground/70">
                  Stake USDh to earn 24% APY and share in platform fees
                </p>
              </div>
              <StakingInterface />
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6 mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Trading Volume</CardTitle>
                    <CardDescription>Last 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-40 bg-muted rounded-lg flex items-end justify-center gap-1 p-4">
                        {Array.from({ length: 7 }).map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t bg-gradient-to-t from-primary to-cyan-400"
                            style={{
                              height: `${Math.sin(i * 0.5) * 30 + 50}%`,
                              opacity: 0.6 + Math.random() * 0.4,
                            }}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Peak: $420K | Avg: $280K
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Liquidity Distribution</CardTitle>
                    <CardDescription>By token type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Stablecoin Pairs",
                          value: "45%",
                          color: "bg-blue-500",
                        },
                        {
                          name: "Major Tokens",
                          value: "35%",
                          color: "bg-purple-500",
                        },
                        {
                          name: "Platform Tokens",
                          value: "20%",
                          color: "bg-accent",
                        },
                      ].map((item) => (
                        <div key={item.name}>
                          <div className="flex justify-between text-sm mb-2">
                            <span>{item.name}</span>
                            <span className="font-semibold">{item.value}</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full ${item.color}`}
                              style={{ width: item.value }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Trading Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-accent" />
                Trading Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  • Use limit orders to avoid high slippage on large trades
                </li>
                <li>
                  • Provide liquidity to earn sustainable passive income from
                  swap fees
                </li>
                <li>• Stake USDh to earn 24% APY and governance rights</li>
                <li>
                  • VirtDEX uses the best DEX routing across Uniswap, Velodrome,
                  and Sushiswap
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
