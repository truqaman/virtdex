import React, { createContext, useContext } from "react";
import { useWeb3Contract } from "@/hooks/useWeb3Contract";

interface Web3ContextType {
  provider: any;
  signer: any;
  connected: boolean;
  address: string | null;
  error: any;
  loading: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  getUSDhBalance: (userAddress?: string) => Promise<string>;
  approveUSDh: (spender: string, amount: string) => Promise<string>;
  getStakedBalance: (userAddress?: string) => Promise<string>;
  calculateStakingReward: (userAddress?: string) => Promise<string>;
  stake: (amount: string) => Promise<string>;
  unstake: (amount: string) => Promise<string>;
  createVirtualPool: (amount: string) => Promise<string>;
  getVirtualPoolInfo: (providerAddress?: string) => Promise<any>;
  getBotStatus: (botId: string) => Promise<any>;
  getBotPerformance: (botId: string) => Promise<any>;
  adjustBotCapital: (botId: string, newCapital: string) => Promise<string>;
  setBotActive: (botId: string, active: boolean) => Promise<string>;
  withdrawBotProfits: (botId: string, amount: string) => Promise<string>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const web3 = useWeb3Contract();

  return <Web3Context.Provider value={web3 as Web3ContextType}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
