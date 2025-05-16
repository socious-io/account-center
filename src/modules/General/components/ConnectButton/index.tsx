import { BrowserWallet, Wallet } from '@meshsdk/core';
import { useEffect, useState } from 'react';
import { truncateFromMiddle } from 'src/core/helpers/texts';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import Button from '../Button';
import styles from './index.module.scss';
import ChooseWalletModal from '../ChooseWalletModal';

//FIXME: ts error and handle show error
const Connect = (defaultAddress = '') => {
  const { address: evmAddress = '', isConnected: isEvmConnected } = useAccount();
  const { connectors, connect: connectEvm } = useConnect();
  const { disconnect } = useDisconnect();
  const [address, setAddress] = useState(defaultAddress);
  const [wallet, setWallet] = useState<BrowserWallet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableWallets, setAvailableWallets] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [walletType, setWalletType] = useState<string | null>(localStorage.getItem('walletType'));
  const [error, setError] = useState('');
  const connected = !!address || isEvmConnected;

  useEffect(() => {
    if (isEvmConnected && evmAddress) {
      setAddress(evmAddress);
    }
  }, [evmAddress, isEvmConnected]);

  const connectCardanoWallet = async (walletName: string) => {
    try {
      const wallet = await BrowserWallet.enable(walletName);
      const address = await wallet.getChangeAddress();
      handleWalletSelect({ wallet, address, type: 'cardano' });
      localStorage.setItem('selectedWallet', walletName);
    } catch (error: any) {
      console.error(error.message);
      setError(`Failed to connect your ${walletName} wallet. Please try again.`);
    }
  };

  const connectEvmWallet = async (connector: any) => {
    try {
      await connectEvm({ connector });
      const accounts = await connector.getAccount?.();
      handleWalletSelect({ wallet: connector, address: accounts, type: 'evm' });
    } catch (error: any) {
      console.error(error.message);
      setError(`Failed to connect your ${connector.name} wallet. Please try again.`);
    }
  };

  const handleClick = async () => {
    if (connected) {
      setIsDropdownOpen(prev => !prev);
      return;
    }

    const cardanoWallets: Wallet[] = await BrowserWallet.getAvailableWallets();
    const evmWallets = connectors.map(connector => ({
      name: connector.name,
      connector: connector,
      type: 'evm',
    }));

    const wallets = [...cardanoWallets.map(w => ({ ...w, type: 'cardano' })), ...evmWallets];

    if (!wallets.length) {
      setError('No Cardano or Ether wallet detected.');
      return;
    }

    if (wallets.length === 1) {
      const wallet = wallets[0];
      if (wallet.type === 'cardano') {
        connectCardanoWallet(wallet.name);
      } else {
        connectEvmWallet(wallet.connector);
      }
    } else {
      setAvailableWallets(wallets);
      setIsModalOpen(true);
    }
  };

  const handleWalletSelect = ({ wallet, address, type }) => {
    setWallet(wallet);
    setAddress(address);
    setIsModalOpen(false);
    setWalletType(type);
    localStorage.setItem('walletType', type);
  };

  const handleDisconnect = () => {
    if (walletType === 'evm') {
      disconnect();
    }

    setWallet(null);
    setAddress('');
    setIsDropdownOpen(false);
    setWalletType(null);
    localStorage.removeItem('walletType');
    localStorage.removeItem('selectedWallet');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setIsDropdownOpen(false);
  };

  const onWalletSelect = wallet => {
    if (wallet.type === 'cardano') {
      connectCardanoWallet(wallet.name);
    } else if (wallet.type === 'evm') {
      connectEvmWallet(wallet.connector);
    }
  };

  const ConnectButton = () => (
    <div className="relative">
      <Button color="info" onClick={handleClick} block>
        {address ? truncateFromMiddle(address, 5, 5) : 'Connect wallet'}
      </Button>
      {connected && isDropdownOpen && (
        <div className={styles['menu']}>
          <button onClick={handleDisconnect} className={styles['menu__item']}>
            Disconnect
          </button>
          <button onClick={handleCopy} className={styles['menu__item']}>
            Copy Address
          </button>
        </div>
      )}
      {!!availableWallets.length && (
        <ChooseWalletModal
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          wallets={availableWallets}
          headerDivider
          onWalletSelect={onWalletSelect}
        />
      )}
    </div>
  );

  return {
    ConnectButton,
    address,
    connected,
    wallet,
  };
};

export default Connect;
