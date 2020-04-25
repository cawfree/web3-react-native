import { connect } from "react-redux";
import { typeCheck } from "type-check";
import { Linking } from "react-native";

import WalletCarousel from "../components/WalletCarousel";

const onMakePayment = (e, wallet, toAddress, amount, units) => (dispatch, getState) => Promise
  .resolve()
  .then(
    () => {
      const { sendFunds } = wallet;
      if (typeCheck("Function", sendFunds)) {
        return sendFunds(
          toAddress,
          amount,
          units,
        );
      }
      return Promise.reject(new Error(`Expected Function sendFunds, encountered ${sendFunds}.`));
    },
  );

const mapStateToProps = (state, ownProps) => {
  const { wallet } = state;
  const wallets = wallet.get('wallets');
  return {
    wallets,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMakePayment: (e, wallet, toAddress, amount, units) => dispatch(
    onMakePayment(e, wallet, toAddress, amount, units),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletCarousel);
