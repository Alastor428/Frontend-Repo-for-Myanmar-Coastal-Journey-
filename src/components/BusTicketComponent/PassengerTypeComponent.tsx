import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import DateComponent from "./DateComponent";
 // adjust path

const locations = [
  { label: "Yangon", value: "yangon" },
  { label: "Mandalay", value: "mandalay" },
  { label: "Naypyitaw", value: "naypyitaw" },
  { label: "Ngapali", value: "ngapali" },
];

const TravelPackagesScreen = () => {
  const [from, setFrom] = useState("yangon");
  const [to, setTo] = useState("ngapali");
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Title */}
      <Text style={styles.title}>Travel Packages</Text>

      {/* Image */}
      <ImageBackground
        source={require("../../../../assets/ngapali_travel_package/aa.jpg")}
        style={styles.image}
        imageStyle={{ borderRadius: 15 }}
      >
        <Text style={styles.imageText}>Myanmar Coastal Journey</Text>
      </ImageBackground>

      {/* Form */}
      <View style={styles.form}>

        {/* From */}
        <Text style={styles.label}>From</Text>
        <View style={styles.inputBox}>
          <Ionicons name="location-outline" size={20} color="#26A69A" />
          <Dropdown
            style={styles.dropdown}
            data={locations}
            labelField="label"
            valueField="value"
            value={from}
            onChange={(item) => setFrom(item.value)}
          />
        </View>

        {/* To */}
        <Text style={styles.label}>To</Text>
        <View style={styles.inputBox}>
          <Ionicons name="location-outline" size={20} color="#26A69A" />
          <Dropdown
            style={styles.dropdown}
            data={locations}
            labelField="label"
            valueField="value"
            value={to}
            onChange={(item) => setTo(item.value)}
          />
        </View>

        {/* Date */}
        <DateComponent
          label="Depart on"
          value={date}
          onConfirm={(d) => setDate(d)}
        />

        {/* Search Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default TravelPackagesScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 15,
  },

  image: {
    height: 160,
    justifyContent: "flex-end",
    padding: 15,
    marginBottom: 20,
  },

  imageText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  form: {
    gap: 12,
  },

  label: {
    fontSize: 14,
    color: "#555",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#26A69A",
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  dropdown: {
    flex: 1,
    height: 50,
    marginLeft: 10,
  },

  button: {
    backgroundColor: "#26A69A",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

});