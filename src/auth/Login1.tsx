import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import EmailComponent from "../components/AuthComponent/Email";
import PasswordComponent from "../components/AuthComponent/Password";
import SignInButton from "../components/AuthComponent/SignInButton";
import RememberMeCheckbox from "../components/AuthComponent/Rememberme";
import SetEmailComponent from "../components/AuthComponent/SetEmail";
import SetUserNameComponent from "../components/AuthComponent/SetUserName";
import SetNRCComponent from "../components/AuthComponent/NRC";
import SignUpButton from "../components/AuthComponent/SignUpButton";
import ConfirmPasswordComponent from "../components/AuthComponent/ConfirmPassword";
import AcceptComponent from "../components/AuthComponent/AcceptComponent";
import DateOfBirth from "../components/AuthComponent/DateOfBirth";

const { width, height } = Dimensions.get("window");

const DUMMY_USER = {
  email: "admin@gmail.com",
  password: "123456",
};

const WelcomeScreen: React.FC = () => {
  const leftAnim = useRef(new Animated.Value(-width)).current;
  const rightAnim = useRef(new Animated.Value(width)).current;
  const sheetAnim = useRef(new Animated.Value(height)).current;

  const scrollRef = useRef<ScrollView>(null);

  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  // ---------- SIGN IN ----------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  // ---------- SIGN UP ----------
  const [signupUserName, setSignupUserName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [dob, setDob] = useState<Date>();

  // ---------- NRC ----------
  const [nrcState, setNrcState] = useState("");
  const [nrcTownship, setNrcTownship] = useState("");
  const [nrcType, setNrcType] = useState("");
  const [nrcNumber, setNrcNumber] = useState("");

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
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // ---------- LOGIN ----------
  const handleLogin = () => {
    Keyboard.dismiss();
    if (!email || !password) {
      setError("Fill the data first");
      return;
    }

    if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
      setError("");
      alert("Login successful!");
    } else {
      setError("Invalid email or password");
      setEmail("");
      setPassword("");
    }
  };

const handleSignUp = () => {
  Keyboard.dismiss();

  // 1. Check if all fields are filled
  if (
    !signupUserName ||
    !signupEmail ||
    !signupPassword ||
    !signupConfirmPassword ||
    !nrcState ||
    !nrcTownship ||
    !nrcType ||
    !nrcNumber
  ) {
    setSignupError("Fill all fields first");
    return;
  }

  // 2. Check password match
  if (signupPassword !== signupConfirmPassword) {
    setSignupError("Passwords do not match");
    return;
  }

  // 3. Check if terms are accepted
  if (!acceptTerms) {
    setSignupError("You must accept terms and conditions");
    return;
  }

  // 4. Combine NRC
  const NRC = `${nrcState}/${nrcTownship}(${nrcType})${nrcNumber}`;
  
  // 5. Check if DOB is selected
  if (!dob) {
    setSignupError("Fill all fields first");
    return;
  }

  // 6. Log all sign up values
  console.log("SIGN UP DATA:");
  console.log("UserName:", signupUserName);
  console.log("Email:", signupEmail);
  console.log("Password:", signupPassword);
  console.log("Confirm Password:", signupConfirmPassword);
  console.log("NRC:", NRC);
  console.log("Accept Terms:", acceptTerms);
  console.log("DOB:", dob.toDateString());

  // 7. Success: reset fields and switch to Sign In
  alert("Account created successfully!");
  setSignupUserName("");
  setSignupEmail("");
  setSignupPassword("");
  setSignupConfirmPassword("");
  setNrcState("");
  setNrcTownship("");
  setNrcType("");
  setNrcNumber("");
  setAcceptTerms(false);
  setSignupError("");
  setActiveTab("signin");
};



  return (
    <View style={styles.container}>
      {/* LOGO */}
      <Animated.View style={styles.logo}>
        <View style={{ flexDirection: "row" }}>
          <Animated.Text
            style={[styles.name, { transform: [{ translateX: leftAnim }] }]}
          >
            Wave
          </Animated.Text>
          <Animated.Text
            style={[styles.name, { transform: [{ translateX: rightAnim }] }]}
          >
            {" "}Way
          </Animated.Text>
        </View>
      </Animated.View>

      {/* BOTTOM SHEET */}
      <Animated.View
        style={[
          styles.buttonbox,
          { transform: [{ translateY: sheetAnim }] },
        ]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
          <ScrollView
            ref={scrollRef}
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1, alignItems: "center", paddingBottom: 120 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.handleArea}>
              <View style={styles.rectangle} />
            </View>

            {activeTab === "signin" ? (
              <>
                <Text style={styles.signIn}>SIGN IN</Text>
                <Text style={styles.WB}>Welcome Back !</Text>

                <View style={{ marginTop: 24 }}>
                  <EmailComponent value={email} onChange={setEmail} />
                </View>

                <View style={{ marginTop: 20 }}>
                  <PasswordComponent value={password} onChange={setPassword} />
                </View>

                <View style={{ marginTop: 12, width: 328 }}>
                  <RememberMeCheckbox
                    value={rememberMe}
                    onToggle={() => setRememberMe(prev => !prev)}
                  />
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <View style={{ marginTop: 8 }}>
                  <SignInButton onPress={handleLogin} disabled={false} />
                </View>

                <View style={{ flexDirection: "row", marginTop: 16 }}>
                  <Text style={{ fontSize: 14, color: "#666" }}>
                    Don't have an account?{" "}
                  </Text>
                  <TouchableOpacity onPress={() => setActiveTab("signup")}>
                    <Text style={styles.link}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.signIn}>SIGN UP</Text>
                <Text style={styles.WB}>Create your account</Text>

                <View style={{ marginTop: 24 }}>
                  <SetUserNameComponent
                    value={signupUserName}
                    onChange={setSignupUserName}
                  />
                </View>

                <View style={{ marginTop: 20 }}>
                  <SetEmailComponent
                    value={signupEmail}
                    onChange={setSignupEmail}
                  />
                </View>

                <View style={{ marginTop: 24 }}>
                  <SetNRCComponent
                    stateValue={nrcState}
                    onStateChange={setNrcState}
                    townshipValue={nrcTownship}
                    onTownshipChange={setNrcTownship}
                    typeValue={nrcType}
                    onTypeChange={setNrcType}
                    numberValue={nrcNumber}
                    onNumberChange={setNrcNumber}
                  />
                </View>

                <View style={{ marginTop: 24 }}>
                  <DateOfBirth label="Date of Birth" value={dob} onConfirm={setDob} />
                </View>

                <View style={{ marginTop: -12 }}>
                  <PasswordComponent
                    value={signupPassword}
                    onChange={setSignupPassword}
                  />
                </View>

                <View style={{ marginTop: 24 }}>
                  <ConfirmPasswordComponent
                    value={signupConfirmPassword}
                    onChange={setSignupConfirmPassword}
                  />
                </View>

                <View style={{ marginTop: 12,  width: 328 }}>
                  <AcceptComponent
                    value={acceptTerms}
                    onToggle={() => setAcceptTerms(prev => !prev)}
                  />
                </View>

                {signupError ? (
                  <Text style={styles.errorText}>{signupError}</Text>
                ) : null}

                <View style={{ marginTop: 0 }}>
                  <SignUpButton onPress={handleSignUp} disabled={false} />
                </View>

                <View style={{ flexDirection: "row", marginTop: 16 }}>
                  <Text style={{ fontSize: 14, color: "#666" }}>
                    Already have an account?{" "}
                  </Text>
                  <TouchableOpacity onPress={() => setActiveTab("signin")}>
                    <Text style={styles.link}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
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
    marginTop: 162,
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
    bottom: 0,
    top: 320,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: "hidden",
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
  WB: {
    marginTop: 4,
    textAlign: "center",
    fontSize: 12,
    color: "#1cb5b0",
  },
  errorText: {
    color: "red",
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
  },
  link: {
    fontSize: 14,
    color: "#1CB5B0",
    fontWeight: "bold",
  },
});
