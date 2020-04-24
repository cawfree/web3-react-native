import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Web3 } from 'web3-react-native';

import { URL, KEYSTORE, PASSWORD } from 'react-native-dotenv';

export default ({ ...unusedProps }) => {
  useEffect(
    async () => {
      const { Wallet } = await Web3(URL);
      const { address, sendFunds } = await Wallet.load(
        KEYSTORE,
        PASSWORD,
      );
      console.warn(address);
      //const result = await sendFunds(
      //  '0x19e03255f667bdfd50a32722df860b1eeaf4d635',
      //  '1',
      //  'wei',
      //);
      //console.warn(result);
    },
    [],
  );
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: 'green',
        },
      ]}
    >
      <Text
        children="web3-react-native"
      />
    </View>
  );
};
