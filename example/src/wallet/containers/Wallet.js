import { connect } from "react-redux";
import { typeCheck } from "type-check";
import { Linking, Clipboard } from "react-native";
import { withNavigation } from '@react-navigation/compat';

import Wallet from "../components/Wallet";

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

const onRequestMakeTransaction = (e, navigation, wallet) => (dispatch, getState) => Promise
  .resolve()
  .then(
    () => navigation.navigate('makeTransaction', wallet),
  );

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { wallet, navigation } = ownProps;
  return {
    onRequestAddFunds: e => dispatch(onRequestAddFunds(e, wallet)),
    onRequestMakeTransaction: e => dispatch(onRequestMakeTransaction(e, navigation, wallet)),
  };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Wallet));
