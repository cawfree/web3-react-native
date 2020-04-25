import React, { useEffect, useState } from 'react';
import { Linking, TextInput, Animated, StyleSheet, Image, View, SafeAreaView, ScrollView } from 'react-native';
import { Button, Container, Header, Content, Card, CardItem, Text, Body, Form, Item, Input, Label } from "native-base";
import { Web3 } from 'web3-react-native';

import { URL, KEYSTORE, PASSWORD } from 'react-native-dotenv';

const styles = StyleSheet.create(
  {
    logoContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
    },
    logo: {
      width: 310,
      height: 212,
    },
    offset: {
      height: 180,
    },
    button: {
      width: '100%',
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  },
);

export default ({ ...unusedProps }) => {
  const [animLogo] = useState(() => new Animated.Value(0));
  const [animSuccess] = useState(() => new Animated.Value(0));
  const [wallet, setWallet] = useState(null);
  const [toAddress, setToAddress] = useState('0x19e03255f667bdfd50a32722df860b1eeaf4d635');
  const [transactionHash, setTransactionHash] = useState(null);
  const [disabled, setDisabled] = useState(false);
  useEffect(
    () => Web3(URL)
      .then(({ Wallet }) => Wallet.load(
        KEYSTORE,
        PASSWORD,
      ))
      .then(setWallet) && undefined,
    [],
  );
  useEffect(
    () => {
      if (!!transactionHash) {
        Animated.timing(animSuccess, { toValue: 1, useNativeDriver: true, duration: 1000 }).start();
      }
      return undefined;
    },
    [transactionHash, animSuccess],
  );
  return (
    <View
      style={StyleSheet.absoluteFill}
    >
      <Image
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        source={{ uri: 'https://images.pexels.com/photos/5439/earth-space.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
      />
      <SafeAreaView
      />
      <View
        style={styles.offset}
      />
      <View
        style={styles.logoContainer}
      >
        <Animated.Image
          style={[
            styles.logo,
            {
              opacity: animLogo,
            },
          ]}
          onLoadEnd={() => Animated.timing(animLogo, { useNativeDriver: true, duration: 1000, toValue: 1 }).start()}
          source={{ uri: 'https://cdn.freebiesupply.com/logos/large/2x/ethereum-logo-png-transparent.png' }}
        />
      </View>
      <ScrollView
        style={{
          overflow: 'visible',
        }}
      >
        {(!wallet) && (
          <Content padder>
            <CardItem header bordered>
              <Text>Unable to load wallet.</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  {`You need to specify a keystore, password and Ethreum network URL in the example's .env.`}
                </Text>
              </Body>
            </CardItem>
          </Content>
        )}
        {(!!wallet) && (
          <Content padder>
            <CardItem header bordered>
              <Text>Wallet loaded successfully!</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Item>
                  <Label
                    children="Send ethereum to:"
                  />
                  <Input
                    value={toAddress}
                    onChangeText={setToAddress}
                  />
                </Item>
                <View
                  style={styles.button}
                >
                  <Button
                    rounded
                    disabled={disabled}
                    onPress={() => {
                      const { sendFunds } = wallet;
                      setDisabled(true);
                      sendFunds(
                        toAddress,
                        '1',
                        'wei',
                      )
                        .then(
                          ({ transactionHash }) => setTransactionHash(transactionHash),
                        )
                        .catch(console.warn);
                    }}
                  >
                    <Text>Send 1 Wei</Text>
                  </Button>
                </View>
              </Body>
            </CardItem>
          </Content>
        )}
        <Animated.View
          pointerEvents={transactionHash ? 'auto' : 'none'}
          style={{
            opacity: animSuccess,
          }}
        >
          <Content padder>
            <CardItem header bordered>
              <Text>Transaction successful!</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text
                  children={`${transactionHash}`}
                />
                <View
                  style={styles.button}
                >
                  <Button
                    rounded
                    success
                    onPress={() => Linking.openURL(`https://ropsten.etherscan.io/tx/${transactionHash}`)}
                  >
                    <Text
                      children="View Result"
                    />
                  </Button>
                </View>
              </Body>
            </CardItem>
          </Content>
        </Animated.View>
      </ScrollView>
    </View>
  );
};
