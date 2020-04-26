import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import { Icon, Button, Card, CardItem, Text, H2, H3, Body } from "native-base";

const styles = StyleSheet.create({
  details: { flex: 1 },
  buttons: { flexDirection: 'row' },
  buttonContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

const Transaction = ({ transaction, onRequestViewTransaction, ...extraProps }) => {
  return (
    <Card
    >
      <CardItem
        header
        bordered
      >
        <Text
          children="Some Transaction Name"
        />
      </CardItem>

      <CardItem
        bordered
      >
        <Icon active name="pricetag" />
        <Text
          style={styles.details}
          children={transaction.transactionHash}
        />
      </CardItem>
      <CardItem
      >
        <Body
          style={styles.buttons}
        >
          <View
            style={styles.buttonContainer}
          >
            <Button
              onPress={onRequestViewTransaction}
              success
            >
              <Icon name="eye" />
              <Text
                children="View Transaction"
              />
            </Button>
          </View>
        </Body>
      </CardItem>
    </Card>
  );
};

Transaction.propTypes = {
  onRequestViewTransaction: PropTypes.func.isRequired,
  transaction: PropTypes.shape({}).isRequired,
};

Transaction.defaultProps = {};

export default Transaction;
