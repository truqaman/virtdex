import { Header } from "@/components/Header";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Wallet,
  Send,
  ArrowDownUp,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card to-background">
      <Header />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Portfolio Overview */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Balance Card */}
            <div className="lg:col-span-2 card-defi">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-foreground/60 mb-2">Total Portfolio Value</p>
                  <div className="flex items-center gap-3">
                    <h2 className="text-4xl font-black">
                      {showBalance ? "$24,582.45" : "•••••••"}
                    </h2>
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className="p-2 hover:bg-white/10 rounded-lg transition"
                    >
                      {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-accent text-lg font-semibold">+$2,458.32</p>
                  <p className="text-sm text-foreground/60">+11.1% this month</p>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="h-40 bg-black/30 rounded-lg border border-border/30 flex items-end justify-center gap-0.5 p-4">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-primary to-cyan-400"
                    style={{
                      height: `${Math.sin(i * 0.2) * 30 + 50}%`,
                      opacity: 0.6 + Math.random() * 0.4,
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <button className="w-full flex items-center gap-3 px-6 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition">
                <Send size={20} />
                <span>Send</span>
              </button>
              <button className="w-full flex items-center gap-3 px-6 py-4 rounded-lg border border-border bg-card font-semibold hover:bg-muted transition">
                <ArrowDownUp size={20} />
                <span>Swap</span>
              </button>
              <button className="w-full flex items-center gap-3 px-6 py-4 rounded-lg border border-border bg-card font-semibold hover:bg-muted transition">
                <Wallet size={20} />
                <span>Bridge</span>
              </button>
            </div>
          </div>

          {/* Assets */}
          <div className="card-defi">
            <h3 className="text-2xl font-bold mb-6">Your Assets</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 font-semibold text-foreground/60">
                      Asset
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground/60">
                      Balance
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground/60">
                      Value
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground/60">
                      24h Change
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {[
                    { symbol: "USDh", balance: "15,234.50", value: "$15,234.50", change: "+0.1%" },
                    { symbol: "ETH", balance: "2.45", value: "$5,875.80", change: "+8.2%" },
                    { symbol: "ARB", balance: "1,250", value: "$2,125.50", change: "-2.5%" },
                    { symbol: "OP", balance: "850", value: "$1,346.15", change: "+5.3%" },
                  ].map((asset) => (
                    <tr key={asset.symbol} className="hover:bg-white/5 transition">
                      <td className="py-4 px-4 font-semibold">{asset.symbol}</td>
                      <td className="py-4 px-4 text-right text-foreground/70">
                        {asset.balance}
                      </td>
                      <td className="py-4 px-4 text-right font-semibold">
                        {asset.value}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span
                          className={asset.change.startsWith("+") ? "text-accent" : "text-destructive"}
                        >
                          {asset.change}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Trading Pairs */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Top Trading Pairs */}
            <div className="card-defi">
              <h3 className="text-xl font-bold mb-4">Popular Trading Pairs</h3>
              <div className="space-y-3">
                {[
                  { pair: "USDh/ETH", price: "0.000408", change: "+2.4%" },
                  { pair: "USDh/ARB", price: "0.00168", change: "-1.2%" },
                  { pair: "ETH/USDC", price: "2,391.50", change: "+5.8%" },
                  { pair: "ARB/USDh", price: "595.2", change: "+3.1%" },
                ].map((pair) => (
                  <div
                    key={pair.pair}
                    className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition cursor-pointer group"
                  >
                    <span className="font-semibold group-hover:text-primary transition">
                      {pair.pair}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="text-foreground/70">{pair.price}</span>
                      <span
                        className={pair.change.startsWith("+") ? "text-accent" : "text-destructive"}
                      >
                        {pair.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Bots */}
            <div className="card-defi">
              <h3 className="text-xl font-bold mb-4">Active Trading Bots</h3>
              <div className="space-y-3">
                {[
                  { name: "Arbitrage Bot #1", status: "Active", profit: "+$245.32", roi: "12.3%" },
                  { name: "Grid Trading Bot", status: "Active", profit: "+$128.94", roi: "8.7%" },
                  { name: "DCA Strategy", status: "Paused", profit: "+$92.15", roi: "5.2%" },
                ].map((bot) => (
                  <div
                    key={bot.name}
                    className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition"
                  >
                    <div>
                      <p className="font-semibold">{bot.name}</p>
                      <p className="text-xs text-foreground/60">
                        {bot.status === "Active" ? (
                          <span className="text-accent">• {bot.status}</span>
                        ) : (
                          <span className="text-muted-foreground">• {bot.status}</span>
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-accent">{bot.profit}</p>
                      <p className="text-xs text-foreground/60">ROI: {bot.roi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market Overview */}
          <div className="card-defi">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BarChart3 size={24} />
              Market Overview
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: "24h Volume", value: "$8.45B", icon: TrendingUp },
                { label: "Total TVL", value: "$12.3B", icon: Wallet },
                { label: "Active Users", value: "125.4K", icon: TrendingUp },
                { label: "Avg. APY", value: "24.5%", icon: TrendingUp },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-foreground/60">{stat.label}</p>
                      <Icon size={18} className="text-primary" />
                    </div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
