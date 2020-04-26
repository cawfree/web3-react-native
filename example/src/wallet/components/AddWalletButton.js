import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const AddWalletButton = ({ style, onPress, ...extraProps }) => (
  <View
    style={style}
  >
    <TouchableOpacity
      onPress={onPress}
    >
      <MaterialIcon
        name="add"
        color="white"
        size={50}
      />
    </TouchableOpacity>
  </View>
);

AddWalletButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

AddWalletButton.defaultProps = {};

export default AddWalletButton;
