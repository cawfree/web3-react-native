import { Web3 } from 'web3-react-native';

import { nanoid } from 'nanoid/non-secure';

import { RECEIVE_WALLET } from "./actionTypes";

const receiveWallet = wallet => ({
  type: RECEIVE_WALLET,
  wallet,
});

export const createWallet = (password = nanoid()) => (dispatch, getState) => Promise
  .resolve()
  .then(
    () => {
      const { network } = getState();
      const url = network.get('url');
      return Web3(url);
    },
  )
  .then(
    ({ Keystore, Wallet }) => Keystore.create(
      password,
    )
      .then(
        keystore => Wallet.load(
          keystore,
          password,
        ),
      ),
  )
  .then(
    wallet => dispatch(
      receiveWallet(wallet),
    ),
  );
