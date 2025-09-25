import { config } from 'src/config';
import { http, createConfig } from 'wagmi';
import { Chain } from 'wagmi/chains';
import { metaMask, walletConnect } from 'wagmi/connectors';

import { dappConfig } from './dapp.config';
import { Network } from './dapp.types';

export const NETWORKS: Network[] = config.dappENV === 'mainet' ? dappConfig.mainet : dappConfig.testnet;

const chains = NETWORKS.map(n => n.chain);

const projectId = dappConfig.walletConnetProjectId;

export const wagmiConfig = createConfig({
  chains: chains as [Chain, ...Chain[]],
  connectors: [walletConnect({ projectId }), metaMask()],
  transports: Object.fromEntries(chains.map(chain => [chain.id, http(chain.rpcUrls.default?.http[0])])),
});
