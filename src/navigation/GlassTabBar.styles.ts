import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  shadowWrapper: {
    borderRadius: 40,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 10,
      },
    }),
    overflow: "visible",
  },
  container: {
    flexDirection: "row",
    borderRadius: 40,
    padding: 10,
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor:
      Platform.OS === "android" ? "rgba(242,244,248,0.7)" : "transparent",
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 30,
  },
  activeTab: {
    height: 44,
    backgroundColor: "rgba(255,255,255,0.6)",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  label: {
    marginLeft: 8,
    fontWeight: "600",
    color: "#1CB5AE",
  },
});
