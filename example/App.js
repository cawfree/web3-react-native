import 'react-native-gesture-handler';

import React from "react";
import { View, Image, StyleSheet, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';

import configureStore from "./src/configureStore";
import { Routes } from "./src/routes";

const store = configureStore();

const { width } = Dimensions.get('window');

export default ({ ...extraProps }) => {
  return (
    <Provider
      store={store}
    >
      <NavigationContainer
      >
        <Routes
        />
      </NavigationContainer>
    </Provider>
  );
};
