import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

interface GuideCardProps {
  image: any;
  name: string;
  location: string;
  phone: string;
  experience: string;
  gender: string;
  languages: string[];
  price: string;
  status: string;
  /** When true, status label uses a busy color */
  statusBusy?: boolean;
  /** Dim rent button (still uses onRentPress for feedback, e.g. alert) */
  rentDisabled?: boolean;
  onRentPress?: () => void;
}

const GuideCard: React.FC<GuideCardProps> = ({
  image,
  name,
  location,
  phone,
  experience,
  gender,
  languages,
  price,
  status,
  statusBusy = false,
  rentDisabled = false,
  onRentPress,
}) => {
  return (
    <View style={styles.card}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Image source={image} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>

          <View style={styles.row}>
            <Ionicons name="location-outline" size={16} color="#555" />
            <Text style={styles.location}>{location}</Text>
          </View>

          <Text
            style={[
              styles.statusText,
              statusBusy ? styles.statusBusy : styles.statusAvailable,
            ]}
          >
            {status}
          </Text>

          <View style={styles.row}>
            <Ionicons name="call-outline" size={16} color="#000" />
            <Text style={styles.phone}>{phone}</Text>
          </View>
        </View>

        <Ionicons name="bookmark-outline" size={22} color="#f2b705" />
      </View>

      {/* Details */}
      <View style={styles.details}>
        <View style={styles.row}>
          <Ionicons name="time-outline" size={18} />
          <Text style={styles.detailText}>{experience}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="person-outline" size={18} />
          <Text style={styles.detailText}>{gender}</Text>
        </View>

        <View style={styles.row}>
          <FontAwesome5 name="language" size={16} />
          <Text style={styles.detailText}>Languages</Text>
        </View>

        {/* Languages */}
        <View style={styles.languageContainer}>
          {languages.map((lang, index) => (
            <View key={index} style={styles.languageBox}>
              <Text style={styles.languageText}>{lang}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Price Section */}
      <View style={styles.priceSection}>
        <Text style={styles.today}>Today's price</Text>
        <Text style={styles.price}>{price}</Text>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={[styles.button, rentDisabled && styles.buttonDisabled]}
        onPress={onRentPress}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>
          {rentDisabled ? "Unavailable for these dates" : "Rent this guide"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GuideCard;

const styles = StyleSheet.create({
  card: {
    width: 328,
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 12,
    elevation: 3,
    marginBottom: 16,
  },

  topSection: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },

  info: {
    flex: 1,
    marginLeft: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins",
  },

  location: {
    fontSize: 13,
    marginLeft: 4,
    color: "#777",
  },

  statusText: {
    fontSize: 13,
    marginTop: 2,
    fontWeight: "600",
  },
  statusAvailable: {
    color: "#2e7d32",
  },
  statusBusy: {
    color: "#c62828",
  },

  phone: {
    fontSize: 13,
    marginLeft: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  details: {
    marginTop: 10,
  },

  detailText: {
    marginLeft: 8,
    fontSize: 14,
  },

  languageContainer: {
    flexDirection: "row",
    marginTop: 6,
    flexWrap: "wrap",
  },

  languageBox: {
    backgroundColor: "#dfe8ea",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginTop: 4,
  },

  languageText: {
    fontSize: 12,
  },

  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 10,
  },

  today: {
    fontSize: 14,
  },

  price: {
    fontSize: 14,
    fontWeight: "500",
  },

  button: {
    marginTop: 12,
    backgroundColor: "#2da8a4",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#b0b0b0",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
