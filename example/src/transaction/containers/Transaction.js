import { connect } from "react-redux";
import { typeCheck } from "type-check";
import { Linking } from "react-native";

import Transaction from "../components/Transaction";

const onRequestViewTransaction = (e, transaction) => (dispatch, getState) => Promise
  .resolve()
  .then(
    () => {
      if (typeCheck("{transactionHash:String,...}", transaction)) {
        const { transactionHash } = transaction;
        return Linking.openURL(`https://ropsten.etherscan.io/tx/${transactionHash}`);
      }
      return Promise.reject(new Error(`Expected transaction object, encountered ${transaction}.`));
    },
  );

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => {
  const { transaction } = ownProps;
  return {
    onRequestViewTransaction: e => dispatch(onRequestViewTransaction(e, transaction)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
