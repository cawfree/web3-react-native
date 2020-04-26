import { RECEIVE_TRANSACTION } from "./actionTypes";

export const receiveTransaction = transaction => ({
  type: RECEIVE_TRANSACTION,
  transaction,
});
