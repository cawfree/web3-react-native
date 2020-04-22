import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Wallet } from 'web3-react-native';

import { URL, KEYSTORE, PASSWORD } from 'react-native-dotenv';

export default ({ ...unusedProps }) => {
  useEffect(
    async () => {
      const { sendFunds } = await Wallet.load(
        KEYSTORE,
        PASSWORD,
      );
      const result = await sendFunds(
        URL,
        '0x19e03255f667bdfd50a32722df860b1eeaf4d635',
        '1',
        'wei',
      );
      console.log(result);
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
