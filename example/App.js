import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Web3 from 'web3-react-native';

import { URL, KEYSTORE, PASSWORD } from 'react-native-dotenv';

export default ({ ...unusedProps }) => {
  useEffect(
    async () => {
      const { ...result } = await Web3(
        KEYSTORE,
        PASSWORD,
      );
      Alert.alert('ici');
      //console.log('got result');

      // TODO: Get this working, permit dynamic credentials specification, then allow multiple instances
      /* await configuration of the local environment */
      //const { sendFunds, destroy } = await Web3(
      //  url,
      //  keystore,
      //  password,
      //);
      ///* send funds to a designated address */
      //await sendFunds("0x19e03255f667bdfd50a32722df860b1eeaf4d635", "1", "WEI");
      ///* teardown created environment */
      //await destroy();
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
