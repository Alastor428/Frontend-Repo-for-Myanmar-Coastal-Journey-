import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import ProfilePhotoComponent from "@/components/SettingComponent/ProfilePhotoComponent";
import ProfileButton from "@/components/SettingComponent/ProfileButton";
import AccountSecurityButton from "@/components/SettingComponent/AccountSecurityButton";
import ReportAProblemButton from "@/components/SettingComponent/ReportAProblemButtom";
import SupportButton from "@/components/SettingComponent/SupportButton";
import TermsAndPoliciesButton from "@/components/SettingComponent/TermsAndPoliciesButton";
import LogoutButton from "@/components/SettingComponent/LogoutButton";

interface User {
  id: number;
  name: string;
  profilePhoto: any;
  phoneNumber: string;
}

const SettingScreen: React.FC = () => {
  const [user, setUser] = useState<User>({
    id: 1,
    name: "Aung Aung",
    profilePhoto: require("../../../assets/Ngapali/i-would-say-the-best.png"),
    phoneNumber: "09123456789",
  });

  const navigation = useNavigation<any>();

  const [modalVisible, setModalVisible] = useState(false);

  // Show options
  const handlePhotoPress = () => {
    Alert.alert("Profile Photo", "Choose an option", [
      {
        text: "View Photo",
        onPress: () => setModalVisible(true),
      },
      {
        text: "Update Photo",
        onPress: pickImage,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  // Pick Image & Update User Data
  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      console.log("Selected Image:", selectedImage);

      // Update user object
      setUser((prevUser) => ({
        ...prevUser,
        profilePhoto: { uri: selectedImage.uri },
      }));
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileSection}>
          <ProfilePhotoComponent
            imageUrl={user.profilePhoto}
            onPress={handlePhotoPress}
          />

          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.phoneNumber}>{user.phoneNumber}</Text>

          {/* Setting text aligned 32px from left */}
          <View style={{ width: '100%', padding: 32 }}>
            <Text style={styles.settingText}>Setting</Text>
            <View style={{ marginBottom: 20 }} >
              <ProfileButton />
            </View>
            <AccountSecurityButton />
          </View>

          {/* Support and About */}
          <View style={{ width: '100%', paddingHorizontal: 32 ,paddingBottom:32}} >
            <Text style={styles.settingText}>Support and About</Text>
            <View style={{ marginBottom: 20 }} >
              <ReportAProblemButton onPress={() => Alert.alert("Report a Problem Pressed")} />
            </View>
            <View style={{ marginBottom: 20 }} >
              <SupportButton onPress={() => Alert.alert("Support Pressed")} />
            </View>
            <TermsAndPoliciesButton onPress={() => Alert.alert("Terms and Policies Pressed")} />
          </View>

          <View style={{width: '100%', paddingHorizontal: 32, paddingBottom: 32}}>
            <Text style={styles.settingText}>Logout</Text>
            <LogoutButton
              onPress={() =>
                Alert.alert(
                  "Logout",
                  "Are you sure you want to logout?",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Yes",
                      onPress: () => {
                        console.log("User confirmed logout");
                        // TODO: Add actual logout logic here
                      },
                    },
                  ],
                  { cancelable: true }
                )
              }
            />

          </View>
        </View>
      </ScrollView>

      {/* View Photo Modal */}
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={() => setModalVisible(false)}
          >
            <Image source={user.profilePhoto} style={styles.fullImage} />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profileSection: {
    alignItems: "center",
    width: '100%',
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center",
  },
  phoneNumber: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "200",
    textAlign: "center",
  },
  settingText: {
    fontSize: 14,
    fontWeight: "500",
    paddingBottom: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
});
