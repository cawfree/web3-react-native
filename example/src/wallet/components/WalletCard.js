import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import { Button, Card, CardItem, Text, H2, H3, Body } from "native-base";

const WalletCard = ({ wallet, onRequestAddFunds, ...extraProps }) => {
  return (
    <Card
    >
      <CardItem
      >
        <H3
          children={wallet.address}
        />
      </CardItem>
      <CardItem
      >
        <Body
          style={{
            flexDirection: 'row',
          }}
        >
          <Button
            onPress={onRequestAddFunds}
            success
          >
            <Text
              children="Add funds"
            />
          </Button>
        </Body>
      </CardItem>
    </Card>
  );
};

WalletCard.propTypes = {
  wallet: PropTypes.shape({}).isRequired,
  onRequestAddFunds: PropTypes.func.isRequired,
};

WalletCard.defaultProps = {};

export default WalletCard;
