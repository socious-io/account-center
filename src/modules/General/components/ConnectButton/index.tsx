import { BrowserWallet, Wallet } from '@meshsdk/core';
import { useEffect, useState } from 'react';
import { truncateFromMiddle } from 'src/core/helpers/texts';
import { translate } from 'src/core/helpers/utils';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import Button from '../Button';
import styles from './index.module.scss';
import ChooseWalletModal from '../ChooseWalletModal';
import { CardanoWallet, EVMWallet } from './index.type';
import Icon from '../Icon';

const Connect = (defaultAddress = '') => {
  const { address: evmAddress = '', isConnected: isEvmConnected } = useAccount();
  const { connectors, connect: connectEvm } = useConnect();
  const { disconnect } = useDisconnect();
  const [address, setAddress] = useState(defaultAddress);
  const [wallet, setWallet] = useState<BrowserWallet | EVMWallet['connector'] | null>(null);
  const [availableWallets, setAvailableWallets] = useState<(CardanoWallet | EVMWallet)[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [, setError] = useState('');
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
      handleConnect({ wallet, address, name: walletName, type: 'cardano' });
    } catch (error: any) {
      console.error(error.message);
      setError(translate('payments-method-crypto-wallet.not-connected-error', { walletName }));
    }
  };

  const connectEvmWallet = async (connector: EVMWallet['connector']) => {
    try {
      await connectEvm({ connector });
      handleConnect({ wallet: connector, address: evmAddress, name: connector.name, type: 'evm' });
    } catch (error: any) {
      console.error(error.message);
      setError(translate('payments-method-crypto-wallet.not-connected-error', { walletName: connector.name }));
    }
  };

  const handleClick = async () => {
    if (connected) {
      setShowMenu(prev => !prev);
      return;
    }

    const cardanoWallets: Wallet[] = await BrowserWallet.getAvailableWallets();
    const evmWallets: EVMWallet[] = connectors.map(connector => ({
      name: connector.name,
      icon: connector.name.replaceAll(' ', '').toLowerCase(),
      connector: connector,
      type: 'evm',
    }));

    const wallets = [
      ...(cardanoWallets.map(wallet => ({ ...wallet, type: 'cardano' })) as CardanoWallet[]),
      ...evmWallets,
    ];

    if (!wallets.length) {
      setError(translate('payments-method-crypto-wallet.not-installed-error'));
      return;
    }

    if (wallets.length === 1) {
      const wallet = wallets[0];
      wallet.type === 'cardano' ? connectCardanoWallet(wallet.name) : connectEvmWallet((wallet as EVMWallet).connector);
    } else {
      setAvailableWallets(wallets);
      setIsModalOpen(true);
    }
  };

  const handleConnect = ({
    wallet,
    address,
    name,
    type,
  }: {
    wallet: BrowserWallet | EVMWallet['connector'];
    address: string;
    name: string;
    type: 'cardano' | 'evm';
  }) => {
    setWallet(wallet);
    setAddress(address);
    setIsModalOpen(false);
    localStorage.setItem('walletType', type);
    localStorage.setItem('selectedWallet', name);
  };

  const handleDisconnect = () => {
    if (isEvmConnected) disconnect();
    setWallet(null);
    setAddress('');
    setShowMenu(false);
    localStorage.removeItem('walletType');
    localStorage.removeItem('selectedWallet');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setShowMenu(false);
  };

  const onWalletSelect = wallet => {
    wallet.type === 'cardano' ? connectCardanoWallet(wallet.name) : connectEvmWallet(wallet.connector);
  };

  const ConnectButton = () => (
    <div className="relative">
      <Button color="info" onClick={handleClick} block>
        {address ? truncateFromMiddle(address, 5, 5) : translate('payments-method-crypto-wallet.connect-btn')}
      </Button>
      {connected && showMenu && (
        <div className={styles['menu']}>
          <button onClick={handleDisconnect} className={styles['menu__item']}>
            <Icon name="x-close" fontSize={20} />
            {translate('payments-method-crypto-wallet.disconnect')}
          </button>
          <button onClick={handleCopy} className={styles['menu__item']}>
            <Icon name="copy-02" fontSize={20} />
            {translate('payments-method-crypto-wallet.copy')}
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
