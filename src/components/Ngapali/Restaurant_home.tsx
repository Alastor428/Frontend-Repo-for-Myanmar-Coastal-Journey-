import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageSourcePropType,
  Pressable,
} from "react-native";

interface IRestaurant {
  id: string;
  name: string;
  image: ImageSourcePropType;
}

const RESTAURANT_DATA: IRestaurant[] = [
  {
    id: "1",
    name: "Ngapali Kitchen",
    image: require("../../../assets/ngapali_restaurant/ngapali_kitchen.png"),
  },
  {
    id: "2",
    name: "Ocean Pearl",
    image: require("../../../assets/ngapali_restaurant/ocean_pearl.jpg"),
  },
  {
    id: "3",
    name: "PVI Restaurant",
    image: require("../../../assets/ngapali_restaurant/Pvi.jpg"),
  },
  {
    id: "4",
    name: "Sea Queen",
    image: require("../../../assets/ngapali_restaurant/Sea_queen.jpg"),
  },
];

const Restaurant_home: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleRestaurantPress = (name: string) => {
    if (name === "Ocean Pearl") {
      navigation.navigate("OceanPearl");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerLayout}>
        <Text style={styles.headerText}>Restaurant</Text>
      </View>

      <View style={styles.rowLayout}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 2 }}
        >
          {RESTAURANT_DATA.map((item: IRestaurant) => (
            <Pressable
              key={item.id}
              onPress={() => handleRestaurantPress(item.name)}
              style={({ pressed }) => [
                styles.restaurantCard,
                pressed && { opacity: 0.7 },
              ]}
            >
              <Image source={item.image} style={styles.imageStyle} />
              <View style={styles.textWrapper}>
                <Text style={styles.restaurantTitle} numberOfLines={2}>
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
  restaurantCard: {
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
  restaurantTitle: {
    fontFamily: "Open Sans",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
    color: "#000000",
  },
});

export default Restaurant_home;
