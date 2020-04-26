import { connect } from "react-redux";
import { withNavigation } from "@react-navigation/compat";

import MakeTransaction from "../components/MakeTransaction";

const onPressSubmit = (e, navigation, wallet, toAddress, amount, units) => (dispatch, getState) => Promise
  .resolve()
  .then(
    () => {
      const { sendFunds } = wallet;
      return sendFunds(
        toAddress,
        amount,
        units,
      );
    },
  );

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
