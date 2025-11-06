import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Copy, LogOut, Loader } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { toast } from "@/hooks/use-toast";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme-mode");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const { address, isConnected, formatAddress, copyAddress, connectWallet, disconnect } =
    useWallet();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme-mode", newIsDark ? "dark" : "light");
  };

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

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      await connectWallet();
    } finally {
      setIsConnecting(false);
    }
  };

  const shortAddress = address ? formatAddress(address) : "";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white font-bold">
              Ø
            </div>
            <span className="font-bold text-xl hidden sm:inline">DeFiX</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link
              to="/dashboard"
              className="text-foreground/80 hover:text-primary transition"
            >
              Trade
            </Link>
            <Link
              to="/bots"
              className="text-foreground/80 hover:text-primary transition"
            >
              Bots
            </Link>
            <Link
              to="/wallet"
              className="text-foreground/80 hover:text-primary transition"
            >
              Wallet
            </Link>
            <Link
              to="/bridge"
              className="text-foreground/80 hover:text-primary transition"
            >
              Bridge
            </Link>
            <Link
              to="/analytics"
              className="text-foreground/80 hover:text-primary transition"
            >
              Analytics
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 transition"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Wallet Connection */}
            {isConnected && address ? (
              <div className="hidden sm:flex items-center gap-2 relative">
                <button
                  onClick={() => setShowWalletMenu(!showWalletMenu)}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  {shortAddress}
                </button>

                {showWalletMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 rounded-lg bg-background border border-border shadow-lg py-2 z-50">
                    <button
                      onClick={handleCopyAddress}
                      className="w-full px-4 py-2 text-left hover:bg-muted flex items-center gap-2 transition"
                    >
                      <Copy size={16} />
                      {copied ? "Copied!" : "Copy Address"}
                    </button>
                    <div className="border-t border-border my-2" />
                    <button
                      onClick={() => {
                        disconnect();
                        setShowWalletMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-muted flex items-center gap-2 transition text-destructive"
                    >
                      <LogOut size={16} />
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50"
              >
                {isConnecting ? (
                  <Loader size={18} className="animate-spin" />
                ) : null}
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border/50 mt-4 flex flex-col gap-3">
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trade
            </Link>
            <Link
              to="/bots"
              className="px-4 py-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Bots
            </Link>
            <Link
              to="/wallet"
              className="px-4 py-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Wallet
            </Link>
            <Link
              to="/bridge"
              className="px-4 py-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Bridge
            </Link>
            <Link
              to="/analytics"
              className="px-4 py-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Analytics
            </Link>
            {isConnected && address ? (
              <>
                <button
                  onClick={handleCopyAddress}
                  className="w-full px-4 py-2 rounded-lg bg-primary/20 text-primary font-semibold hover:bg-primary/30 transition flex items-center gap-2"
                >
                  <Copy size={16} />
                  {shortAddress}
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  handleConnect();
                  setMobileMenuOpen(false);
                }}
                disabled={isConnecting}
                className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg transition disabled:opacity-50"
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
