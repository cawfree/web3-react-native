import { connect } from "react-redux";
import { typeCheck } from "type-check";
import { Linking, Clipboard } from "react-native";

import WalletCard from "../components/WalletCard";

const onRequestAddFunds = (e, wallet) => (dispatch, getState) => Promise
  .resolve()
  .then(
    () => {
      const { address } = wallet;
      if (typeCheck("String", address)) {
        Clipboard.setString(address);
        return Linking.openURL('https://faucet.ropsten.be/');
      }
      return Promise.reject(new Error(`Expected String address, encountered ${address}.`));
    },
  );

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { wallet } = ownProps;
  return {
    onRequestAddFunds: e => dispatch(onRequestAddFunds(e, wallet)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletCard);
