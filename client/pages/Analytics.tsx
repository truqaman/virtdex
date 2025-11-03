import { Header } from "@/components/Header";
import { BarChart3, TrendingUp, PieChart, Calendar } from "lucide-react";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card to-background">
      <Header />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="space-y-2">
              <h1 className="text-5xl font-black">Analytics</h1>
              <p className="text-lg text-foreground/70">
                Comprehensive metrics for your trading and bot performance
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card">
              <Calendar size={18} />
              <select className="bg-transparent outline-none font-semibold">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Last Year</option>
                <option>All Time</option>
              </select>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Profit", value: "$12,458.32", change: "+24.5%", icon: TrendingUp },
              { label: "Win Rate", value: "68.3%", change: "+2.1%", icon: BarChart3 },
              { label: "ROI", value: "145.8%", change: "+12.3%", icon: TrendingUp },
              { label: "Sharpe Ratio", value: "2.34", change: "+0.18", icon: BarChart3 },
            ].map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="card-defi">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">{metric.label}</p>
                      <p className="text-3xl font-bold">{metric.value}</p>
                    </div>
                    <Icon size={20} className="text-primary" />
                  </div>
                  <p className="text-sm text-accent font-semibold">{metric.change} this month</p>
                </div>
              );
            })}
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Profit Chart */}
            <div className="card-defi">
              <h3 className="text-xl font-bold mb-6">Profit Over Time</h3>
              <div className="h-80 bg-black/30 rounded-lg border border-border/30 flex items-end justify-center gap-1 p-4">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-primary to-cyan-400"
                    style={{
                      height: `${Math.sin(i * 0.2) * 30 + 50 + Math.random() * 10}%`,
                      opacity: 0.6 + Math.random() * 0.4,
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Portfolio Distribution */}
            <div className="card-defi">
              <h3 className="text-xl font-bold mb-6">Asset Distribution</h3>
              <div className="h-80 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="url(#grad1)"
                      strokeWidth="30"
                      strokeDasharray="50 251"
                      transform="rotate(-90 100 100)"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="url(#grad2)"
                      strokeWidth="30"
                      strokeDasharray="75 251"
                      strokeDashoffset="-50"
                      transform="rotate(-90 100 100)"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="url(#grad3)"
                      strokeWidth="30"
                      strokeDasharray="50 251"
                      strokeDashoffset="-125"
                      transform="rotate(-90 100 100)"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="url(#grad4)"
                      strokeWidth="30"
                      strokeDasharray="76 251"
                      strokeDashoffset="-175"
                      transform="rotate(-90 100 100)"
                    />
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#06b6d4", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#0891b2", stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#6366f1", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#4f46e5", stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#22c55e", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#16a34a", stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#f59e0b", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#d97706", stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold">4</p>
                      <p className="text-xs text-foreground/60">Assets</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 mt-6">
                {[
                  { label: "USDh", value: "62%", color: "from-cyan-500 to-blue-500" },
                  { label: "ETH", value: "24%", color: "from-indigo-500 to-purple-500" },
                  { label: "ARB", value: "10%", color: "from-green-500 to-emerald-500" },
                  { label: "Others", value: "4%", color: "from-amber-500 to-orange-500" },
                ].map((asset) => (
                  <div key={asset.label} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${asset.color}`}></div>
                    <span className="text-sm font-semibold flex-1">{asset.label}</span>
                    <span className="text-sm text-foreground/60">{asset.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bot Performance */}
          <div className="card-defi">
            <h3 className="text-2xl font-bold mb-6">Bot Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 font-semibold text-foreground/60">Bot Name</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground/60">Total Profit</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground/60">Trades</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground/60">Win Rate</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground/60">ROI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {[
                    { name: "Arbitrage Bot #1", profit: "$2,458.32", trades: "245", winRate: "72%", roi: "18.5%" },
                    { name: "Grid Trading Bot", profit: "$1,875.50", trades: "189", winRate: "65%", roi: "14.2%" },
                    { name: "DCA Strategy", profit: "$945.20", trades: "34", winRate: "82%", roi: "8.9%" },
                    { name: "Momentum Bot", profit: "$1,235.80", trades: "156", winRate: "61%", roi: "11.3%" },
                  ].map((bot) => (
                    <tr key={bot.name} className="hover:bg-white/5 transition">
                      <td className="py-4 px-4 font-semibold">{bot.name}</td>
                      <td className="py-4 px-4 text-right text-accent font-semibold">{bot.profit}</td>
                      <td className="py-4 px-4 text-right text-foreground/70">{bot.trades}</td>
                      <td className="py-4 px-4 text-right text-accent">{bot.winRate}</td>
                      <td className="py-4 px-4 text-right font-semibold">{bot.roi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Performance Comparison */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="card-defi">
              <h4 className="font-bold mb-4">Hourly Returns</h4>
              <div className="space-y-2">
                {[9, 12, 15, 18, 21].map((hour) => (
                  <div key={hour} className="flex items-center gap-3">
                    <span className="text-xs text-foreground/60 w-8">{hour}:00</span>
                    <div className="flex-1 h-6 bg-black/30 rounded overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-cyan-400"
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-defi">
              <h4 className="font-bold mb-4">Trading Volume</h4>
              <div className="text-3xl font-bold text-primary mb-4">$2.4M</div>
              <p className="text-sm text-foreground/60">
                Average daily volume across all active bots
              </p>
              <p className="text-xs text-accent mt-2">+15.3% from last week</p>
            </div>

            <div className="card-defi">
              <h4 className="font-bold mb-4">Network Activity</h4>
              <div className="space-y-3">
                {[
                  { chain: "Ethereum", txs: "1,245", vol: "$1.2M" },
                  { chain: "Arbitrum", txs: "892", vol: "$850K" },
                  { chain: "Optimism", txs: "634", vol: "$520K" },
                ].map((stat) => (
                  <div key={stat.chain} className="text-xs">
                    <p className="font-semibold mb-1">{stat.chain}</p>
                    <p className="text-foreground/60">{stat.txs} txs • {stat.vol}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
