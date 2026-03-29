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
import SetGenderButton from "@/components/AuthComponent/SetGenderButton";
import PassportComponent from "@/components/AuthComponent/Passport";

const { width, height } = Dimensions.get("window");

const DUMMY_USER = {
  email: "admin@gmail.com",
  password: "123456",
};

type Props = {
  onLoginSuccess: () => void;
};

const WelcomeScreen: React.FC<Props> = ({ onLoginSuccess }) => {
  const leftAnim = useRef(new Animated.Value(-width)).current;
  const rightAnim = useRef(new Animated.Value(width)).current;
  const sheetAnim = useRef(new Animated.Value(height)).current;

  const scrollRef = useRef<ScrollView>(null);

  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  // Sign In
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  // Sign Up
  const [signupUserName, setSignupUserName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const [acceptTerms, setAcceptTerms] = useState(false);

  const [dob, setDob] = useState<Date>();
  const [gender, setGender] = useState<string | null>(null);

  // NRC / Passport
  const [hasNRC, setHasNRC] = useState(true);

  const [nrcState, setNrcState] = useState("");
  const [nrcTownship, setNrcTownship] = useState("");
  const [nrcType, setNrcType] = useState("");
  const [nrcNumber, setNrcNumber] = useState("");

  const [passportNumber, setPassportNumber] = useState("");

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

  // Login
  const handleLogin = () => {
    Keyboard.dismiss();

    if (!email || !password) {
      setError("Fill the data first");
      return;
    }

    if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
      setError("");
      onLoginSuccess();
    } else {
      setError("Invalid email or password");
      setEmail("");
      setPassword("");
    }
  };

  // Signup
  const handleSignUp = () => {
    Keyboard.dismiss();

    if (
      !signupUserName ||
      !signupEmail ||
      !signupPassword ||
      !signupConfirmPassword ||
      !dob ||
      !gender ||
      (hasNRC
        ? !nrcState || !nrcTownship || !nrcType || !nrcNumber
        : !passportNumber)
    ) {
      setSignupError("Fill all fields first");
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      setSignupError("You must accept terms and conditions");
      return;
    }

    const NRC = hasNRC
      ? `${nrcState}/${nrcTownship}(${nrcType})${nrcNumber}`
      : passportNumber;

    console.log("SIGN UP DATA");
    console.log("UserName:", signupUserName);
    console.log("Email:", signupEmail);
    console.log("DOB:", dob?.toDateString());
    console.log("Gender:", gender);
    console.log("ID:", NRC);

    alert("Account created successfully!");

    setSignupUserName("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirmPassword("");
    setNrcState("");
    setNrcTownship("");
    setNrcType("");
    setNrcNumber("");
    setPassportNumber("");
    setDob(undefined);
    setGender(null);
    setAcceptTerms(false);
    setSignupError("");
    setActiveTab("signin");
  };

  return (
    <View style={styles.container}>
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

      <Animated.View
        style={[
          styles.buttonbox,
          { transform: [{ translateY: sheetAnim }] },
        ]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: "center",
              paddingBottom: 120,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.handleArea}>
              <View style={styles.rectangle} />
            </View>

            {/* SIGN IN */}
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

                <View style={{ width: "100%", marginTop: 12,paddingHorizontal: 32 }}>
                  <RememberMeCheckbox
                    value={rememberMe}
                    onToggle={() => setRememberMe(p => !p)}
                  />
                </View>

                {error && <Text style={styles.errorText}>{error}</Text>}

                <SignInButton onPress={handleLogin} disabled={false} />

                <View style={{ flexDirection: "row", marginTop: 16 }}>
                  <Text style={{ color: "#666" }}>
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

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: 328, marginTop: 32 }}>
                  <Text style={{ flex: 1, fontSize: 14, color: "#1CB5B0", fontWeight: "bold" }}>
                    I don't have NRC
                  </Text>

                  <TouchableOpacity
                    onPress={() => setHasNRC(prev => !prev)}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor: "#1CB5B0",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: !hasNRC ? "#1CB5B0" : "white",
                    }}
                  >
                    {!hasNRC && (
                      <Text style={{ color: "white", fontSize: 12 }}>✓</Text>
                    )}
                  </TouchableOpacity>
                </View>

                {hasNRC ? (
                  <View style={{ marginTop: 8 }}>
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
                ) : (
                  <View style={{ marginTop: 8 }}>
                    <PassportComponent
                      value={passportNumber}
                      onChange={setPassportNumber}
                    />
                  </View>
                )}

                <View style={{ marginTop: 20 }}>
                  <DateOfBirth
                    label="Date of Birth"
                    value={dob}
                    onConfirm={setDob}
                  />
                </View>

                <View style={{ marginTop: -16 }}>
                  <SetGenderButton
                    value={gender}
                    onChange={setGender}
                  />
                </View>

                <View style={{ marginTop: 8 }}>
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

                <View style={{ width: "100%", marginTop: 12,paddingHorizontal: 32 }}>
                  <AcceptComponent
                    value={acceptTerms}
                    onToggle={() => setAcceptTerms(p => !p)}
                  />
                </View>

                {signupError && (
                  <Text style={styles.errorText}>{signupError}</Text>
                )}

                <View style={{ marginTop: -8 }}>
                  <SignUpButton onPress={handleSignUp} disabled={false} />
                </View>

                <View style={{ flexDirection: "row", marginTop: 16 }}>
                  <Text style={{ color: "#666" }}>
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
