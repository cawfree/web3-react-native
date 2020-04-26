import initialState from "./model";

import { RECEIVE_WALLET } from "./actionTypes";

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_WALLET:
      const { wallet } = extras;
      return state
        .set(
          'wallets',
          state
            .get('wallets')
            .push(wallet),
        );
    default:
      return state;
  }
};
