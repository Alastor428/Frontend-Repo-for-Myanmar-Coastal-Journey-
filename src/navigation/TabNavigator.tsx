import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/MainScreens/HomeScreen";
import RecentScreen from "../screens/MainScreens/RecentScreen";
import HighlightScreen from "../screens/MainScreens/HighlightScreen";
import SettingScreen from "../screens/MainScreens/SettingScreen";
import GlassTabBar from "./GlassTabBar";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <GlassTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Recent" component={RecentScreen} />
      <Tab.Screen name="Highlight" component={HighlightScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
}
