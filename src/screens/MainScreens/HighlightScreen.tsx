import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";

import {
  useBookmarks,
  type BeachBookmark,
  type HotelBookmark,
} from "../../context/BookmarkContext";

import BeachComponent from "@/components/BeachComponent/BeachComponent";
import HotelComponent from "@/components/HotelBookingComponent/HotelComponent";

import { useNavigation } from "@react-navigation/native";
// import { beachNameFromHotel } from "@/api/hotelApi"; // Commented out to avoid type mismatch

const PLACEHOLDER = require("../../../assets/Ngapali/Hotels/hotel_photo.jpg");

const { width } = Dimensions.get("window");
const HORIZONTAL_PADDING = 32 * 2;
const GAP = 12;
const CARD_WIDTH = (width - HORIZONTAL_PADDING - GAP) / 2;

const TABS = ["Beaches", "Hotels"];

const HighlightScreen = () => {
  const [activeTab, setActiveTab] = useState("Beaches");
  const { bookmarks, removeBookmark } = useBookmarks();
  const navigation = useNavigation<any>();

  const savedBeaches = bookmarks.filter(
    (b) => b.type === "beach"
  ) as BeachBookmark[];

  const savedHotels = bookmarks.filter(
    (b) => b.type === "hotel"
  ) as HotelBookmark[];

  /* ================= EMPTY UI ================= */
  const EmptyState = ({ text }: { text: string }) => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );

  /* ================= BEACHES ================= */
  const renderBeaches = () => {
    if (savedBeaches.length === 0) {
      return <EmptyState text="No saved beaches yet 🏝️" />;
    }

    return (
      <View style={styles.grid}>
        {savedBeaches.map((beach, index) => (
          <View
            key={beach.id}
            style={[
              styles.gridItem,
              index % 2 === 0
                ? { marginRight: GAP / 2 }
                : { marginLeft: GAP / 2 },
              { marginBottom: GAP },
            ]}
          >
            <BeachComponent
              imageUrl={beach.image}
              title={beach.title}
              width={CARD_WIDTH}
              height={168}
              onPress={() => {
                if (beach.title === "Ngapali")
                  navigation.navigate("Ngapali1");
                else if (beach.title === "Chaung Tha")
                  navigation.navigate("ChaungTha");
              }}
            />
          </View>
        ))}
      </View>
    );
  };

  /* ================= HOTELS ================= */
  const renderHotels = () => {
    if (savedHotels.length === 0) {
      return <EmptyState text="No saved hotels yet 🏨" />;
    }

    const getPrice = (item: HotelBookmark) => {
      if (item.minRoomPrice) {
        return `${Math.round(item.minRoomPrice).toLocaleString()} Ks / night`;
      }
      return "See rooms";
    };

    const getBeachName = (item: HotelBookmark) => {
      return item.beachName || "Ngapali"; // Fallback
    };

    return (
      <FlatList
        data={savedHotels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const beachName = getBeachName(item);

          return (
            <HotelComponent
              hotelId={item.id}
              imageUrl={PLACEHOLDER}
              title={item.title}
              rating={String(item.rating ?? "—")}
              price={getPrice(item)}
              mapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${beachName} ${item.title}`
              )}`}
              bookingContext={
                item.bookingContext || {
                  beachName: "",
                  checkIn: "",
                  checkOut: "",
                  rooms: 1,
                  adults: 2,
                  nights: 1,
                }
              }
            />
          );
        }}
        contentContainerStyle={{ padding: 32 }}
      />
    );
  };

  /* ================= CONTENT ================= */
  const renderContent = () => {
    if (activeTab === "Beaches") return renderBeaches();
    if (activeTab === "Hotels") return renderHotels();
    return null;
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Items</Text>
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* CONTENT */}
      <View style={{ flex: 1 }}>{renderContent()}</View>
    </View>
  );
};

export default HighlightScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    width: "100%",
    height: 140,
    backgroundColor: "#74d7d9",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 30,
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
    gap: 10,
  },

  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#eee",
  },

  activeTab: {
    backgroundColor: "#1cb5b0",
  },

  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },

  activeTabText: {
    color: "#fff",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    paddingHorizontal: 32,
  },

  gridItem: {
    width: CARD_WIDTH,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#888",
  },
});

