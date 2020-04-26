import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";

import { reducer as network } from "./network";
import { reducer as routes } from "./routes";
import { reducer as transaction } from "./transaction";
import { reducer as wallet } from "./wallet";

export default () => createStore(
  combineReducers(
    {
      network,
      routes,
      transaction,
      wallet,
    },
  ),
  applyMiddleware(thunkMiddleware),
);
