import { Header } from "@/components/Header";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Bridge() {
  const [fromChain, setFromChain] = useState("ethereum");
  const [toChain, setToChain] = useState("arbitrum");
  const [amount, setAmount] = useState("");

  const chains = [
    { id: "ethereum", name: "Ethereum", logo: "Ξ", color: "from-blue-500 to-blue-600" },
    { id: "arbitrum", name: "Arbitrum", logo: "Ⓐ", color: "from-cyan-500 to-cyan-600" },
    { id: "optimism", name: "Optimism", logo: "Ⓞ", color: "from-red-500 to-red-600" },
    { id: "polygon", name: "Polygon", logo: "Ⓟ", color: "from-purple-500 to-purple-600" },
    { id: "base", name: "Base", logo: "Ⓑ", color: "from-blue-500 to-blue-600" },
    { id: "linea", name: "Linea", logo: "Ⓛ", color: "from-pink-500 to-pink-600" },
  ];

  const selectedFrom = chains.find(c => c.id === fromChain);
  const selectedTo = chains.find(c => c.id === toChain);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card to-background">
      <Header />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-black">Cross-Chain Bridge</h1>
            <p className="text-xl text-foreground/70">
              Seamlessly bridge your USDh and other tokens across multiple blockchain networks
            </p>
          </div>

          {/* Bridge Interface */}
          <div className="card-defi space-y-8">
            {/* Bridge Form */}
            <div className="space-y-6">
              {/* From Chain */}
              <div>
                <label className="block text-sm font-semibold mb-3">From</label>
                <div className="relative">
                  <select
                    value={fromChain}
                    onChange={(e) => setFromChain(e.target.value)}
                    className="w-full appearance-none bg-black/30 border border-border/50 rounded-lg px-6 py-4 text-foreground font-semibold hover:border-primary/50 transition cursor-pointer"
                  >
                    {chains.map((chain) => (
                      <option key={chain.id} value={chain.id}>
                        {chain.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/60 pointer-events-none" />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold mb-3">Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full bg-black/30 border border-border/50 rounded-lg px-6 py-4 text-foreground placeholder:text-foreground/40 hover:border-primary/50 focus:border-primary outline-none transition"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-cyan-300 transition font-semibold text-sm">
                    Max
                  </button>
                </div>
                <p className="text-xs text-foreground/60 mt-2">Balance: 1,500 USDh</p>
              </div>

              {/* To Chain */}
              <div>
                <label className="block text-sm font-semibold mb-3">To</label>
                <div className="relative">
                  <select
                    value={toChain}
                    onChange={(e) => setToChain(e.target.value)}
                    className="w-full appearance-none bg-black/30 border border-border/50 rounded-lg px-6 py-4 text-foreground font-semibold hover:border-primary/50 transition cursor-pointer"
                  >
                    {chains.map((chain) => (
                      <option key={chain.id} value={chain.id} disabled={chain.id === fromChain}>
                        {chain.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/60 pointer-events-none" />
                </div>
              </div>

              {/* Bridge Details */}
              <div className="grid md:grid-cols-2 gap-4 p-4 rounded-lg bg-black/30 border border-border/30">
                <div>
                  <p className="text-xs text-foreground/60 mb-1">Gas Fee</p>
                  <p className="font-semibold">~$12.50</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 mb-1">Bridge Time</p>
                  <p className="font-semibold">2-5 minutes</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 mb-1">You Receive</p>
                  <p className="font-semibold text-accent">{amount || "0"} USDh</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 mb-1">Exchange Rate</p>
                  <p className="font-semibold">1 USDh = 1 USDh</p>
                </div>
              </div>

              <button className="w-full btn-primary text-lg py-4">
                Bridge Now
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Supported Networks */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Supported Networks</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {chains.map((chain) => (
                <div
                  key={chain.id}
                  className="card-defi hover:border-primary/50 transition cursor-pointer group"
                >
                  <div className={`w-16 h-16 rounded-lg gradient-${chain.color} flex items-center justify-center text-white text-3xl font-bold mb-4 group-hover:scale-110 transition`}>
                    {chain.logo}
                  </div>
                  <h4 className="text-lg font-bold mb-2">{chain.name}</h4>
                  <div className="space-y-2 text-sm text-foreground/60 mb-4">
                    <p>TVL: $2.3B</p>
                    <p>Daily Volume: $450M</p>
                    <p>Active Users: 25K</p>
                  </div>
                  <button className="w-full px-4 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition font-semibold">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bridges */}
          <div className="card-defi">
            <h3 className="text-2xl font-bold mb-6">Recent Bridges</h3>
            <div className="space-y-3">
              {[
                {
                  from: "Ethereum",
                  to: "Arbitrum",
                  amount: "500 USDh",
                  status: "Completed",
                  time: "2 hours ago",
                },
                {
                  from: "Optimism",
                  to: "Polygon",
                  amount: "250 USDh",
                  status: "Completed",
                  time: "5 hours ago",
                },
                {
                  from: "Ethereum",
                  to: "Base",
                  amount: "1,000 USDh",
                  status: "In Progress",
                  time: "Bridging...",
                },
                {
                  from: "Arbitrum",
                  to: "Ethereum",
                  amount: "750 USDh",
                  status: "Completed",
                  time: "1 day ago",
                },
              ].map((bridge, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-4 rounded-lg hover:bg-white/5 transition border border-border/30"
                >
                  <div>
                    <p className="font-semibold mb-1">
                      {bridge.from} → {bridge.to}
                    </p>
                    <p className="text-sm text-foreground/60">{bridge.amount}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        bridge.status === "Completed"
                          ? "bg-accent/20 text-accent"
                          : "bg-primary/20 text-primary"
                      }`}
                    >
                      {bridge.status}
                    </span>
                    <p className="text-xs text-foreground/60 mt-2">{bridge.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="glass p-8 rounded-2xl border border-primary/30 space-y-4">
            <h3 className="font-bold text-lg">About Cross-Chain Bridging</h3>
            <ul className="space-y-2 text-foreground/70 text-sm">
              <li className="flex gap-3">
                <span className="text-primary font-bold">→</span>
                <span>Bridges are secured by leading auditors and insurance providers</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">→</span>
                <span>Transactions are typically completed within 2-10 minutes</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">→</span>
                <span>Gas fees vary based on network congestion</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">→</span>
                <span>All bridged tokens maintain 1:1 parity with source tokens</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
