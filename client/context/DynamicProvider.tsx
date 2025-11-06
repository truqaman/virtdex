import React from 'react';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';

interface DynamicProviderProps {
  children: React.ReactNode;
}

export const DynamicProvider: React.FC<DynamicProviderProps> = ({ children }) => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: 'default',
        walletConnectors: [EthereumWalletConnectors],
        networkMap: [
          {
            chainId: 10,
            chainName: 'Optimism',
            networkType: 'EVM',
            rpcServer: {
              url: 'https://mainnet.optimism.io',
            },
            blockExplorerUrl: 'https://optimismscan.io',
            nativeCurrency: {
              decimals: 18,
              name: 'Ethereum',
              symbol: 'ETH',
            },
          },
          {
            chainId: 1,
            chainName: 'Ethereum',
            networkType: 'EVM',
            rpcServer: {
              url: 'https://eth.llamarpc.com',
            },
            blockExplorerUrl: 'https://etherscan.io',
            nativeCurrency: {
              decimals: 18,
              name: 'Ethereum',
              symbol: 'ETH',
            },
          },
          {
            chainId: 42161,
            chainName: 'Arbitrum One',
            networkType: 'EVM',
            rpcServer: {
              url: 'https://arb1.arbitrum.io/rpc',
            },
            blockExplorerUrl: 'https://arbiscan.io',
            nativeCurrency: {
              decimals: 18,
              name: 'Ethereum',
              symbol: 'ETH',
            },
          },
          {
            chainId: 137,
            chainName: 'Polygon',
            networkType: 'EVM',
            rpcServer: {
              url: 'https://polygon-rpc.com',
            },
            blockExplorerUrl: 'https://polygonscan.com',
            nativeCurrency: {
              decimals: 18,
              name: 'Matic',
              symbol: 'MATIC',
            },
          },
          {
            chainId: 8453,
            chainName: 'Base',
            networkType: 'EVM',
            rpcServer: {
              url: 'https://mainnet.base.org',
            },
            blockExplorerUrl: 'https://basescan.org',
            nativeCurrency: {
              decimals: 18,
              name: 'Ethereum',
              symbol: 'ETH',
            },
          },
          {
            chainId: 59144,
            chainName: 'Linea',
            networkType: 'EVM',
            rpcServer: {
              url: 'https://rpc.linea.build',
            },
            blockExplorerUrl: 'https://lineascan.build',
            nativeCurrency: {
              decimals: 18,
              name: 'Ethereum',
              symbol: 'ETH',
            },
          },
        ],
      }}
    >
      {children}
    </DynamicContextProvider>
  );
};
