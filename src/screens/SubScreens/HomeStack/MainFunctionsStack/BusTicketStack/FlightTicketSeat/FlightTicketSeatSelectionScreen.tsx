import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { IconButton } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import SeatLegend from "../BusTicketSeatSelection/Bus_fixed_sample_seat";
import SeatLayout from "../BusTicketSeatSelection/Bus_ticket_seat_layout";
import { loadAuthSession } from "@/auth/authStorage";

type FlightTicketCardParams = {
  id: string;
  showId: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  price: string;
  duration: string;
  status: "available" | "soldout";
  source: string;
  destination: string;
  travelDate: string;
  seatPrice: number;
  boardingPoint?: string;
};

const FlightTicketSeatSelectionScreen: React.FC<{ navigation?: any }> = ({
  navigation,
}) => {
  const route = useRoute<any>();
  const ticket = route.params?.ticket as FlightTicketCardParams | undefined;
  const [session, setSession] = useState<Awaited<
    ReturnType<typeof loadAuthSession>
  > | null>(undefined);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const s = await loadAuthSession();
      if (!cancelled) setSession(s);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (session === undefined) {
    return (
      <View style={[styles.outerContainer, styles.centered]}>
        <ActivityIndicator size="large" color="#1db0a9" />
      </View>
    );
  }

  if (!session || !ticket?.showId) {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.header}>
          <IconButton
            icon="chevron-left"
            size={32}
            onPress={() => navigation?.goBack?.()}
            style={{ margin: 0, padding: 0 }}
          />
          <Text style={styles.headerText}>Select Flight Seat</Text>
        </View>
        <Text style={styles.hint}>
          Sign in and select a flight from results to continue.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          size={32}
          onPress={() => navigation?.goBack?.()}
          style={{ margin: 0, padding: 0 }}
        />
        <Text style={styles.headerText}>Select Flight Seat</Text>
      </View>

      <SeatLegend />

      <View style={{ flex: 1 }}>
        <SeatLayout
          showId={ticket.showId}
          accessToken={session.accessToken}
          userId={session.userId}
          busType={ticket.airline}
          travelDate={ticket.travelDate}
          departureTime={ticket.departureTime}
          source={ticket.source}
          destination={ticket.destination}
          boardingPoint={ticket.boardingPoint}
          paymentScreen="FlightTicketPaymentScreen"
          transportLabel="Flight seats"
        />
      </View>
    </View>
  );
};

export default FlightTicketSeatSelectionScreen;

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: "#EFF3F4" },
  centered: { justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 32,
    paddingBottom: 8,
    backgroundColor: "#EFF3F4",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Poppins",
  },
  hint: {
    paddingHorizontal: 32,
    paddingTop: 24,
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },
});
