import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Route from "./src/navigation/Route";

const App = () => {
  return (
    <SafeAreaProvider>
      <Route />
    </SafeAreaProvider>
  );
};

export default App;
