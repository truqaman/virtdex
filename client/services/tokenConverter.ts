import { ethers } from "ethers";
import { TokenConfig } from "@/config/tokens";

/**
 * Token Conversion Service
 * Handles conversion between tokens based on locked assets rate
 * Ensures token standards are maintained during conversion
 */

export interface ConversionRate {
  fromToken: string;
  toToken: string;
  rate: string; // Stored as string to preserve precision
  timestamp: number;
  source: "oracle" | "dex" | "locked-assets";
}

interface LockedAsset {
  token: string;
  amount: string;
  rate: string;
}

class TokenConverter {
  private conversionRates: Map<string, ConversionRate> = new Map();
  private lockedAssets: Map<string, LockedAsset[]> = new Map();

  /**
   * Convert amount from one token to another based on locked assets rate
   */
  convertFromLockedRate(
    fromToken: TokenConfig,
    toToken: TokenConfig,
    amount: string,
    lockedAssetsRate: string,
  ): string {
    try {
      const fromDecimals = fromToken.decimals;
      const toDecimals = toToken.decimals;

      // Normalize amount to base units
      const amountBN = ethers.parseUnits(amount, fromDecimals);

      // Apply locked assets rate
      const rateBN = ethers.parseUnits(lockedAssetsRate, 18);

      // Calculate converted amount: (amount * rate) / 10^18
      const converted = (amountBN * rateBN) / ethers.parseUnits("1", 18);

      // Adjust for destination token decimals
      const result = ethers.formatUnits(converted, toDecimals);

      return result;
    } catch (error) {
      console.error("Token conversion error:", error);
      return "0";
    }
  }

  /**
   * Register a locked asset with its conversion rate
   */
  registerLockedAsset(
    poolId: string,
    token: string,
    amount: string,
    rate: string,
  ): void {
    if (!this.lockedAssets.has(poolId)) {
      this.lockedAssets.set(poolId, []);
    }

    const assets = this.lockedAssets.get(poolId)!;
    assets.push({ token, amount, rate });
  }

  /**
   * Get conversion rate between two tokens
   */
  getConversionRate(pairId: string): ConversionRate | undefined {
    return this.conversionRates.get(pairId);
  }

  /**
   * Update conversion rate for a token pair
   */
  updateConversionRate(
    fromToken: string,
    toToken: string,
    rate: string,
    source: "oracle" | "dex" | "locked-assets" = "dex",
  ): void {
    const pairId = `${fromToken}-${toToken}`;
    this.conversionRates.set(pairId, {
      fromToken,
      toToken,
      rate,
      timestamp: Date.now(),
      source,
    });
  }

  /**
   * Get locked assets for a pool
   */
  getLockedAssets(poolId: string): LockedAsset[] {
    return this.lockedAssets.get(poolId) || [];
  }

  /**
   * Calculate total value of locked assets
   */
  calculateLockedAssetValue(
    poolId: string,
    referenceToken: TokenConfig,
  ): string {
    const assets = this.getLockedAssets(poolId);
    let totalValue = ethers.parseUnits("0", 18);

    for (const asset of assets) {
      try {
        const assetAmount = ethers.parseUnits(asset.amount, 18);
        const assetRate = ethers.parseUnits(asset.rate, 18);

        // Value = amount * rate
        const value = (assetAmount * assetRate) / ethers.parseUnits("1", 18);
        totalValue = totalValue + value;
      } catch (error) {
        console.error(`Failed to calculate value for ${asset.token}:`, error);
      }
    }

    return ethers.formatUnits(totalValue, referenceToken.decimals);
  }

  /**
   * Maintain token standards during conversion
   * Ensures converted amount respects minimum and maximum values
   */
  enforceTokenStandards(
    amount: string,
    tokenDecimals: number,
    minAmount?: string,
    maxAmount?: string,
  ): {
    valid: boolean;
    amount: string;
    error?: string;
  } {
    try {
      const amountBN = ethers.parseUnits(amount, tokenDecimals);

      if (minAmount) {
        const minBN = ethers.parseUnits(minAmount, tokenDecimals);
        if (amountBN < minBN) {
          return {
            valid: false,
            amount: "0",
            error: `Amount below minimum of ${minAmount}`,
          };
        }
      }

      if (maxAmount) {
        const maxBN = ethers.parseUnits(maxAmount, tokenDecimals);
        if (amountBN > maxBN) {
          return {
            valid: false,
            amount: "0",
            error: `Amount exceeds maximum of ${maxAmount}`,
          };
        }
      }

      return { valid: true, amount };
    } catch (error) {
      return {
        valid: false,
        amount: "0",
        error: "Invalid amount format",
      };
    }
  }

  /**
   * Calculate fee for token conversion
   * Fee structure based on locked assets to incentivize liquidity provision
   */
  calculateConversionFee(
    amount: string,
    lockedAssetRatio: string, // Ratio of locked assets to total pool
    baseFeePercentage: number = 0.25, // 0.25% base fee
  ): string {
    try {
      const amountBN = ethers.parseUnits(amount, 18);
      const ratioBN = ethers.parseUnits(lockedAssetRatio, 18);

      // Reduce fee based on locked assets (more liquidity = lower fee)
      // Fee = baseFee * (1 - (lockedRatio * 0.5))
      const baseFee =
        (amountBN * BigInt(baseFeePercentage * 100)) /
        ethers.parseUnits("100", 0);
      const feeDelta = (baseFee * ratioBN) / ethers.parseUnits("2", 18);
      const finalFee = baseFee - feeDelta;

      return ethers.formatUnits(finalFee, 18);
    } catch (error) {
      console.error("Fee calculation error:", error);
      return "0";
    }
  }
}

export const tokenConverter = new TokenConverter();
