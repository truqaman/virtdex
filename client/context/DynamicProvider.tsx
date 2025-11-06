import React from 'react';

interface DynamicProviderProps {
  children: React.ReactNode;
}

/**
 * Dynamic Provider Wrapper
 * 
 * Dynamic Labs SDK requires a valid environment ID to function.
 * This is a simplified wrapper that passes through children for now.
 * To enable Dynamic wallet support:
 * 1. Create account at https://app.dynamic.xyz
 * 2. Create a new environment and copy the Environment ID
 * 3. Set VITE_DYNAMIC_ENVIRONMENT_ID in your .env file
 * 4. Uncomment the DynamicContextProvider implementation below
 */
export const DynamicProvider: React.FC<DynamicProviderProps> = ({ children }) => {
  return <>{children}</>;
};
