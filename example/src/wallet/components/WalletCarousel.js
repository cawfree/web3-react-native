import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { Spinner, Button, Item, Picker, Header, Container, H1, H2, H3, Text, Form, Label, Input } from 'native-base';
import Carousel from 'react-native-snap-carousel';

import WalletCard from "../containers/WalletCard";
import AddWalletCard from "../containers/AddWalletCard";

const styles = StyleSheet.create(
  {},
);

const WalletCarousel = ({ wallets, width, padding, onMakePayment, onWalletChanged, ...extraProps }) => {
  const [loading, setLoading] = useState(false);
  const [toAddress, setToAddress] = useState("0x19e03255f667bdfd50a32722df860b1eeaf4d635");
  const [units, setUnits] = useState("wei");
  const [amount, setAmount] = useState("1");
  const [currentWallet] = wallets.toJS() || [null];
  const disabled = !currentWallet;
  return (
    <View
    >
      <View
        style={{
          padding,
        }}
      >
        <H1
          children="My Wallets"
        />
      </View>
      <Carousel
        data={[
          (!!disabled) && AddWalletCard,
          ...wallets
            .map(wallet => ({ ...extraProps }) => <WalletCard wallet={wallet}/>),
        ].filter(e => !!e)}
        sliderWidth={width}
        itemWidth={width - (2 * padding)}
        renderItem={({ item: Item, index }) => (
          <View
          >
            <Item
              key={index}
            />
          </View>
        )}
      />
      <View
        style={{
          padding,
        }}
      >
        <H1
          children="My Transactions"
        />
        <Input
          onChangeText={setToAddress}
          value={toAddress}
        />
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Input
            disabled={disabled}
            onChangeText={setAmount}
            keyboardType="numeric"
            value={amount}
          />
          <Item
            picker
          >
            <Picker
              mode="dropdown"
              placeholder="Units"
              selectedValue={units}
              onValueChange={setUnits}
              disabled={disabled}
            >
              <Picker.Item label="Wei" value="wei" />
              <Picker.Item label="Kwei" value="kwei" />
              <Picker.Item label="Mwei" value="mwei" />
              <Picker.Item label="Gwei" value="gwei" />
              <Picker.Item label="Finney" value="finney" />
              <Picker.Item label="Ether" value="eth" />
            </Picker>
          </Item>
        </View>
      </View>
      <View
        style={{
          padding,
        }}
      >
        <Button
          onPress={e => Promise
            .resolve()
            .then(() => setLoading(true))
            .then(() => onMakePayment(e, currentWallet, toAddress, amount, units))
            .then(() => setLoading(false))
            .catch(
              e => {
                console.warn(e);
                setLoading(false);
              },
            )}
          disabled={disabled || loading}
          round
        >
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 20,
              }}
            >
              {(!!loading) && (
                <Spinner
                  size={10}
                />
              )}
              <Text
                children="Make Payment"
              />
            </View>
          </View>
        </Button>
      </View>
    </View>
  );
};

WalletCarousel.propTypes = {
  onWalletChanged: PropTypes.func.isRequired,
  onMakePayment: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  padding: PropTypes.number,
};
WalletCarousel.defaultProps = {
  padding: 15,
};

export default WalletCarousel;
