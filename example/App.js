import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Web3 from 'web3-react-native';

const { create, sendFunds, destroy } = Web3;

export default ({ ...unusedProps }) => {
  useEffect(
    async () => {
      // TODO: Get this working, permit dynamic credentials specification, then allow multiple instances
      /* await configuration of the local environment */
      await create("https://rinkeby.infura.io/<your-token>", "<your-password>");
      /* send funds to a designated address */
      await sendFunds("0x19e03255f667bdfd50a32722df860b1eeaf4d635", "1", "WEI");
      /* teardown created environment */
      await destroy();
    },
    [],
  );
  return (
    <View
      style={StyleSheet.absoluteFill}
    >
      <Text
        children="web3-react-native"
      />
    </View>
  );
};
