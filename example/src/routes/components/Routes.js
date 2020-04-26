import React from "react";
import PropTypes from "prop-types";
import { createStackNavigator } from '@react-navigation/stack';

import { Dashboard } from "../../dashboard";
import { MakeTransaction } from "../../transaction";

const Stack = createStackNavigator();

const Routes = ({ ...extraProps }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="makeTransaction"
        component={MakeTransaction}
        options={{
          title: 'Transaction',
        }}
      />
    </Stack.Navigator>
  );
};

Routes.propTypes = {};
Routes.defaultProps = {};

export default Routes;
