import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  PanResponder,
} from "react-native";

const { width, height } = Dimensions.get("window");

const WelcomeScreen: React.FC = () => {
  const leftAnim = useRef(new Animated.Value(-width)).current;
  const rightAnim = useRef(new Animated.Value(width)).current;
  const sheetAnim = useRef(new Animated.Value(height)).current; // start below screen
  const logoUp = useRef(new Animated.Value(0)).current;

  const MAX_LOGO_UP = 100;
  const SHEET_REST = height - 140; 
  const SHEET_OPEN = height - 546; 

  useEffect(() => {
    Animated.parallel([
      Animated.timing(leftAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(rightAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(sheetAnim, {
        toValue: SHEET_REST,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, g) => {
        const y = Math.min(
          SHEET_REST,
          Math.max(SHEET_OPEN, SHEET_REST + g.dy)
        );
        sheetAnim.setValue(y);

        const up = Math.min(
          MAX_LOGO_UP,
          Math.max(0, -g.dy / 3)
        );
        logoUp.setValue(-up);
      },
    })
  ).current;

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                styles.logo,
                { transform: [{ translateY: logoUp }] },
                ]}
            >
                <View style={{ flexDirection: "row" }}>
                    <Animated.Text
                        style={[
                        styles.name,
                        { transform: [{ translateX: leftAnim }] },
                        ]}
                    >
                        Wave
                    </Animated.Text>
                    <Animated.Text
                        style={[
                        styles.name,
                        { transform: [{ translateX: rightAnim }] },
                        ]}
                    >
                        {" "}Way
                    </Animated.Text>
                </View>
            </Animated.View>

            <Animated.View
                style={[
                styles.buttonbox,
                {
                    transform: [{ translateY: sheetAnim }],
                },
                ]}
            >
                <View {...pan.panHandlers} style={styles.handleArea}>
                    <View style={styles.rectangle} />
                </View>
                <Text style={styles.signIn}>SIGN IN</Text>
                <Text style={styles.WB}>Welcome Back !</Text>
                <View>
                    
                </View>
            </Animated.View>
        </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#79D7D4",
  },
  logo: {
    marginTop: 285,
    alignItems: "center",
  },
  name: {
    fontFamily: "Irish Grover",
    fontSize: 64,
    fontWeight: "900",
    color: "#fff",
  },
  buttonbox: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 896,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  handleArea: {
    alignItems: "center",
    paddingTop: 12,
  },
  rectangle: {
    width: 100,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#79d7d4",
  },
  signIn: {
    marginTop: 28,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#1CB5B0",
  },
  WB:{
    marginTop: 4,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "400",
    color: "#1cb5b0"
  }
});
