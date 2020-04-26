import { connect } from "react-redux";

import AddWalletButton from "../components/AddWalletButton";

import { createWallet } from "../actions";

const onPress = e => (dispatch, getState) => Promise
  .resolve()
  .then(
    () => dispatch(createWallet()),
  );

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPress: e => dispatch(onPress(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWalletButton);
