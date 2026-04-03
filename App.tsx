import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./src/navigation/RootNavigator";
import Login1 from "./src/auth/Login1";
import { AuthProvider, useAuth } from "./src/auth/AuthContext";
import { BookmarkProvider } from "./src/context/BookmarkContext";

import type { AuthSession } from "./src/auth/authStorage";

function AppNavigation() {
  const { bootstrapped, isLoggedIn, loginWithSession } = useAuth();

  if (!bootstrapped) {
    return (
      <View style={styles.boot}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      {isLoggedIn ? (
        <RootNavigator />
      ) : (
        <Login1
          onLoginSuccess={async (session: AuthSession) => {
            await loginWithSession(session);
          }}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AuthProvider>
          <BookmarkProvider>
            <NavigationContainer>
              <AppNavigation />
            </NavigationContainer>
          </BookmarkProvider>
        </AuthProvider>


      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});