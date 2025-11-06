import { Header } from "@/components/Header";
import { BotDeploymentForm } from "@/components/BotDeploymentForm";
import { BotManager } from "@/components/BotManager";
import { useState } from "react";
import { Zap } from "lucide-react";

export default function Bots() {
  const [deployedBots, setDeployedBots] = useState<string[]>([]);

  const handleBotDeployed = (botId: string) => {
    if (!deployedBots.includes(botId)) {
      setDeployedBots([...deployedBots, botId]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card to-background">
      <Header />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-black">Bot Factory</h1>
            <p className="text-xl text-foreground/70 max-w-2xl">
              Create and manage intelligent DCA arbitrage trading bots with customizable parameters
            </p>
          </div>

          {/* Bot Deployment */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Zap className="text-accent" />
              Deploy New Bot
            </h2>
            <BotDeploymentForm onSuccess={handleBotDeployed} />
          </div>

          {/* Bot Management */}
          {deployedBots.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Zap className="text-accent" />
                Active Bots
              </h2>
              <BotManager bots={deployedBots} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
