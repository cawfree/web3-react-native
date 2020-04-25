import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import { Label, Button, Card, CardItem, Text, H2, Body } from "native-base";

const AddWalletCard = ({ onPress, ...extraProps }) => {
  return (
    <Card
    >
      <CardItem
        header
        bordered
      >
        <Text
          children="Add a Wallet"
        />
      </CardItem>
      <CardItem
      >
        <Body
        >
          <Text
            style={{ marginBottom: 15 }}
            children="To perform a transaction, you first need to create a wallet."
          />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              rounded
              onPress={onPress}
              primary
            >
              <Text
                children="Create New"
              />
            </Button>
          </View>
        </Body>
      </CardItem>
    </Card>
  );
};

AddWalletCard.propTypes = {
  onPress: PropTypes.func,
};

AddWalletCard.defaultProps = {
  onPress: Promise.resolve,
};

export default AddWalletCard;
