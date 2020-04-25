import React from "react";
import { View, Image, StyleSheet, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { Provider } from "react-redux";

import configureStore from "./src/configureStore";
import { WalletCarousel } from "./src/wallet";

const store = configureStore();

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  flex: { flex: 1 },
  heading: { height: 100 },
  logoContainer: { width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 50 },
  logo: { width: 310, height: 212 },
});

export default ({ ...extraProps }) => {
  return (
    <Provider
      store={store}
    >
      <Image
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        source={{ uri: 'https://images.pexels.com/photos/5439/earth-space.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
      />
      <ScrollView
        style={[StyleSheet.absoluteFill]}
      >
        <SafeAreaView
        />
        <View
          style={styles.heading}
        />
        <View
          style={styles.logoContainer}
        >
          <Image
            style={styles.logo}
            source={{ uri: 'https://cdn.freebiesupply.com/logos/large/2x/ethereum-logo-png-transparent.png' }}
          />
        </View>
        <View
          style={styles.carousel}
        >
          <WalletCarousel
            width={width}
          />
        </View>
      </ScrollView>
    </Provider>
  );
};
