import { connect } from "react-redux";
import { withNavigation } from "@react-navigation/compat";

import MakeTransaction from "../components/MakeTransaction";

import { receiveTransaction } from "../actions";

const onPressSubmit = (e, navigation, wallet, toAddress, amount, units) => (dispatch, getState) => Promise
  .resolve()
  .then(
    () => {
      console.warn('sending...');
      const { sendFunds } = wallet;
      return sendFunds(
        toAddress,
        amount,
        units,
      );
    },
  )
  .then(e => dispatch(receiveTransaction(e)))
  .then(() => navigation.goBack());

const mapStateToProps = (state, ownProps) => {
  const { route: { params } } = ownProps;
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { navigation } = ownProps;
  const { route: { params: wallet } } = ownProps;
  return {
    onPressSubmit: (e, toAddress, amount, units) => dispatch(
      onPressSubmit(e, navigation, wallet, toAddress, amount, units),
    ),
  };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(MakeTransaction));
