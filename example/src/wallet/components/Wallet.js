import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import { Icon, Button, Card, CardItem, Text, H2, H3, Body } from "native-base";

const styles = StyleSheet.create({
  details: { flex: 1 },
  buttons: { flexDirection: 'row' },
  buttonContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

const Wallet = ({ wallet, onRequestAddFunds, onRequestMakeTransaction, ...extraProps }) => {
  return (
    <Card
    >
      <CardItem
        header
        bordered
      >
        <Text
          children="Some Wallet Name"
        />
      </CardItem>

      <CardItem
        bordered
      >
        <Icon active name="wallet" />
        <Text
          style={styles.details}
          children={wallet.address}
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
              onPress={onRequestAddFunds}
              success
            >
              <Icon name="water" />
              <Text
                children="Faucet"
              />
            </Button>
          </View>
          <View
            style={styles.buttonContainer}
          >
            <Button
              onPress={onRequestMakeTransaction}
              primary
            >
              <Icon name="cash" />
              <Text
                children="Send"
              />
            </Button>
          </View>
        </Body>
      </CardItem>
    </Card>
  );
};

Wallet.propTypes = {
  wallet: PropTypes.shape({}).isRequired,
  onRequestAddFunds: PropTypes.func.isRequired,
  onRequestMakeTransaction: PropTypes.func.isRequired,
};

Wallet.defaultProps = {};

export default Wallet;
