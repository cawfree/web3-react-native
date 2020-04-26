import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { H1, Text } from 'native-base';
import Carousel from 'react-native-snap-carousel';

import Wallet from "../containers/Wallet";

const styles = StyleSheet.create({
  text: { marginLeft: 15, color: 'white', marginBottom: 15 },
});

const Wallets = ({ wallets, width, ...extraProps }) => {
  const numWallets = wallets.toJS().length;
  const hasWallets = numWallets > 0;
  return (
    <View
    >
      <H1
        style={styles.text}
        children={`Wallets (${numWallets})`}
      />
      {(!hasWallets) && (
        <Text
          style={styles.text}
          children="Add a wallet to get started."
        />
      )}
      {(!!hasWallets) && (
        <Carousel
          data={wallets.toJS()}
          renderItem={({ item: wallet, index}) => (
            <Wallet
              key={index}
              wallet={wallet}
            />
          )}
          sliderWidth={width}
          itemWidth={width * 0.8}
        />
      )}
    </View>
  );
};

Wallets.propTypes = {
  width: PropTypes.number.isRequired,
  wallets: PropTypes.shape({}).isRequired,
};

Wallets.defaultProps = {};

export default Wallets;
