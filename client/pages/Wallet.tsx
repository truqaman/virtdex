import { Header } from "@/components/Header";
import { useWallet } from "@/hooks/useWallet";
import { useBalance } from "@/hooks/useBalance";
import { Copy, Lock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { ethers } from "ethers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function Wallet() {
  const { isConnected, address, formatAddress, copyAddress } = useWallet();
  const { balance } = useBalance({ refetchInterval: 30000 });
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    if (copyAddress()) {
      setCopied(true);
      toast({
        title: "Copied",
        description: "Wallet address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatUSDh = (value: string) => {
    try {
      const num = parseFloat(ethers.formatUnits(value, 18));
      return num.toFixed(2);
    } catch {
      return "0.00";
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-card to-background">
        <Header />
        <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
              <h1 className="text-3xl font-bold mb-2">Wallet Not Connected</h1>
              <p className="text-lg text-foreground/70">
                Connect your wallet to view and manage your assets
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const balanceAmount = formatUSDh(balance || "0");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card to-background">
      <Header />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-black">Smart Wallet</h1>
            <p className="text-xl text-foreground/70">
              View and manage your assets securely
            </p>
          </div>

          {/* Wallet Overview */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Balance Card */}
            <div className="lg:col-span-2 card-defi">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-foreground/60 mb-2">USDh Balance</p>
                  <h2 className="text-5xl font-black text-primary">${balanceAmount}</h2>
                </div>
                <Lock size={32} className="text-accent" />
              </div>

              {/* Wallet Address */}
              <div className="bg-black/30 p-6 rounded-xl border border-border/30 mb-6">
                <p className="text-sm text-foreground/60 mb-2">Wallet Address</p>
                <div className="flex items-center gap-3 mb-4">
                  <code className="font-mono text-sm flex-1 break-all">
                    {address}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyAddress}
                    className="px-2"
                  >
                    <Copy size={18} className={copied ? "text-accent" : ""} />
                  </Button>
                </div>
                {copied && <p className="text-accent text-xs">Copied to clipboard!</p>}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button className="w-full" variant="outline">
                  Send
                </Button>
                <Button className="w-full" variant="outline">
                  Receive
                </Button>
              </div>
            </div>

            {/* Account Info */}
            <div className="card-defi">
              <h3 className="text-xl font-bold mb-6">Account</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Connected Address</p>
                  <p className="font-mono text-sm font-semibold">{formatAddress(address!)}</p>
                </div>
                <div className="border-t border-border/30 pt-4">
                  <p className="text-sm text-foreground/60 mb-1">Network</p>
                  <p className="font-semibold">Optimism (OP)</p>
                </div>
                <div className="border-t border-border/30 pt-4">
                  <p className="text-sm text-foreground/60 mb-1">Token</p>
                  <p className="font-semibold">USDh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Token Holdings */}
          <div className="card-defi">
            <h3 className="text-2xl font-bold mb-6">Your Tokens</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 font-semibold text-foreground/60">Token</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground/60">Amount</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground/60">Value</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground/60">Chain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  <tr className="hover:bg-white/5 transition">
                    <td className="py-4 px-4 font-semibold">USDh</td>
                    <td className="py-4 px-4 text-right text-foreground/70">{balanceAmount}</td>
                    <td className="py-4 px-4 text-right font-semibold">${balanceAmount}</td>
                    <td className="py-4 px-4 text-right text-sm text-foreground/60">Optimism</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Supported Networks Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Supported Networks</CardTitle>
                <CardDescription>
                  Use your wallet across multiple chains
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { name: "Optimism", symbol: "OP" },
                    { name: "Ethereum", symbol: "ETH" },
                    { name: "Arbitrum", symbol: "ARB" },
                    { name: "Polygon", symbol: "MATIC" },
                    { name: "Base", symbol: "BASE" },
                    { name: "Linea", symbol: "LINEA" },
                  ].map((network) => (
                    <div
                      key={network.symbol}
                      className="flex items-center justify-between p-2 rounded hover:bg-muted transition"
                    >
                      <span className="font-medium">{network.name}</span>
                      <span className="text-sm text-foreground/60">{network.symbol}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Your funds are secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                    <div className="flex items-start gap-3">
                      <Lock size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-green-900 dark:text-green-100">
                          Non-Custodial Wallet
                        </p>
                        <p className="text-xs text-green-800 dark:text-green-200">
                          You have full control of your private keys
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <Lock size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-blue-900 dark:text-blue-100">
                          Audited Smart Contracts
                        </p>
                        <p className="text-xs text-blue-800 dark:text-blue-200">
                          All contracts have been security audited
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
