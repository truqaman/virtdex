import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  Zap,
  Shield,
  Smartphone,
  GitBranch,
  BarChart3,
  Layers,
  Lock,
  Wallet,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card to-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 rounded-full border border-primary/50 bg-primary/10 text-primary text-sm font-semibold">
                  🌟 World's First DEX with Virtual Liquidity
                </div>
                <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent leading-tight">
                  The Future of
                  <br />
                  Decentralized Trading
                </h1>
                <p className="text-xl text-foreground/70 leading-relaxed max-w-lg">
                  VirtDEX is the world's first decentralized exchange with a working virtual liquidity pool
                  powered by USDh stablecoin. Trade, earn, and automate your strategies on Optimism with
                  enterprise-grade security and passive income optimization.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/dashboard"
                  className="btn-primary text-lg justify-center sm:justify-start"
                >
                  Launch Platform
                  <ArrowRight size={20} />
                </Link>
                <button className="btn-secondary text-lg justify-center">
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl font-bold text-primary">10B+</div>
                  <div className="text-sm text-foreground/60">TVL</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">500K+</div>
                  <div className="text-sm text-foreground/60">Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-400">6</div>
                  <div className="text-sm text-foreground/60">Chains</div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-accent/20 blur-3xl rounded-full"></div>
              <div className="relative glass p-8 rounded-2xl border border-primary/50">
                <div className="space-y-4">
                  {/* Mock Trading Chart */}
                  <div className="h-64 bg-black/30 rounded-lg border border-border/30 flex items-end justify-center gap-1 p-4">
                    {[40, 60, 45, 70, 55, 80, 65, 75, 70, 85, 90, 88].map(
                      (height, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-gradient-to-t from-primary to-cyan-400 opacity-70 hover:opacity-100 transition"
                          style={{ height: `${height}%` }}
                        ></div>
                      )
                    )}
                  </div>
                  <div className="flex justify-between text-sm text-foreground/60">
                    <span>24h Volume</span>
                    <span className="text-accent font-semibold">+24.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl lg:text-5xl font-black">
              Powerful Features
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Everything you need for advanced DeFi trading in one platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="card-defi group hover:border-primary/50 transition">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Zap size={24} className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Arbitrage Bots</h3>
              <p className="text-foreground/70">
                Multi-tier bot factory with Retail, Professional, and Institutional tiers
                for automated profitable trading strategies.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-defi group hover:border-primary/50 transition">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Wallet size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Wallet</h3>
              <p className="text-foreground/70">
                Integrated in-app wallet with USDh stablecoin support, instant swaps, and
                secure key management.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-defi group hover:border-primary/50 transition">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-green-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <GitBranch size={24} className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Cross-Chain Bridge</h3>
              <p className="text-foreground/70">
                Seamless token bridging across 6+ networks including Ethereum, Polygon,
                Arbitrum, Optimism, and more.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card-defi group hover:border-primary/50 transition">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <BarChart3 size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-Time Analytics</h3>
              <p className="text-foreground/70">
                Advanced charts, metrics, and insights to track your portfolio and bot
                performance in real-time.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card-defi group hover:border-primary/50 transition">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Smartphone size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mobile First</h3>
              <p className="text-foreground/70">
                Fully responsive design optimized for all devices, trade and manage your
                portfolio from anywhere.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card-defi group hover:border-primary/50 transition">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Shield size={24} className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Audited</h3>
              <p className="text-foreground/70">
                Enterprise-grade security with multi-sig wallets, smart contract audits,
                and insurance coverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* USDh Ecosystem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-black">
                USDh Stablecoin Ecosystem
              </h2>
              <p className="text-lg text-foreground/70">
                DeFiX is fully integrated with the USDh stablecoin ecosystem, providing
                stable, reliable trading pairs with minimal slippage across all supported networks.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Layers size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Multi-Chain Liquidity</h4>
                    <p className="text-sm text-foreground/60">
                      Deep liquidity pools across 6+ blockchain networks
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Yield Farming</h4>
                    <p className="text-sm text-foreground/60">
                      Earn competitive yields by providing liquidity
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Lock size={24} className="text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Collateral Management</h4>
                    <p className="text-sm text-foreground/60">
                      Smart collateral optimization for maximum efficiency
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-cyan-500/20 to-primary/20 blur-3xl rounded-full"></div>
              <div className="relative glass p-8 rounded-2xl border border-accent/50">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "APY", value: "24.5%" },
                    { label: "TVL", value: "$2.3B" },
                    { label: "Users", value: "125K" },
                    { label: "Daily Vol", value: "$450M" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-4 rounded-lg bg-black/30">
                      <div className="text-2xl font-bold text-accent mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-foreground/60">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fiat Onramp Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="glass p-12 rounded-3xl border border-primary/30 text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black">
              Fiat On-Ramp Made Easy
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Buy USDh directly with your credit card, bank transfer, or other payment
              methods. Get started in minutes with instant settlement.
            </p>

            <div className="grid md:grid-cols-4 gap-4 my-8">
              {["Credit Card", "Bank Transfer", "Apple Pay", "Google Pay"].map(
                (method) => (
                  <div
                    key={method}
                    className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition"
                  >
                    <p className="font-semibold">{method}</p>
                  </div>
                )
              )}
            </div>

            <button className="btn-primary text-lg mx-auto">
              Get Started
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-black text-center mb-16">
            How DeFiX Works
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Connect Wallet",
                desc: "Link your Web3 wallet or create a new one with our smart wallet",
              },
              {
                step: "2",
                title: "Add Funds",
                desc: "Buy USDh via fiat on-ramp or deposit crypto from another wallet",
              },
              {
                step: "3",
                title: "Deploy Bots",
                desc: "Choose a bot tier and configure your arbitrage trading strategy",
              },
              {
                step: "4",
                title: "Earn & Withdraw",
                desc: "Monitor performance in real-time and withdraw profits anytime",
              },
            ].map((item) => (
              <div key={item.step} className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-center">{item.title}</h3>
                <p className="text-center text-foreground/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-black">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Join thousands of traders already using DeFiX to maximize their returns
            with intelligent arbitrage bots and advanced analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="btn-primary text-lg">
              Launch App
              <ArrowRight size={20} />
            </Link>
            <button className="btn-secondary text-lg">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-foreground/60 text-sm">
                <li>
                  <Link to="/dashboard" className="hover:text-primary transition">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/bots" className="hover:text-primary transition">
                    Bot Factory
                  </Link>
                </li>
                <li>
                  <Link to="/analytics" className="hover:text-primary transition">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-foreground/60 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-foreground/60 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-foreground/60 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center text-foreground/60 text-sm">
            <p>&copy; 2024 DeFiX. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-primary transition">Twitter</a>
              <a href="#" className="hover:text-primary transition">Discord</a>
              <a href="#" className="hover:text-primary transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
