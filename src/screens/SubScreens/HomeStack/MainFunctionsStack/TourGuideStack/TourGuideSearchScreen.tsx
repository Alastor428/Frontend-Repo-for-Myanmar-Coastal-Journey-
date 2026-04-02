import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { IconButton } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import SetDateComponent from "@/components/HotelBookingComponent/SetDateComponent";
import Trending from "@/components/BeachComponent/Trending";
import { useNavigation } from "@react-navigation/native";
import { SEED_BEACH_DROPDOWN_ITEMS } from "@/constants/travelSeedPlaces";

/** Search keyword sent to API `beachName` (matches Beach.beachName, case-insensitive). */
const BEACH_OPTIONS = SEED_BEACH_DROPDOWN_ITEMS;

const TourGuideSearchScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [selectedBeach, setSelectedBeach] = useState<string | null>(
    null
  );
  const [beachDropdownFocus, setBeachDropdownFocus] = useState(false);

  const handleSearch = () => {
    const beach = selectedBeach?.trim();
    if (!beach) {
      Alert.alert("Beach required", "Please select a beach.");
      return;
    }

    if (!startDate || !endDate) {
      Alert.alert(
        "Dates required",
        "Please choose a start date and an end date."
      );
      return;
    }

    const s0 = new Date(startDate);
    s0.setHours(0, 0, 0, 0);
    const e0 = new Date(endDate);
    e0.setHours(0, 0, 0, 0);
    if (e0.getTime() <= s0.getTime()) {
      Alert.alert(
        "Invalid dates",
        "End date must be after the start date (multi-day rental)."
      );
      return;
    }

    navigation?.navigate("TourGuideResultScreen", {
      beachName: beach,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          paddingBottom: 80,
        }}
      >
        <View>
          <Image
            source={require("../../../../../../assets/Ngapali/Hotels/hotel_photo.jpg")}
            style={{
              width: 393,
              height: 226,
              borderBottomLeftRadius: 24,
              borderBottomRightRadius: 24,
            }}
          />
          <View style={styles.header}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                marginTop: 40,
              }}
            >
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
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: "auto",
                  marginRight: "auto",
                  color: "#000",
                }}
              >
                Tour Guide
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 32,
            justifyContent: "center",
            alignItems: "center",
            marginTop: -80,
          }}
        >
          <View style={styles.card}>
            <Text style={styles.fieldLabel}>Beach</Text>
            <Text style={styles.fieldHint}>
              Choose from all seeded beaches.
            </Text>
            <View style={styles.dropdownWrap}>
              <Dropdown
                style={[
                  styles.dropdown,
                  beachDropdownFocus && { borderColor: "#1CB5B0" },
                ]}
                placeholderStyle={styles.dropdownPlaceholder}
                selectedTextStyle={styles.dropdownSelectedText}
                data={BEACH_OPTIONS}
                search
                maxHeight={220}
                labelField="label"
                valueField="value"
                placeholder="Select beach"
                searchPlaceholder="Search beach..."
                value={selectedBeach}
                onFocus={() => setBeachDropdownFocus(true)}
                onBlur={() => setBeachDropdownFocus(false)}
                onChange={(item) => setSelectedBeach(item.value)}
              />
            </View>

            <View
              style={{
                paddingHorizontal: 12,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "48%" }}>
                <Text style={styles.fieldLabel}>Start date</Text>
                <SetDateComponent
                  value={startDate}
                  onConfirm={(date) => setStartDate(date)}
                />
              </View>
              <View style={{ width: "48%", marginLeft: "auto" }}>
                <Text style={styles.fieldLabel}>End date</Text>
                <SetDateComponent
                  value={endDate}
                  onConfirm={(date) => setEndDate(date)}
                />
              </View>
            </View>

            {/* <Text style={styles.availabilityHint}>
              Search shows guides who are marked available and have no
              overlapping booking in your chosen dates.
            </Text> */}

            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
              activeOpacity={0.85}
            >
              <Text style={styles.searchButtonText}>
                Search available guides
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: "100%", paddingHorizontal: 32 }}>
          <Trending />
        </View>
      </ScrollView>
    </View>
  );
};

export default TourGuideSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    marginBlockStart: 0,
    marginTop: -30,
  },
  header: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 32,
    justifyContent: "center",
    position: "absolute",
  },
  card: {
    marginBottom: 24,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#fff",
    marginTop: -20,
    paddingVertical: 16,
    width: "100%",
    paddingHorizontal: 12,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginHorizontal: 8,
    marginBottom: 4,
    color: "#222",
  },
  fieldHint: {
    fontSize: 11,
    color: "#777",
    marginHorizontal: 8,
    marginBottom: 8,
  },
  availabilityHint: {
    fontSize: 12,
    color: "#666",
    marginHorizontal: 8,
    marginTop: 12,
    marginBottom: 16,
    lineHeight: 18,
  },
  searchButton: {
    backgroundColor: "#21b3a4",
    marginHorizontal: 8,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  dropdownWrap: {
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  dropdown: {
    height: 48,
    borderColor: "#7ec8c7",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  dropdownPlaceholder: {
    fontSize: 15,
    color: "#999",
  },
  dropdownSelectedText: {
    fontSize: 15,
    color: "#222",
  },
});
