import { BrowserWallet } from '@meshsdk/core';
import { BrowserProvider, Eip1193Provider, JsonRpcSigner } from 'ethers';
import { createContext, useContext, useReducer } from 'react';

export type WalletState = {
  wallet: any | null;
  walletProvider: Eip1193Provider | BrowserWallet | null;
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  account: string;
  chainId: number | null;
  connected: boolean;
  network: any;
  networkName: string;
  testnet: boolean;
  balance: { symbol: string; value: number } | null;
};

const initialState: WalletState = {
  wallet: null,
  walletProvider: null,
  provider: null,
  signer: null,
  account: '',
  chainId: null,
  connected: false,
  network: null,
  networkName: '',
  testnet: false,
  balance: null,
};

export type WalletAction = { type: 'CONNECT'; payload: WalletState } | { type: 'DISCONNECT' };

const WalletContext = createContext<{
  state: WalletState;
  dispatch: React.Dispatch<WalletAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

function walletReducer(state: WalletState, action: WalletAction): WalletState {
  switch (action.type) {
    case 'CONNECT':
      return {
        ...state,
        ...action.payload,
      };
    case 'DISCONNECT':
      return initialState;
    default:
      return state;
  }
}

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  return <WalletContext.Provider value={{ state, dispatch }}>{children}</WalletContext.Provider>;
};

export const useWalletContext = () => useContext(WalletContext);
