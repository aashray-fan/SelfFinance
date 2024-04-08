// Library Imports
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Relative Imports
import {
  AddTransactionScreen,
  InfoScreen,
  TransactionDetailScreen,
  TransactionListScreen,
  IntroScreen,
  SignUpScreen,
  LogInScreen,
} from "../screens";
import { Screen } from "../utils";
import { AppTabBar } from "../components";

interface RouteProps {
  isLogIn: boolean;
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TransactionStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={Screen.TransactionListScreen}
        component={TransactionListScreen}
      />
      <Stack.Screen
        name={Screen.AddTransactionScreen}
        component={AddTransactionScreen}
      />
      <Stack.Screen
        name={Screen.TransactionDetailScreen}
        component={TransactionDetailScreen}
      />
    </Stack.Navigator>
  );
};

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <AppTabBar {...props} />}
    >
      <Tab.Screen name={Screen.TransactionStack} component={TransactionStack} />
      <Tab.Screen name={Screen.InfoScreen} component={InfoScreen} />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screen.IntroScreen} component={IntroScreen} />
      <Stack.Screen name={Screen.SignUpScreen} component={SignUpScreen} />
      <Stack.Screen name={Screen.LogInScreen} component={LogInScreen} />
    </Stack.Navigator>
  );
};

const Route: React.FC<RouteProps> = (props) => {
  const { isLogIn } = props;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isLogIn ? Screen.MainTab : Screen.AuthStack}
      >
        <Stack.Screen name={Screen.AuthStack} component={AuthStack} />
        <Stack.Screen name={Screen.MainTab} component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
