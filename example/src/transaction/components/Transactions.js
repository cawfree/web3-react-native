import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { H1, Text } from 'native-base';
import Carousel from 'react-native-snap-carousel';

import Transaction from "../containers/Transaction";

const styles = StyleSheet.create({
  text: { marginLeft: 15, color: 'white', marginBottom: 15 },
});

const Transactions = ({ transactions, width, ...extraProps }) => {
  const numTransactions = transactions.toJS().length;
  const hasTransactions = numTransactions > 0;
  return (
    <View
    >
      <H1
        style={styles.text}
        children={`Transactions (${numTransactions})`}
      />
      {(!hasTransactions) && (
        <Text
          style={styles.text}
          children="Your transactions will be listed here."
        />
      )}
      {(!!hasTransactions) && (
        <Carousel
          data={transactions.toJS()}
          renderItem={({ item: transaction, index}) => (
            <Transaction
              key={index}
              transaction={transaction}
            />
          )}
          sliderWidth={width}
          itemWidth={width * 0.8}
        />
      )}
    </View>
  );
};

Transactions.propTypes = {
  width: PropTypes.number.isRequired,
  transactions: PropTypes.shape({}).isRequired,
};

Transactions.defaultProps = {};

export default Transactions;

