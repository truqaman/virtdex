import { Header } from "@/components/Header";
import { Send, Download, QrCode, Copy, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Wallet() {
  const [showPrivate, setShowPrivate] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card to-background">
      <Header />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-black">Smart Wallet</h1>
            <p className="text-xl text-foreground/70">
              Manage your assets and execute trades with our integrated in-app wallet
            </p>
          </div>

          {/* Wallet Overview */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Balance Card */}
            <div className="lg:col-span-2 card-defi">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-foreground/60 mb-2">Total Balance</p>
                  <h2 className="text-5xl font-black text-primary">$24,582.45</h2>
                </div>
                <Lock size={32} className="text-accent" />
              </div>

              {/* Wallet Address */}
              <div className="bg-black/30 p-6 rounded-xl border border-border/30 mb-6">
                <p className="text-sm text-foreground/60 mb-2">Wallet Address</p>
                <div className="flex items-center gap-3 mb-4">
                  <code className="font-mono text-sm flex-1 truncate">
                    0x742d35Cc6634C0532925a3b844Bc58e8d0A71f8
                  </code>
                  <button
                    onClick={copyAddress}
                    className="p-2 hover:bg-white/10 rounded-lg transition"
                  >
                    <Copy size={18} className={copied ? "text-accent" : ""} />
                  </button>
                </div>
                {copied && <p className="text-accent text-xs">Copied to clipboard!</p>}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition">
                  <Send size={18} />
                  <span className="hidden sm:inline">Send</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border bg-card font-semibold hover:bg-muted transition">
                  <Download size={18} />
                  <span className="hidden sm:inline">Receive</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border bg-card font-semibold hover:bg-muted transition">
                  <QrCode size={18} />
                  <span className="hidden sm:inline">QR Code</span>
                </button>
              </div>
            </div>

            {/* Security Info */}
            <div className="card-defi">
              <h3 className="text-xl font-bold mb-6">Security</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/50">
                  <div className="flex items-start gap-3 mb-2">
                    <Lock size={18} className="text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Multi-Signature Enabled</p>
                      <p className="text-xs text-foreground/60">Requires 2 of 3 approvals</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/50">
                  <div className="flex items-start gap-3 mb-2">
                    <Lock size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">2FA Configured</p>
                      <p className="text-xs text-foreground/60">Time-based authentication</p>
                    </div>
                  </div>
                </div>
                <button className="w-full px-4 py-3 rounded-lg border border-border hover:bg-muted transition font-semibold">
                  Security Settings
                </button>
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
                    <th className="text-right py-3 px-4 font-semibold text-foreground/60">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {[
                    {
                      token: "USDh",
                      amount: "15,234.50",
                      value: "$15,234.50",
                      chain: "Ethereum",
                    },
                    {
                      token: "ETH",
                      amount: "2.45",
                      value: "$5,875.80",
                      chain: "Ethereum",
                    },
                    {
                      token: "ARB",
                      amount: "1,250",
                      value: "$2,125.50",
                      chain: "Arbitrum",
                    },
                    {
                      token: "OP",
                      amount: "850",
                      value: "$1,346.15",
                      chain: "Optimism",
                    },
                  ].map((token) => (
                    <tr key={token.token} className="hover:bg-white/5 transition">
                      <td className="py-4 px-4 font-semibold">{token.token}</td>
                      <td className="py-4 px-4 text-right text-foreground/70">{token.amount}</td>
                      <td className="py-4 px-4 text-right font-semibold">{token.value}</td>
                      <td className="py-4 px-4 text-right text-sm text-foreground/60">
                        {token.chain}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button className="text-primary hover:text-cyan-300 transition text-sm font-semibold">
                            Send
                          </button>
                          <span className="text-foreground/30">•</span>
                          <button className="text-primary hover:text-cyan-300 transition text-sm font-semibold">
                            Swap
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Transaction History */}
          <div className="card-defi">
            <h3 className="text-2xl font-bold mb-6">Recent Transactions</h3>
            <div className="space-y-3">
              {[
                {
                  type: "Received",
                  token: "1.5 ETH",
                  amount: "+$3,587.50",
                  time: "2 hours ago",
                  from: "0x1234...5678",
                },
                {
                  type: "Sent",
                  token: "500 USDh",
                  amount: "-$500.00",
                  time: "5 hours ago",
                  to: "0x9ABC...DEF0",
                },
                {
                  type: "Swap",
                  token: "2 ETH → 3,150 ARB",
                  amount: "$4,750.00",
                  time: "1 day ago",
                  from: "Uniswap",
                },
                {
                  type: "Bridge",
                  token: "100 USDh",
                  amount: "$100.00",
                  time: "2 days ago",
                  from: "Ethereum → Arbitrum",
                },
              ].map((tx, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-4 rounded-lg hover:bg-white/5 transition border border-border/30"
                >
                  <div>
                    <p className="font-semibold mb-1">{tx.type}</p>
                    <p className="text-sm text-foreground/60">{tx.token}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${tx.amount.startsWith("+") ? "text-accent" : ""}`}>
                      {tx.amount}
                    </p>
                    <p className="text-xs text-foreground/60">{tx.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fiat On-Ramp CTA */}
          <div className="glass p-12 rounded-3xl border border-accent/30 text-center space-y-6">
            <h2 className="text-3xl font-bold">Need More USDh?</h2>
            <p className="text-lg text-foreground/70">
              Buy directly with your credit card, bank transfer, or other payment methods
            </p>
            <button className="btn-primary text-lg mx-auto">Buy USDh Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
