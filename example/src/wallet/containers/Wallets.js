import { connect } from "react-redux";

import Wallets from "../components/Wallets";

const mapStateToProps = (state, ownProps) => {
  const { wallet } = state;
  const wallets = wallet.get('wallets');
  return {
    wallets,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
