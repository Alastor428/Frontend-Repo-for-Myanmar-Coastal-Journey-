import React, { useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./src/navigation/RootNavigator";
import Login1 from "./src/auth/Login1";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          {isLoggedIn ? (
            <RootNavigator />
          ) : (
            <Login1 onLoginSuccess={() => setIsLoggedIn(true)} />
          )}
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
