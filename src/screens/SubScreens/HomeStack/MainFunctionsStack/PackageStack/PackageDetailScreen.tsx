import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";

import { IconButton } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import PackageBookingModal from "./PackageBookingModal";
import PackagePaymentMethodModal from "./PackagePaymentMethodModal";
import { loadAuthSession } from "@/auth/authStorage";
import { getTravelPackageById, cityNameFromTravelPackage, beachNameFromTravelPackage, type TravelPackageDto } from "@/api/packageApi";

const PackageDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const packageId = (route.params?.packageId as string | undefined)?.trim();

  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [paymentTotalAmount, setPaymentTotalAmount] = useState("250,000");
  const [paymentTravelers, setPaymentTravelers] = useState(1);

  const [pkg, setPkg] = useState<TravelPackageDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!packageId) {
      setPkg(null);
      setHint("Missing package selection.");
      return;
    }
    setLoading(true);
    setHint(null);
    try {
      const session = await loadAuthSession();
      if (!session) {
        setPkg(null);
        setHint("Sign in to view package details.");
        return;
      }
      const res = await getTravelPackageById(session.accessToken, packageId);
      setPkg(res.data ?? null);
      if (!res.data) setHint("Package not found.");
    } catch (e: unknown) {
      setPkg(null);
      setHint(e instanceof Error ? e.message : "Could not load package.");
    } finally {
      setLoading(false);
    }
  }, [packageId]);

  useEffect(() => {
    void load();
  }, [load]);

  const durationText = useMemo(() => {
    const nights = Number(pkg?.hotel?.nights ?? 2);
    const days = nights + 1;
    return `${days} Days ${nights} Night`;
  }, [pkg]);

  const busPerPerson = useMemo(() => Number(pkg?.busTicket?.pricePerPerson ?? 0), [pkg]);
  const hotelPerPerson = useMemo(() => {
    const nights = Number(pkg?.hotel?.nights ?? 0);
    const fee = Number(pkg?.hotel?.feePerNightPerPerson ?? 0);
    return nights * fee;
  }, [pkg]);
  const transferPerPerson = useMemo(() => {
    const total = Number(pkg?.pricePerPerson ?? 0);
    return Math.max(0, total - busPerPerson - hotelPerPerson);
  }, [pkg, busPerPerson, hotelPerPerson]);

  const priceText = useMemo(() => {
    const price = Number(pkg?.pricePerPerson ?? 0);
    return price ? `${Math.round(price).toLocaleString()} MMK` : "—";
  }, [pkg]);

  const titleText = pkg?.packageName ?? "Travel Package";
  const fromCity = pkg ? cityNameFromTravelPackage(pkg) : "—";
  const toBeach = pkg ? beachNameFromTravelPackage(pkg) : "—";

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          size={30}
          onPress={() => navigation.goBack()}
        />

        <Text style={styles.headerTitle} numberOfLines={1}>
          {titleText}
        </Text>
      </View>

      {/* Image */}
      <View style={styles.imageBox}>
        <Image
          source={require("../../../../../../assets/Ngapali/NP1.png")}
          style={styles.image}
        />

        <View style={styles.duration}>
          <Text>{durationText}</Text>
        </View>

        <Text style={styles.title}>{titleText}</Text>

        <Text style={styles.location}>
          {toBeach ? `${toBeach}, Myanmar` : "—"}
        </Text>
      </View>

      {/* Price Box */}
      <View style={styles.priceBox}>
        <Text>Starting from</Text>

        <Text style={styles.price}>{priceText}</Text>

        <Text>Per person</Text>

        <Pressable
          style={styles.bookBtn}
          onPress={() => setIsBookingModalVisible(true)}
          disabled={loading || !pkg}
        >
          <Text style={{ color: "#fff" }}>{loading ? "Loading..." : "Book Now"}</Text>
        </Pressable>
      </View>

      {/* Package Includes */}
      <Text style={styles.section}>Package Includes</Text>

      {/* Bus */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Round-trip Bus Tickets</Text>

        <Text>
          {fromCity} → {toBeach}
        </Text>

        <Text style={styles.cardPrice}>
          {Math.round(busPerPerson).toLocaleString()} MMK
        </Text>
      </View>

      {/* Hotel */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {Number(pkg?.hotel?.nights ?? 2)} Nights Hotel Stay
        </Text>

        <Text>
          {typeof pkg?.hotel?.hotel === "object" &&
          pkg?.hotel?.hotel &&
          "hotelName" in (pkg.hotel.hotel as any)
            ? String((pkg.hotel.hotel as any).hotelName ?? "Hotel Room")
            : "Hotel Room"}
        </Text>

        <Text style={styles.cardPrice}>
          {Math.round(hotelPerPerson).toLocaleString()} MMK
        </Text>
      </View>

      {/* Transfer */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hotel Transfers</Text>

        <Text>Bus Station to Hotel & return</Text>

        <Text style={styles.cardPrice}>
          {Math.round(transferPerPerson).toLocaleString()} MMK
        </Text>
      </View>
      <PackageBookingModal
        visible={isBookingModalVisible}
        onClose={() => setIsBookingModalVisible(false)}
        onProceedToPayment={({ totalAmount, travelers }) => {
          setPaymentTotalAmount(totalAmount);
          setPaymentTravelers(travelers);
          setIsPaymentModalVisible(true);
        }}
        pricePerPerson={Number(pkg?.pricePerPerson ?? 0)}
        title={`${fromCity} → ${toBeach}`}
        duration={durationText}
      />
      <PackagePaymentMethodModal
        visible={isPaymentModalVisible}
        onClose={() => setIsPaymentModalVisible(false)}
        totalAmount={paymentTotalAmount}
        travelers={paymentTravelers}
        onProceed={(selectedPaymentType: string, remarkText?: string) => {
          navigation.navigate("PackagePaymentScreen", {
            packageId,
            packageName: titleText,
            travelers: paymentTravelers,
            totalAmount: paymentTotalAmount,
            paymentType: selectedPaymentType,
            duration: durationText,
            remark: remarkText || "",
          });
          setIsPaymentModalVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default PackageDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
  },

  imageBox: {
    padding: 16,
  },

  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },

  duration: {
    position: "absolute",
    right: 20,
    top: 20,
    backgroundColor: "#eee",
    padding: 6,
    borderRadius: 6,
  },

  title: {
    position: "absolute",
    bottom: 40,
    left: 20,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  location: {
    position: "absolute",
    bottom: 20,
    left: 20,
    color: "#fff",
  },

  priceBox: {
    margin: 16,
    backgroundColor: "#d9e3e6",
    padding: 16,
    borderRadius: 10,
  },

  price: {
    fontSize: 22,
    color: "#2aa7a1",
    fontWeight: "bold",
  },

  bookBtn: {
    backgroundColor: "#2aa7a1",
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 6,
  },

  section: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 16,
  },

  card: {
    backgroundColor: "#e3eef0",
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
  },

  cardTitle: {
    fontWeight: "bold",
  },

  cardPrice: {
    color: "#2aa7a1",
    marginTop: 4,
  },
});
