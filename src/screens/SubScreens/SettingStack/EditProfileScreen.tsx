import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Linking} from "react-native";
import { IconButton } from "react-native-paper";
import NameButton from "@/components/SettingComponent/NameButton";
import GenderButton from "@/components/SettingComponent/GenderButton";
import PhoneNumberButton from "@/components/SettingComponent/PhoneNumberButton";
import IdButton from "@/components/SettingComponent/IdButton";
import DateOfBirthButton from "@/components/SettingComponent/DateOfBirthButton";
import NRCButton from "@/components/SettingComponent/NRCButton";
import { useNavigation } from "@react-navigation/native";

interface User {
  id: number;
  name: string;
  phoneNumber: string;
  NRC?: string;        
  passport?: string;   
  dateOfBirth: string;
  gender: string;
}

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [user, setUser] = useState<User>({
    id: 1,  
    name: "Aung Aung",
    phoneNumber: "09123456789",
    dateOfBirth: "1990-01-01",
    gender: "Male",
    NRC: "12/KaLaNa(N)123456",
  });

    return (    
    <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
            <IconButton
                icon="chevron-left"   
                size={32}
                iconColor="#000"
                onPress={() => navigation?.goBack?.()}
                style={{ 
                  margin: 0, 
                  padding: 0,
                  backgroundColor: "rgb(255,255,255,0.09)",  
                }} 
              />
            <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 'auto', marginRight: 'auto' }}>
                Profile
            </Text>
        </View>

        {/* Button */}
        <View style={{ width: '100%', paddingHorizontal: 32 }} >
          <NameButton name={user.name} onPress={() => {  
            navigation?.navigate("EditNameScreen");
          }} />
        </View>
        <View style={{ width: '100%', paddingHorizontal: 32, marginTop: 16 }} >
          <GenderButton gender={user.gender} onPress={() => {  
            navigation?.navigate("EditGenderScreen");
          }} />
        </View>
        <View style={{ width: '100%', paddingHorizontal: 32, marginTop: 16 }} >
          <PhoneNumberButton phoneNumber={user.phoneNumber} />
        </View>
        <View style={{ width: '100%', paddingHorizontal: 32, marginTop: 16 }} >
          <IdButton id={user.id} />
        </View>
        <View style={{ width: '100%', paddingHorizontal: 32, marginTop: 16 }} >
          <DateOfBirthButton dateOfBirth={user.dateOfBirth} onPress={() => {  
            navigation?.navigate("EditDateOfBirthScreen");
          }} />
        </View>
        <View style={{ width: '100%', paddingHorizontal: 32, marginTop: 16 }} >
          <NRCButton nrc={user.NRC} passportNumber={user.passport}/>
        </View>
    </View>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBlockStart: -320,
    },
    header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 24,
    },
});
