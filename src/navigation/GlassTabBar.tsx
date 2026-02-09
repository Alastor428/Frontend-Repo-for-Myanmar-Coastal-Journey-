import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { styles } from "./GlassTabBar.styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

function getIconName(routeName: string, isFocused: boolean) {
  switch (routeName) {
    case "Home":
      return "home";
    case "recent-activities":
      return "history";
    case "Bookmark":
      return "bookmark";
    case "Profile":
      return "account";
    default:
      return "circle";
  }
}

export default function GlassTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.shadowWrapper}>
        <BlurView intensity={100} tint="light" style={styles.container}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const iconName = getIconName(route.name, isFocused);

            return (
              <TouchableOpacity
                key={route.key}
                onPress={() => navigation.navigate(route.name)}
                style={[styles.tab, isFocused && styles.activeTab]}
              >
                <MaterialCommunityIcons
                  name={iconName}
                  size={24}
                  color={isFocused ? "#1CB5AE" : "#8e8e8e"}
                />
                {isFocused && <Text style={styles.label}>{route.name}</Text>}
              </TouchableOpacity>
            );
          })}
        </BlurView>
      </View>
    </View>
  );
}
