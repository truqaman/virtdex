import { useCallback, useState, useEffect } from 'react';
import { useWallet } from './useWallet';
import { useWeb3Contract } from './useWeb3Contract';

interface UseBalanceOptions {
  refetchInterval?: number;
  enabled?: boolean;
}

export const useBalance = (options: UseBalanceOptions = {}) => {
  const { refetchInterval = 30000, enabled = true } = options;
  const { address, isConnected } = useWallet();
  const { getUSDhBalance } = useWeb3Contract();
  
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!address || !isConnected || !enabled) return;

    try {
      setLoading(true);
      setError(null);
      const bal = await getUSDhBalance(address);
      setBalance(bal);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch balance');
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [address, isConnected, enabled, getUSDhBalance]);

  useEffect(() => {
    fetchBalance();

    if (refetchInterval > 0) {
      const interval = setInterval(fetchBalance, refetchInterval);
      return () => clearInterval(interval);
    }
  }, [fetchBalance, refetchInterval]);

  const refetch = useCallback(() => {
    return fetchBalance();
  }, [fetchBalance]);

  return {
    balance,
    loading,
    error,
    refetch,
  };
};

export const useStakedBalance = (options: UseBalanceOptions = {}) => {
  const { refetchInterval = 30000, enabled = true } = options;
  const { address, isConnected } = useWallet();
  const { getStakedBalance } = useWeb3Contract();
  
  const [stakedBalance, setStakedBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchStakedBalance = useCallback(async () => {
    if (!address || !isConnected || !enabled) return;

    try {
      setLoading(true);
      setError(null);
      const balance = await getStakedBalance(address);
      setStakedBalance(balance);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch staked balance');
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [address, isConnected, enabled, getStakedBalance]);

  useEffect(() => {
    fetchStakedBalance();

    if (refetchInterval > 0) {
      const interval = setInterval(fetchStakedBalance, refetchInterval);
      return () => clearInterval(interval);
    }
  }, [fetchStakedBalance, refetchInterval]);

  const refetch = useCallback(() => {
    return fetchStakedBalance();
  }, [fetchStakedBalance]);

  return {
    stakedBalance,
    loading,
    error,
    refetch,
  };
};
