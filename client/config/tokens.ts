// VirtDEX Token Configuration
// All tokens configured for Optimism Mainnet

export interface TokenConfig {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logo?: string;
  category: 'stablecoin' | 'erc20' | 'stake-token' | 'platform-token';
  chainId: number;
}

// Platform Default Tokens
export const PLATFORM_TOKENS: TokenConfig[] = [
  // Platform Stablecoin
  {
    symbol: 'USDh',
    name: 'USD Hedge',
    address: '0xFA16ddB46dEa8cB154570dB48aaD6b9021dbeDB5',
    decimals: 18,
    category: 'stablecoin',
    chainId: 10,
  },
  // Platform Stake Tokens
  {
    symbol: 'YL$',
    name: 'YuLiP$',
    address: '', // Will be provided during integration
    decimals: 18,
    category: 'platform-token',
    chainId: 10,
  },
  {
    symbol: 'Cosmic-ETH',
    name: 'Cosmic Ethereum',
    address: '', // Will be provided during integration
    decimals: 18,
    category: 'stake-token',
    chainId: 10,
  },
  {
    symbol: 'hETH',
    name: 'hilipETH',
    address: '', // Will be provided during integration
    decimals: 18,
    category: 'stake-token',
    chainId: 10,
  },
];

// Major Tokens for Trading
export const MAJOR_TOKENS: TokenConfig[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    category: 'erc20',
    chainId: 10,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    decimals: 6,
    category: 'stablecoin',
    chainId: 10,
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    address: '0xDA10009Cbd5D07dd0CeCc66161FC93D7c9000da1',
    decimals: 18,
    category: 'stablecoin',
    chainId: 10,
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    decimals: 6,
    category: 'stablecoin',
    chainId: 10,
  },
  {
    symbol: 'ARB',
    name: 'Arbitrum',
    address: '0x912CE59144191c1204E64559FE8253a0e108FF4e',
    decimals: 18,
    category: 'erc20',
    chainId: 10,
  },
  {
    symbol: 'OP',
    name: 'Optimism',
    address: '0x4200000000000000000000000000000000000042',
    decimals: 18,
    category: 'erc20',
    chainId: 10,
  },
  {
    symbol: 'SNX',
    name: 'Synthetix',
    address: '0x8700dAec35aF8Ff430C50412A0145b5A3F11b5ba',
    decimals: 18,
    category: 'erc20',
    chainId: 10,
  },
  {
    symbol: 'VELO',
    name: 'Velodrome',
    address: '0x9560e827aF36c94B321b30b36D504e3CB65c7604',
    decimals: 18,
    category: 'erc20',
    chainId: 10,
  },
  {
    symbol: 'AAVE',
    name: 'Aave',
    address: '0x76FB31fb4af56758f888c245DAeA3396ED3a0644',
    decimals: 18,
    category: 'erc20',
    chainId: 10,
  },
  {
    symbol: 'CRV',
    name: 'Curve DAO Token',
    address: '0x0994206dfE8De6Ec6920FA6E2CC1211E5175d079',
    decimals: 18,
    category: 'erc20',
    chainId: 10,
  },
];

// All tokens combined
export const ALL_TOKENS = [...PLATFORM_TOKENS, ...MAJOR_TOKENS];

// Get token by symbol
export const getTokenBySymbol = (symbol: string): TokenConfig | undefined => {
  return ALL_TOKENS.find((t) => t.symbol.toUpperCase() === symbol.toUpperCase());
};

// Get token by address
export const getTokenByAddress = (address: string): TokenConfig | undefined => {
  return ALL_TOKENS.find((t) => t.address.toLowerCase() === address.toLowerCase());
};

// Get all stablecoin tokens
export const getStablecoins = (): TokenConfig[] => {
  return ALL_TOKENS.filter((t) => t.category === 'stablecoin');
};

// Get all platform tokens
export const getPlatformTokens = (): TokenConfig[] => {
  return PLATFORM_TOKENS;
};
