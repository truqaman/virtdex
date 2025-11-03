// Web3 Configuration
export const USDHSTABLECOIN_ADDRESS = "0xFA16ddB46dEa8cB154570dB48aaD6b9021dbeDB5";
export const DCAARBITRAGEBOT_ADDRESS = "0xD88bc3A753bB43579da71a3AE2664DA6DA3cae6b";

// Optimism Mainnet Chain ID
export const OPTIMISM_CHAIN_ID = 10;
export const OPTIMISM_RPC = "https://mainnet.optimism.io";

// Supported Chains Configuration
export const CHAINS = {
  optimism: {
    id: 10,
    name: "Optimism",
    symbol: "OP",
    rpc: "https://mainnet.optimism.io",
    blockExplorer: "https://optimismscan.io",
  },
  ethereum: {
    id: 1,
    name: "Ethereum",
    symbol: "ETH",
    rpc: "https://eth.llamarpc.com",
    blockExplorer: "https://etherscan.io",
  },
  arbitrum: {
    id: 42161,
    name: "Arbitrum One",
    symbol: "ARB",
    rpc: "https://arb1.arbitrum.io/rpc",
    blockExplorer: "https://arbiscan.io",
  },
  polygon: {
    id: 137,
    name: "Polygon",
    symbol: "MATIC",
    rpc: "https://polygon-rpc.com",
    blockExplorer: "https://polygonscan.com",
  },
  base: {
    id: 8453,
    name: "Base",
    symbol: "BASE",
    rpc: "https://mainnet.base.org",
    blockExplorer: "https://basescan.org",
  },
  linea: {
    id: 59144,
    name: "Linea",
    symbol: "LINEA",
    rpc: "https://rpc.linea.build",
    blockExplorer: "https://lineascan.build",
  },
};

// Bot Configuration Defaults
export const BOT_CONFIG = {
  defaultCapitalAllocation: "10000000000000000000000", // 10000 USDh in wei (18 decimals)
  minProfitThreshold: 50, // 0.5% = 50 basis points
  dcaInterval: 50000, // seconds
  maxTradeSize: "5000000000000000000000", // 5000 USDh in wei (50% of 10000)
};

// Staking Configuration
export const STAKING_CONFIG = {
  apy: 2400, // 24% APY in basis points
  lockupPeriod: 0, // No lockup period
};

// Virtual Liquidity Pool Configuration
export const POOL_CONFIG = {
  feePercentage: 30, // 0.3% = 30 basis points
  minimumLiquidity: "1000000000000000000000", // 1000 USDh in wei
};

// USDh Stablecoin ABI
export const USDHSTABLECOIN_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Staked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstaked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "provider",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "VirtualPoolCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "calculateReward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "createVirtualPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalVirtualLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "provider",
        type: "address",
      },
    ],
    name: "getVirtualPoolInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "committedAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "availableAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "feesEarned",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "stakedBalances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawEarnedFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// DCAArbitrageBot ABI (simplified - key functions)
export const DCAARBITRAGEBOT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_usdhAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "initialOwner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "botId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "profit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "ArbitrageExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "botId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newCapital",
        type: "uint256",
      },
    ],
    name: "BotCapitalAdjusted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "botId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "newCapital",
        type: "uint256",
      },
    ],
    name: "adjustBotCapital",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "botId",
        type: "string",
      },
      {
        components: [
          {
            internalType: "address",
            name: "tokenIn",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "expectedProfit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bestAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "bestProvider",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct DCAArbitrageBot.ArbitrageOpportunity",
        name: "opportunity",
        type: "tuple",
      },
    ],
    name: "executeDCAArbitrage",
    outputs: [
      {
        internalType: "uint256",
        name: "profit",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "botId",
        type: "string",
      },
      {
        internalType: "bool",
        name: "active",
        type: "bool",
      },
    ],
    name: "setBotActive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "botId",
        type: "string",
      },
    ],
    name: "getBotPerformance",
    outputs: [
      {
        internalType: "uint256",
        name: "totalProfit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalTrades",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "successRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentApy",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "botId",
        type: "string",
      },
    ],
    name: "getBotStatus",
    outputs: [
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "nextExecution",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "capitalRemaining",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "bots",
    outputs: [
      {
        internalType: "uint256",
        name: "capitalAllocation",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxTradeSize",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minProfitThreshold",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "dcaInterval",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastExecution",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "botProfits",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "botId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawProfits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
