import { useCallback } from 'react';
import { useWeb3 } from '@/context/Web3Context';

export const useWallet = () => {
  const { connected, address, connectWallet, disconnectWallet } = useWeb3();

  const copyAddress = useCallback(() => {
    if (address) {
      navigator.clipboard.writeText(address);
      return true;
    }
    return false;
  }, [address]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return {
    address,
    isConnected: connected,
    isAuthenticated: connected,
    isAuthenticating: false,
    wallet: address ? { address } : null,
    disconnect: disconnectWallet,
    connectWallet,
    copyAddress,
    formatAddress,
  };
};
