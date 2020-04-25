import { connect } from "react-redux";

import AddWalletCard from "../components/AddWalletCard";

import { createWallet } from "../actions";

const onPress = e => (dispatch, getState) => Promise
  .resolve()
  // XXX: Generate a new wallet, and don't care about the password.
  .then(() => dispatch(createWallet()));

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPress: e => dispatch(onPress(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWalletCard);
