import Parse from 'parse';

// Initialize Parse with Back4Apps credentials
export const initializeBack4Apps = () => {
  Parse.initialize('Co0TO8Nxt2frJ9SWNWaAb36cOWy1UmYBjA6R6F8u');
  Parse.serverURL = 'https://parseapi.back4app.com';
};

// Define Parse Classes for VirtDEX
export class User extends Parse.Object {
  constructor() {
    super('User');
  }
}

export class TradingPair extends Parse.Object {
  constructor() {
    super('TradingPair');
  }
}

export class SwapTransaction extends Parse.Object {
  constructor() {
    super('SwapTransaction');
  }
}

export class LiquidityPool extends Parse.Object {
  constructor() {
    super('LiquidityPool');
  }
}

export class TradeBot extends Parse.Object {
  constructor() {
    super('TradeBot');
  }
}

export class UserWallet extends Parse.Object {
  constructor() {
    super('UserWallet');
  }
}

export class TokenConfig extends Parse.Object {
  constructor() {
    super('TokenConfig');
  }
}

Parse.Object.registerSubclass('User', User);
Parse.Object.registerSubclass('TradingPair', TradingPair);
Parse.Object.registerSubclass('SwapTransaction', SwapTransaction);
Parse.Object.registerSubclass('LiquidityPool', LiquidityPool);
Parse.Object.registerSubclass('TradeBot', TradeBot);
Parse.Object.registerSubclass('UserWallet', UserWallet);
Parse.Object.registerSubclass('TokenConfig', TokenConfig);

// Database schema initialization
export const initializeDatabase = async () => {
  try {
    // Create schema for User table if not exists
    const userQuery = new Parse.Query('User');
    userQuery.limit(1);
    await userQuery.first();
  } catch (error) {
    console.log('Database initialized or already exists');
  }
};

// Helper functions for database operations
export const createUser = async (walletAddress: string, username: string) => {
  const user = new User();
  user.set('walletAddress', walletAddress);
  user.set('username', username);
  user.set('createdAt', new Date());
  return await user.save();
};

export const createTradingPair = async (tokenA: string, tokenB: string, decimalsA: number, decimalsB: number) => {
  const pair = new TradingPair();
  pair.set('tokenA', tokenA);
  pair.set('tokenB', tokenB);
  pair.set('decimalsA', decimalsA);
  pair.set('decimalsB', decimalsB);
  pair.set('pairId', `${tokenA}-${tokenB}`);
  pair.set('createdAt', new Date());
  return await pair.save();
};

export const recordSwap = async (
  userId: string,
  fromToken: string,
  toToken: string,
  fromAmount: string,
  toAmount: string,
  dexRouter: string
) => {
  const swap = new SwapTransaction();
  swap.set('userId', userId);
  swap.set('fromToken', fromToken);
  swap.set('toToken', toToken);
  swap.set('fromAmount', fromAmount);
  swap.set('toAmount', toAmount);
  swap.set('dexRouter', dexRouter);
  swap.set('timestamp', new Date());
  return await swap.save();
};
