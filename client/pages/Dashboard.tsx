import { Header } from "@/components/Header";
import { StakingInterface } from "@/components/StakingInterface";
import { VirtualPoolInterface } from "@/components/VirtualPoolInterface";
import { useWallet } from "@/hooks/useWallet";
import { useBalance } from "@/hooks/useBalance";
import { BarChart3, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState } from "react";
import { ethers } from "ethers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const { isConnected, address } = useWallet();
  const { balance } = useBalance({ refetchInterval: 30000 });

  const formatUSDh = (value: string) => {
    try {
      const num = parseFloat(ethers.formatUnits(value, 18));
      return num.toFixed(2);
    } catch {
      return "0.00";
    }
  };

  const balanceAmount = formatUSDh(balance || "0");
  const balanceDisplay = showBalance ? `$${balanceAmount}` : "•••••••";

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
                Connect your wallet to view your portfolio and earn rewards through staking and liquidity provision
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
          {/* Portfolio Overview */}
          <div className="space-y-4">
            <h1 className="text-5xl font-black">Portfolio</h1>
            <p className="text-xl text-foreground/70">
              Manage your assets and earn rewards through staking and liquidity provision
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Balance Card */}
            <div className="lg:col-span-2 card-defi">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-foreground/60 mb-2">USDh Balance</p>
                  <div className="flex items-center gap-3">
                    <h2 className="text-4xl font-black">
                      {balanceDisplay}
                    </h2>
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className="p-2 hover:bg-white/10 rounded-lg transition"
                      aria-label="Toggle balance visibility"
                    >
                      {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Wallet Address */}
              <div className="bg-black/30 p-4 rounded-lg border border-border/30">
                <p className="text-xs text-foreground/60 mb-2">Wallet Address</p>
                <code className="font-mono text-sm text-foreground/80 break-all">
                  {address}
                </code>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card-defi">
              <h3 className="text-lg font-bold mb-6">Portfolio Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Total Value</p>
                  <p className="text-2xl font-bold">${balanceAmount}</p>
                </div>
                <div className="border-t border-border/30 pt-4">
                  <p className="text-sm text-foreground/60 mb-1">Network</p>
                  <p className="text-lg font-semibold">Optimism (OP)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Earning Opportunities */}
          <Tabs defaultValue="staking" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="staking">Staking</TabsTrigger>
              <TabsTrigger value="liquidity">Virtual Liquidity Pool</TabsTrigger>
            </TabsList>

            <TabsContent value="staking" className="space-y-6 mt-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Earn Yield Through Staking</h2>
                <p className="text-foreground/70">
                  Stake your USDh tokens to earn passive income with 24% APY rewards
                </p>
              </div>
              <StakingInterface />
            </TabsContent>

            <TabsContent value="liquidity" className="space-y-6 mt-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Provide Liquidity & Earn Fees</h2>
                <p className="text-foreground/70">
                  Create virtual liquidity pools to earn 0.3% fees on arbitrage trades
                </p>
              </div>
              <VirtualPoolInterface />
            </TabsContent>
          </Tabs>

          {/* Market Overview */}
          <div className="card-defi">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BarChart3 size={24} />
              Market Information
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition">
                <p className="text-sm text-foreground/60 mb-2">Staking APY</p>
                <p className="text-3xl font-bold text-green-500">24.00%</p>
              </div>
              <div className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition">
                <p className="text-sm text-foreground/60 mb-2">Pool Fee</p>
                <p className="text-3xl font-bold text-blue-500">0.30%</p>
              </div>
              <div className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition">
                <p className="text-sm text-foreground/60 mb-2">Supported Networks</p>
                <p className="text-lg font-bold">6 Chains</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
