import * as config from './dapp.config';
import * as connect from './dapp.connect';
import * as types from './dapp.types';

export default {
  ...types,
  ...connect,
  ...config,
};
