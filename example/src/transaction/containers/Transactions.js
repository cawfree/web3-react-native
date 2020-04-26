import { connect } from "react-redux";

import Transactions from "../components/Transactions";

const mapStateToProps = (state, ownProps) => {
  return {
    transactions: state.transaction.get('transactions'),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
