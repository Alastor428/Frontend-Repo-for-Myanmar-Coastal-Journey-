import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageSourcePropType,
  Pressable,
  Linking,
  Alert,
} from "react-native";

interface IPagoda {
  id: string;
  name: string;
  image: ImageSourcePropType;
  mapLink: string;
}

const PAGODA_DATA: IPagoda[] = [
  {
    id: "1",
    name: "Chaung Tha Chedi On Rock",
    image: require("../../../../assets/ChaungThar/Nearest pagoda/Chaung Tha Chedi On Rock/1.jpg"),
    mapLink:
      "https://www.google.com/maps/place/Chaung+Tha+Chedi+On+Rock/@16.9621755,94.4417428,3a,80.9y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICyuv6PAw!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHVAweoZuZ8zIzxh-iSJocK36ltrnDTUInZjtvgFfxAFDaieAetCbAROFkF9FqXpo-TTduUbA1iwkRPy9AM8SStsp862Xw7j2JngZf6rUf8Xc5lTjHNlTdv1UZLpJ-ioe78FR0EPUutl%3Dw203-h102-k-no!7i960!8i483!4m17!1m8!2m7!1spagoda+near+chaung+tha+beach!3m5!2sChaung+Tha+Beach+.Pathein+.Ayeyawaddy!3s0x30bfb3c590aaa005:0xe2f0456fe6c1ada5!4m2!1d94.4387277!2d16.9593804!3m7!1s0x30bfb3c947f03c37:0x71ed237eccc49b6f!8m2!3d16.9631317!4d94.4431324!10e5!15sChxwYWdvZGEgbmVhciBjaGF1bmcgdGhhIGJlYWNokgEGcGFnb2Rh4AEA!16s%2Fg%2F11h22bj0zq?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    id: "2",
    name: "Kyaukputo Pagoda",
    image: require("../../../../../assets/ChaungThar/Nearest pagoda/Kyaukputo Pagoda/photo_2026-04-02_09-23-33.jpg"),
    mapLink:
      "https://www.google.com/maps/place/Kyaukputo+Pagoda/@16.9621032,94.4416866,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIC9tJnV3wE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHVAweoyaxNMWI12kbnEcGCdDgQKIU5xN8vE8_ux63AEoj0D5S7AMRPEUBgX-ABvkKl2NDrO1fwDUHHkdxbnGWrQmPONVqfs5P_vAfp3fQh_UJlqppM4DQPZlaeY6DGsRHkT8nmmwSHD%3Dw86-h190-k-no!7i2084!8i4624!4m17!1m8!2m7!1spagoda+near+chaung+tha+beach!3m5!2sChaung+Tha+Beach+.Pathein+.Ayeyawaddy!3s0x30bfb3c590aaa005:0xe2f0456fe6c1ada5!4m2!1d94.4387277!2d16.9593804!3m7!1s0x30bfb3c3fc238ef1:0x5f91a6d0ac925531!8m2!3d16.9621241!4d94.4417287!10e5!15sChxwYWdvZGEgbmVhciBjaGF1bmcgdGhhIGJlYWNokgEGcGFnb2Rh4AEA!16s%2Fg%2F11vkdcm1zz?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    id: "3",
    name: "Three Pagodas",
    image: require("../../../../../assets/ChaungThar/Nearest pagoda/Three Pagodas/photo_2026-04-02_09-35-10.jpg"),
    mapLink:
      "https://maps.app.goo.gl/uYyFMH2n7cpHHLtC6",
  },
  {
    id: "4",
    name: "ကျောက်တစ်လုံးကမ်းခြေ - Pagoda",
    image: require("../../../../../assets/ChaungThar/Nearest pagoda/ကျောက်တစ်လုံးကမ်းခြေ - Pagoda/photo_2026-04-02_09-43-15.jpg"),
    mapLink:
      "https://maps.app.goo.gl/a6ArJPvCo1VBNGz77",
  },
];

const Pagoda_CT: React.FC = () => {
  const handleOpenMap = async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "Cannot open Google Maps.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerLayout}>
        <Text style={styles.headerText}>Nearest Pagoda</Text>
      </View>

      <View style={styles.rowLayout}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {PAGODA_DATA.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.pagodaCard,
                pressed && { opacity: 0.7 },
              ]}
              onPress={() => handleOpenMap(item.mapLink)}
            >
              <Image source={item.image} style={styles.imageStyle} />
              <View style={styles.textWrapper}>
                <Text style={styles.pagodaTitle} numberOfLines={2}>
                  {item.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 32,
  },
  headerLayout: {
    width: 328,
    height: 28,
    // marginTop: 50,
    justifyContent: "center",
  },
  headerText: {
    fontFamily: "Poppins",
    fontWeight: "800",
    fontSize: 16,
    lineHeight: 32,
    color: "#000000",
  },
  rowLayout: {
    width: 328,
    height: 116,
    marginTop: 10,
  },
  pagodaCard: {
    width: 72,
    height: 108,
    marginRight: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(28, 181, 176, 0.25)",
    overflow: "hidden",
    alignItems: "center",
  },
  imageStyle: {
    width: 72,
    height: 72,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    resizeMode: "cover",
  },
  textWrapper: {
    width: 64,
    height: 32,
    marginTop: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  pagodaTitle: {
    fontFamily: "Open Sans",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
    color: "#000000",
  },
});

export default Pagoda_CT;
