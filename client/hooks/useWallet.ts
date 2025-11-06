import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useCallback } from 'react';

export const useWallet = () => {
  const { 
    primaryWallet, 
    isAuthenticating,
    isAuthenticated,
    handleLogOut,
  } = useDynamicContext();

  const walletAddress = primaryWallet?.address || null;
  const isConnected = isAuthenticated && !!walletAddress;

  const copyAddress = useCallback(() => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      return true;
    }
    return false;
  }, [walletAddress]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return {
    address: walletAddress,
    isConnected,
    isAuthenticated,
    isAuthenticating,
    wallet: primaryWallet,
    disconnect: handleLogOut,
    copyAddress,
    formatAddress,
  };
};
