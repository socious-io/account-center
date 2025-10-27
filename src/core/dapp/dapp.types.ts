import { Interface, InterfaceAbi } from 'ethers';
import { Chain } from 'viem';

export interface Token {
  name: string;
  symbol: string;
  address?: string;
  decimals?: number;
}

export interface Network {
  chain: Chain;
  name: string;
  escrow: string;
  old?: boolean;
  logic?: string;
  tokens: Token[];
}

export interface DappConfig {
  walletConnetProjectId: string;
  mainet: Network[];
  testnet: Network[];
  abis: {
    escrow: Interface | InterfaceAbi;
    token: Interface | InterfaceAbi;
  };
}
