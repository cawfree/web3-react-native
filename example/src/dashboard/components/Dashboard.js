import React from "react";
import PropTypes from "prop-types";
import { Dimensions, SafeAreaView, ScrollView, View, StyleSheet, Image } from "react-native";

import { Wallets, AddWalletButton } from "../../wallet";
import { Transactions } from "../../transaction";

const styles = StyleSheet.create({
  flex: { flex: 1 },
  spacing: { height: 50 },
  logoContainer: { width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 50 },
  logo: { width: 212, height: 212 },
  floating: { position: 'absolute', top: 50, right: 15 },
  header: { paddingHorizontal: 15 },
});

const Dashboard = ({ ...extraProps }) => {
  const { width } = Dimensions.get('window');
  return (
    <View
      style={StyleSheet.absoluteFill}
    >
      <Image
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        source={{ uri: 'https://images.pexels.com/photos/5439/earth-space.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
      />
      <View
        style={styles.flex}
      >
        <ScrollView
          style={styles.flex}
        >
          <SafeAreaView
          />
          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <View
            style={styles.logoContainer}
          >
            <Image
              style={styles.logo}
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/220px-Ethereum-icon-purple.svg.png' }}
            />
          </View>
          <Wallets
            width={width}
          />
          <View style={styles.spacing} />
          <Transactions
            width={width}
          />
          <View style={styles.spacing} />
          <View style={styles.spacing} />
        </ScrollView>
      </View>
      <AddWalletButton
        style={styles.floating}
      />
    </View>
  );
};

Dashboard.propTypes = {};
Dashboard.defaultProps = {};

export default Dashboard;
