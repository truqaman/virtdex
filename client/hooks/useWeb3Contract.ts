import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import {
  USDHSTABLECOIN_ADDRESS,
  USDHSTABLECOIN_ABI,
  DCAARBITRAGEBOT_ADDRESS,
  DCAARBITRAGEBOT_ABI,
  OPTIMISM_RPC,
  BOT_CONFIG,
  STAKING_CONFIG,
  POOL_CONFIG,
} from "@/config/web3";

export interface ContractError {
  message: string;
  code?: string;
}

export const useWeb3Contract = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<ContractError | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize provider on mount
  useEffect(() => {
    const initProvider = async () => {
      try {
        if (typeof window !== "undefined" && window.ethereum) {
          const p = new ethers.BrowserProvider(window.ethereum);
          setProvider(p);

          // Check if already connected
          const accounts = await p.listAccounts();
          if (accounts.length > 0) {
            setAddress(accounts[0].address);
            setSigner(accounts[0]);
            setConnected(true);
          }
        } else {
          // Use JSON-RPC provider as fallback (read-only)
          const fallbackProvider = new ethers.JsonRpcProvider(OPTIMISM_RPC);
          setProvider(fallbackProvider);
        }
      } catch (err) {
        console.error("Provider initialization error:", err);
      }
    };

    initProvider();
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error("MetaMask or Web3 wallet not found");
      }

      const p = new ethers.BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        const s = await p.getSigner();
        setSigner(s);
        setProvider(p);
        setAddress(accounts[0]);
        setConnected(true);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Connection failed";
      setError({ message, code: "WALLET_CONNECTION_ERROR" });
      console.error("Wallet connection error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setSigner(null);
    setAddress(null);
    setConnected(false);
  }, []);

  const getUSDhBalance = useCallback(
    async (userAddress?: string) => {
      try {
        if (!provider) return "0";

        const contract = new ethers.Contract(
          USDHSTABLECOIN_ADDRESS,
          USDHSTABLECOIN_ABI,
          provider
        );

        const account = userAddress || address;
        if (!account) return "0";

        const balance = await contract.balanceOf(account);
        return balance.toString();
      } catch (err) {
        console.error("Error getting balance:", err);
        return "0";
      }
    },
    [provider, address]
  );

  const approveUSDh = useCallback(
    async (spender: string, amount: string) => {
      try {
        setLoading(true);
        setError(null);

        if (!signer) throw new Error("Wallet not connected");

        const contract = new ethers.Contract(
          USDHSTABLECOIN_ADDRESS,
          USDHSTABLECOIN_ABI,
          signer
        );

        const tx = await contract.approve(spender, amount);
        await tx.wait();

        return tx.hash;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Approval failed";
        setError({ message, code: "APPROVAL_ERROR" });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [signer]
  );

  const getStakedBalance = useCallback(
    async (userAddress?: string) => {
      try {
        if (!provider) return "0";

        const contract = new ethers.Contract(
          USDHSTABLECOIN_ADDRESS,
          USDHSTABLECOIN_ABI,
          provider
        );

        const account = userAddress || address;
        if (!account) return "0";

        const stakedBalance = await contract.stakedBalances(account);
        return stakedBalance.toString();
      } catch (err) {
        console.error("Error getting staked balance:", err);
        return "0";
      }
    },
    [provider, address]
  );

  const calculateStakingReward = useCallback(
    async (userAddress?: string) => {
      try {
        if (!provider) return "0";

        const contract = new ethers.Contract(
          USDHSTABLECOIN_ADDRESS,
          USDHSTABLECOIN_ABI,
          provider
        );

        const account = userAddress || address;
        if (!account) return "0";

        const reward = await contract.calculateReward(account);
        return reward.toString();
      } catch (err) {
        console.error("Error calculating reward:", err);
        return "0";
      }
    },
    [provider, address]
  );

  const stake = useCallback(
    async (amount: string) => {
      try {
        setLoading(true);
        setError(null);

        if (!signer) throw new Error("Wallet not connected");

        // First approve the contract
        await approveUSDh(USDHSTABLECOIN_ADDRESS, amount);

        const contract = new ethers.Contract(
          USDHSTABLECOIN_ADDRESS,
          USDHSTABLECOIN_ABI,
          signer
        );

        const tx = await contract.stake(amount);
        await tx.wait();

        return tx.hash;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Staking failed";
        setError({ message, code: "STAKING_ERROR" });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [signer, approveUSDh]
  );

  const unstake = useCallback(
    async (amount: string) => {
      try {
        setLoading(true);
        setError(null);

        if (!signer) throw new Error("Wallet not connected");

        const contract = new ethers.Contract(
          USDHSTABLECOIN_ADDRESS,
          USDHSTABLECOIN_ABI,
          signer
        );

        const tx = await contract.unstake(amount);
        await tx.wait();

        return tx.hash;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unstaking failed";
        setError({ message, code: "UNSTAKING_ERROR" });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [signer]
  );

  const createVirtualPool = useCallback(
    async (amount: string) => {
      try {
        setLoading(true);
        setError(null);

        if (!signer) throw new Error("Wallet not connected");

        // First approve the contract
        await approveUSDh(USDHSTABLECOIN_ADDRESS, amount);

        const contract = new ethers.Contract(
          USDHSTABLECOIN_ADDRESS,
          USDHSTABLECOIN_ABI,
          signer
        );

        const tx = await contract.createVirtualPool(amount);
        await tx.wait();

        return tx.hash;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Pool creation failed";
        setError({ message, code: "POOL_CREATION_ERROR" });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [signer, approveUSDh]
  );

  const getVirtualPoolInfo = useCallback(
    async (providerAddress?: string) => {
      try {
        if (!provider) return null;

        const contract = new ethers.Contract(
          USDHSTABLECOIN_ADDRESS,
          USDHSTABLECOIN_ABI,
          provider
        );

        const account = providerAddress || address;
        if (!account) return null;

        const poolInfo = await contract.getVirtualPoolInfo(account);
        return {
          committedAmount: poolInfo[0].toString(),
          availableAmount: poolInfo[1].toString(),
          feesEarned: poolInfo[2].toString(),
          isActive: poolInfo[3],
        };
      } catch (err) {
        console.error("Error getting pool info:", err);
        return null;
      }
    },
    [provider, address]
  );

  // DCAArbitrageBot functions
  const getBotStatus = useCallback(
    async (botId: string) => {
      try {
        if (!provider) return null;

        const contract = new ethers.Contract(
          DCAARBITRAGEBOT_ADDRESS,
          DCAARBITRAGEBOT_ABI,
          provider
        );

        const status = await contract.getBotStatus(botId);
        return {
          isActive: status[0],
          nextExecution: status[1].toString(),
          capitalRemaining: status[2].toString(),
        };
      } catch (err) {
        console.error("Error getting bot status:", err);
        return null;
      }
    },
    [provider]
  );

  const getBotPerformance = useCallback(
    async (botId: string) => {
      try {
        if (!provider) return null;

        const contract = new ethers.Contract(
          DCAARBITRAGEBOT_ADDRESS,
          DCAARBITRAGEBOT_ABI,
          provider
        );

        const performance = await contract.getBotPerformance(botId);
        return {
          totalProfit: performance[0].toString(),
          totalTrades: performance[1].toString(),
          successRate: performance[2].toString(),
          currentApy: performance[3].toString(),
        };
      } catch (err) {
        console.error("Error getting bot performance:", err);
        return null;
      }
    },
    [provider]
  );

  const adjustBotCapital = useCallback(
    async (botId: string, newCapital: string) => {
      try {
        setLoading(true);
        setError(null);

        if (!signer) throw new Error("Wallet not connected");

        const contract = new ethers.Contract(
          DCAARBITRAGEBOT_ADDRESS,
          DCAARBITRAGEBOT_ABI,
          signer
        );

        const tx = await contract.adjustBotCapital(botId, newCapital);
        await tx.wait();

        return tx.hash;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Capital adjustment failed";
        setError({ message, code: "BOT_ADJUSTMENT_ERROR" });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [signer]
  );

  const setBotActive = useCallback(
    async (botId: string, active: boolean) => {
      try {
        setLoading(true);
        setError(null);

        if (!signer) throw new Error("Wallet not connected");

        const contract = new ethers.Contract(
          DCAARBITRAGEBOT_ADDRESS,
          DCAARBITRAGEBOT_ABI,
          signer
        );

        const tx = await contract.setBotActive(botId, active);
        await tx.wait();

        return tx.hash;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Bot status update failed";
        setError({ message, code: "BOT_STATUS_ERROR" });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [signer]
  );

  const withdrawBotProfits = useCallback(
    async (botId: string, amount: string) => {
      try {
        setLoading(true);
        setError(null);

        if (!signer) throw new Error("Wallet not connected");

        const contract = new ethers.Contract(
          DCAARBITRAGEBOT_ADDRESS,
          DCAARBITRAGEBOT_ABI,
          signer
        );

        const tx = await contract.withdrawProfits(botId, amount);
        await tx.wait();

        return tx.hash;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Withdrawal failed";
        setError({ message, code: "WITHDRAWAL_ERROR" });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [signer]
  );

  return {
    provider,
    signer,
    connected,
    address,
    error,
    loading,
    connectWallet,
    disconnectWallet,
    getUSDhBalance,
    approveUSDh,
    getStakedBalance,
    calculateStakingReward,
    stake,
    unstake,
    createVirtualPool,
    getVirtualPoolInfo,
    getBotStatus,
    getBotPerformance,
    adjustBotCapital,
    setBotActive,
    withdrawBotProfits,
  };
};
