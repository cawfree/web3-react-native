import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { Button, Container, Header, Content, Form, Item, Input, Text, Label, Spinner, Picker } from 'native-base';

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    margin: 15,
  },
  error: {
    color: 'red',
  },
});

const MakeTransaction = ({ onPressSubmit, ...extraProps }) => {
  const [toAddress, setToAddress] = useState("0x19e03255f667bdfd50a32722df860b1eeaf4d635");
  const [amount, setAmount] = useState("1");
  const [units, setUnits] = useState("wei");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  return (
    <Container>
      <Content>
        <Form>
          <Item>
            <Label
              children="Address:"
            />
            <Input
              onChangeText={setToAddress}
              value={toAddress}
            />
          </Item>
          <Item
          >
            <Label
              children="Amount:"
            />
            <Input
              onChangeText={setAmount}
              value={amount}
            />
          </Item>
          <Item
            last
          >
            <Label
              children="Units:"
            />
            <Picker
              onValueChange={setUnits}
              selectedValue={units}
            >
              <Picker.Item label="Wei" value="wei" />
              <Picker.Item label="Kwei" value="kwei" />
              <Picker.Item label="Mwei" value="mwei" />
              <Picker.Item label="Gwei" value="gwei" />
              <Picker.Item label="Finney" value="finney" />
              <Picker.Item label="Ether" value="eth" />
            </Picker>
          </Item>
        </Form>
        <View
          style={styles.errorContainer}
        >
          {(!!error) && (
            <Text
              style={styles.error}
              children={error.message}
            />
          )} 
        </View>
        <View
          style={styles.buttonContainer}
        >
          <Button
            disabled={loading}
            style={styles.button}
            onPress={e => Promise
              .resolve()
              .then(() => [
                setLoading(true),
              ])
              .then(() => onPressSubmit(e, toAddress, amount, units))
              .then(() => setLoading(false))
              .catch(
                (e) => {
                  setError(e);
                  setLoading(false);
                },
              )}
            primary
            rounded
          >
            {(!!loading) && (
              <Spinner
                size={20}
              />
            )}
            <Text
              children="Send"
            />
          </Button>
        </View>
      </Content>
    </Container>
  );
};

MakeTransaction.propTypes = {
  onPressSubmit: PropTypes.func.isRequired,
};
MakeTransaction.defaultProps = {};

export default MakeTransaction;
