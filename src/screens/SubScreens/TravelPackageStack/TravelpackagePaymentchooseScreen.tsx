import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

const TravelpackagePaymentchooseScreen = () => {

  const [selectedMethod, setSelectedMethod] =
    useState<"visa" | "mpu" | null>("mpu");

  const TOTAL_AMOUNT = 250000;

  return (

    <View style={styles.container}>

      <StatusBar
        backgroundColor="#fff"
        barStyle="dark-content"
      />

      {/* <View style={styles.header}>

        <Ionicons
          name="arrow-back"
          size={24}
          color="#000"
        />

        <Text style={styles.headerTitle}>
          Ngapali beach package
        </Text>

      </View> */}



      {/* <Image
        source={require("../../../../assets/ngapali_travel_package/aa.jpg")}
        style={styles.image}
        resizeMode="cover"
      /> */}





      <View style={styles.panel}>

        <View style={styles.dragIndicator} />


        <Text style={styles.title}>
          Payment Method
        </Text>

        <Text style={styles.subtitle}>
          Choose your preferred payment method
        </Text>


        <View style={styles.totalCard}>

          <Text style={styles.totalLabel}>
            Total Amount
          </Text>


          <Text style={styles.totalAmount}>
            {TOTAL_AMOUNT.toLocaleString()} MMK
          </Text>


          <Text style={styles.totalSub}>
            for 1 traveler
          </Text>

        </View>

        <View style={styles.methodContainer}>


          <Text style={styles.selectText}>
            Please Select One Payment Method
          </Text>



          <View style={styles.methodRow}>

            <TouchableOpacity
              style={[
                styles.methodBox,
                selectedMethod === "visa" &&
                  styles.selectedBox,
              ]}
              onPress={() =>
                setSelectedMethod("visa")
              }
            >

              <View style={styles.radioCircle}>
                {selectedMethod === "visa" &&
                  <View style={styles.radioDot} />
                }
              </View>

              <Image
                source={require("../../../../assets/Logo/visa_logo1.png")}
                style={styles.logo}
              />
              <Text style={styles.methodText}>
                Pay with VISA
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.methodBox,
                selectedMethod === "mpu" &&
                  styles.selectedBox,
              ]}
              onPress={() =>
                setSelectedMethod("mpu")
              }
            >

              <View style={styles.radioCircle}>
                {selectedMethod === "mpu" &&
                  <View style={styles.radioDot} />
                }
              </View>

              <Image
                source={require("../../../../assets/Logo/mpu_logo.jpg")}
                style={styles.logo}
              />
              <Text style={styles.methodText}>
                Pay with MPU
              </Text>


            </TouchableOpacity>

          </View>


        </View>

        <TouchableOpacity style={styles.payBtn}>

          <Text style={styles.payText}>
            Pay Now
          </Text>

        </TouchableOpacity>


        <TouchableOpacity style={styles.cancelBtn}>

          <Text style={styles.cancelText}>
            Cancel
          </Text>

        </TouchableOpacity>



      </View>


    </View>

  );

};


export default TravelpackagePaymentchooseScreen;





const styles = StyleSheet.create({


  container: {

    flex: 1,
    backgroundColor: "#fff",

  },



  header: {

    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 15,

  },



  headerTitle: {

    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,

  },




  image: {

    width: "100%",
    height: 200,

    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,

  },





  panel: {

    flex: 1,

    backgroundColor: "#f7f9fa",

    marginTop: 100,

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    padding: 20,


    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: -4,
    },

    shadowOpacity: 0.15,

    shadowRadius: 6,

    elevation: 10,

  },




  dragIndicator: {

    width: 60,
    height: 6,

    backgroundColor: "#ccc",

    alignSelf: "center",

    borderRadius: 10,

    marginBottom: 15,

  },



  title: {

    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",

  },



  subtitle: {

    fontSize: 14,
    color: "#666",

    textAlign: "center",

    marginBottom: 20,

  },



  totalCard: {

    backgroundColor: "#e6f4f3",

    padding: 20,

    borderRadius: 15,

    alignItems: "center",

    marginBottom: 20,

  },



  totalLabel: {

    fontSize: 14,

  },



  totalAmount: {

    fontSize: 26,

    fontWeight: "bold",

    color: "#1aa7a1",

    marginVertical: 6,

  },



  totalSub: {

    fontSize: 13,
    color: "#666",

  },




  methodContainer: {

    backgroundColor: "#fff",

    padding: 15,

    borderRadius: 15,

    borderWidth: 1,

    borderColor: "#eee",

    marginBottom: 20,

  },



  selectText: {

    fontSize: 14,

    marginBottom: 15,

    fontWeight: "500",

  },




  methodRow: {

    flexDirection: "row",

    justifyContent: "space-between",

  },




  methodBox: {

    flex: 1,

    alignItems: "center",

    padding: 12,

  },




  selectedBox: {

    backgroundColor: "#f0fafa",

    borderRadius: 12,

  },




  radioCircle: {

    width: 20,
    height: 20,

    borderRadius: 10,

    borderWidth: 2,

    borderColor: "#1aa7a1",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,

  },



  radioDot: {

    width: 10,
    height: 10,

    borderRadius: 5,

    backgroundColor: "#1aa7a1",

  },




  logo: {

    width: 60,
    height: 30,

    marginBottom: 8,

    resizeMode: "contain",

  },



  methodText: {

    fontSize: 13,
    textAlign: "center",

  },





  payBtn: {

    backgroundColor: "#1aa7a1",

    paddingVertical: 15,

    borderRadius: 15,

    alignItems: "center",

    marginBottom: 12,

  },




  payText: {

    color: "#fff",

    fontSize: 16,

    fontWeight: "bold",

  },





  cancelBtn: {

    backgroundColor: "#e0e0e0",

    paddingVertical: 15,

    borderRadius: 15,

    alignItems: "center",

  },



  cancelText: {

    color: "#444",

    fontSize: 15,

    fontWeight: "600",

  },


});