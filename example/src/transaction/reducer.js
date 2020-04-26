import initialState from "./model";
import { RECEIVE_TRANSACTION } from "./actionTypes";

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_TRANSACTION:
      const { transaction } = extras;
      return state
        .set(
          'transactions',
          state
            .get('transactions')
            .push(transaction),
        );
    default:
      return state;
  }
};
