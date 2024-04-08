import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Route from "./src/navigation/Route";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Color, Responsive, Storage } from "./src/utils";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    const userData = await Storage.getUserData();
    if (userData) {
      global.user = userData;
      // console.log(userData, "userData");
      setIsLogIn(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      {isLoading ? (
        <View style={styles.container}>
          <Text style={styles.titleText}>{"SelfFinance"}</Text>
          <ActivityIndicator size={"large"} color={Color.themeBlue} />
        </View>
      ) : (
        <Route isLogIn={isLogIn} />
      )}
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: Responsive.font(7),
    color: Color.themeOrange,
    fontWeight: "bold",
    marginBottom: Responsive.verticalScale(50),
    textDecorationLine: "underline",
  },
});
