import { Header } from "@/components/Header";
import { Zap, Crown, Star, TrendingUp, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Bots() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card to-background">
      <Header />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-black">Bot Factory</h1>
            <p className="text-xl text-foreground/70 max-w-2xl">
              Create and manage intelligent arbitrage trading bots with varying complexity and performance levels
            </p>
          </div>

          {/* Bot Tiers */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Retail Tier */}
            <div className="card-defi hover:border-primary/50 transition relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition pointer-events-none"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <Star size={24} className="text-primary" />
                  <h3 className="text-2xl font-bold">Retail</h3>
                </div>
                <p className="text-foreground/70 mb-6">Perfect for beginners and casual traders</p>

                <div className="space-y-4 mb-8">
                  <div className="flex gap-3">
                    <TrendingUp size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Basic Arbitrage</p>
                      <p className="text-sm text-foreground/60">Simple pair trading</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <TrendingUp size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Manual Control</p>
                      <p className="text-sm text-foreground/60">Full trade management</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <TrendingUp size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Real-Time Alerts</p>
                      <p className="text-sm text-foreground/60">Price & opportunity notifications</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-3xl font-bold">$0<span className="text-sm text-foreground/60">/month</span></div>
                  <button className="w-full btn-secondary">Get Started</button>
                </div>
              </div>
            </div>

            {/* Professional Tier */}
            <div className="card-defi hover:border-secondary/50 transition relative group border-secondary/50 ring-2 ring-secondary/20">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold">
                Most Popular
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition pointer-events-none"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <Crown size={24} className="text-secondary" />
                  <h3 className="text-2xl font-bold">Professional</h3>
                </div>
                <p className="text-foreground/70 mb-6">Advanced strategies and automation</p>

                <div className="space-y-4 mb-8">
                  <div className="flex gap-3">
                    <TrendingUp size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Multi-Pair Arbitrage</p>
                      <p className="text-sm text-foreground/60">Trade across 10+ pairs</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <TrendingUp size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Advanced Analytics</p>
                      <p className="text-sm text-foreground/60">Detailed performance metrics</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <TrendingUp size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">API Access</p>
                      <p className="text-sm text-foreground/60">Webhook & REST integration</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <TrendingUp size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Priority Support</p>
                      <p className="text-sm text-foreground/60">24/7 dedicated assistance</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-3xl font-bold">$99<span className="text-sm text-foreground/60">/month</span></div>
                  <button className="w-full btn-primary">Subscribe Now</button>
                </div>
              </div>
            </div>

            {/* Institutional Tier */}
            <div className="card-defi hover:border-accent/50 transition relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition pointer-events-none"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <Zap size={24} className="text-accent" />
                  <h3 className="text-2xl font-bold">Institutional</h3>
                </div>
                <p className="text-foreground/70 mb-6">Enterprise-grade solutions for large portfolios</p>

                <div className="space-y-4 mb-8">
                  <div className="flex gap-3">
                    <TrendingUp size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Unlimited Bots</p>
                      <p className="text-sm text-foreground/60">No trading limits</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <TrendingUp size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Custom Strategies</p>
                      <p className="text-sm text-foreground/60">Build your own algorithms</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <TrendingUp size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">White Label</p>
                      <p className="text-sm text-foreground/60">Full platform customization</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <TrendingUp size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Dedicated Manager</p>
                      <p className="text-sm text-foreground/60">Personal account manager</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-3xl font-bold">Custom<span className="text-sm text-foreground/60">/month</span></div>
                  <button className="w-full btn-secondary">Contact Sales</button>
                </div>
              </div>
            </div>
          </div>

          {/* Active Bots */}
          <div className="card-defi">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Your Active Bots</h2>
              <button className="btn-primary flex items-center gap-2">
                <Plus size={20} />
                Create Bot
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "Arbitrage Bot #1",
                  status: "Active",
                  returns: "+$1,245.32",
                  roi: "15.2%",
                  trades: "234",
                },
                {
                  name: "Grid Strategy",
                  status: "Active",
                  returns: "+$582.15",
                  roi: "8.9%",
                  trades: "156",
                },
                {
                  name: "Momentum Bot",
                  status: "Paused",
                  returns: "+$389.50",
                  roi: "6.3%",
                  trades: "89",
                },
                {
                  name: "Cross-Chain Arb",
                  status: "Active",
                  returns: "+$924.78",
                  roi: "12.1%",
                  trades: "198",
                },
              ].map((bot) => (
                <div
                  key={bot.name}
                  className="p-6 rounded-xl border border-border/50 hover:border-primary/50 transition cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition">
                        {bot.name}
                      </h4>
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-accent/20 text-accent">
                        {bot.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-accent">{bot.returns}</p>
                      <p className="text-sm text-foreground/60">ROI: {bot.roi}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm text-foreground/60 border-t border-border/50 pt-4">
                    <span>Trades: {bot.trades}</span>
                    <span>•</span>
                    <span>Active this month</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bot Creation CTA */}
          <div className="glass p-12 rounded-3xl border border-primary/30 text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to automate your trading?</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Create a new bot in seconds and start earning with intelligent arbitrage strategies
            </p>
            <button className="btn-primary text-lg mx-auto">Create Your First Bot</button>
          </div>
        </div>
      </div>
    </div>
  );
}
