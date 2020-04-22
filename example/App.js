import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Wallet } from 'web3-react-native';

import { URL, KEYSTORE, PASSWORD } from 'react-native-dotenv';

export default ({ ...unusedProps }) => {
  useEffect(
    async () => {
      const { ...result } = await Wallet.load(
        KEYSTORE,
        PASSWORD,
      );
      console.log('got result');
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
