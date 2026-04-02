import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import BusTicketCard from "./Ticket_card_buy";
import FlightTicketCard from "./FlightTicketCardComponent";
import { loadAuthSession } from "@/auth/authStorage";
import {
  listBusShows,
  countAvailableSeats,
  type BusShowDto,
} from "@/api/busSeatApi";

function travelDateLabel(show: BusShowDto): string {
  const t = show.ticket;
  if (t && typeof t === "object" && t.departureDate) {
    const d = String(t.departureDate);
    return d.includes("T") ? d.slice(0, 10) : d.slice(0, 10);
  }
  return "—";
}

function mapShowToCardTicket(show: BusShowDto) {
  const t = show.ticket;
  const source = t && typeof t === "object" ? String(t.source ?? "—") : "—";
  const destination =
    t && typeof t === "object" ? String(t.destination ?? "—") : "—";
  const type =
    t && typeof t === "object" && t.ticketName ? String(t.ticketName) : "Bus";

  const available = countAvailableSeats(show) > 0;

  return {
    id: String(show._id),
    showId: String(show._id),
    type,
    departureTime: show.departureTime,
    price: `${show.price.toLocaleString()} MMK`,
    duration: "—",
    status: available ? ("available" as const) : ("soldout" as const),
    source,
    destination,
    travelDate: travelDateLabel(show),
    seatPrice: show.price,
    boardingPoint: source,
  };
}

function mapShowToFlightCard(show: BusShowDto) {
  const t = show.ticket;
  const source = t && typeof t === "object" ? String(t.source ?? "—") : "—";
  const destination =
    t && typeof t === "object" ? String(t.destination ?? "—") : "—";
  const airline =
    t && typeof t === "object" && t.ticketName
      ? `Flight · ${String(t.ticketName)}`
      : "Flight · Myanmar Airways";
  return {
    id: `flight-${show._id}`,
    showId: String(show._id),
    airline,
    departureTime: show.departureTime,
    arrivalTime: "—",
    price: `${show.price.toLocaleString()} MMK`,
    duration: "—",
    status: "available" as const,
    source,
    destination,
    travelDate: travelDateLabel(show),
    seatPrice: show.price,
    boardingPoint: source,
  };
}

const BusTicketSearchResultScreen: React.FC<{ navigation?: any }> = ({
  navigation,
}) => {
  const route = useRoute<any>();
  const selectedSource = (route.params?.source as string | undefined)?.trim();
  const selectedDestination = (
    route.params?.destination as string | undefined
  )?.trim();
  const selectedTravelDate = (
    route.params?.travelDate as string | undefined
  )?.trim();
  const MAX_BUS_RESULTS = 80;
  const [activeTab, setActiveTab] = useState<"bus" | "flight">("bus");
  const [busTickets, setBusTickets] = useState<
    ReturnType<typeof mapShowToCardTicket>[]
  >([]);
  const [flightTickets, setFlightTickets] = useState<
    ReturnType<typeof mapShowToFlightCard>[]
  >([]);
  const [busLoading, setBusLoading] = useState(false);
  const [busHint, setBusHint] = useState<string | null>(null);

  const loadBusShows = useCallback(async () => {
    setBusHint(null);
    setBusLoading(true);
    try {
      const session = await loadAuthSession();
      const res = await listBusShows(session?.accessToken);
      const shows = (res.data ?? []).filter((show) => {
        const t = show.ticket;
        if (!t || typeof t !== "object") return false;
        const src = String(t.source ?? "").trim();
        const dst = String(t.destination ?? "").trim();
        if (selectedSource && src !== selectedSource) return false;
        if (selectedDestination && dst !== selectedDestination) return false;
        if (selectedTravelDate) {
          const label = travelDateLabel(show);
          if (label !== selectedTravelDate) return false;
        }
        return true;
      });

      const busMapped = shows.map(mapShowToCardTicket);
      const flightMapped = shows.map(mapShowToFlightCard);

      setBusTickets(busMapped.slice(0, MAX_BUS_RESULTS));
      setFlightTickets(flightMapped.slice(0, MAX_BUS_RESULTS));
      if (
        busMapped.length > MAX_BUS_RESULTS ||
        flightMapped.length > MAX_BUS_RESULTS
      ) {
        setBusHint(`Showing first ${MAX_BUS_RESULTS} trips for speed.`);
      }
    } catch (e: unknown) {
      setBusTickets([]);
      setFlightTickets([]);
      const msg = e instanceof Error ? e.message : "Could not load bus trips.";
      setBusHint(msg);
    } finally {
      setBusLoading(false);
    }
  }, [selectedDestination, selectedSource, selectedTravelDate]);

  useFocusEffect(
    useCallback(() => {
      void loadBusShows();
    }, [loadBusShows])
  );

  return (
    <View style={styles.outerContainer}>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          size={32}
          onPress={() => navigation?.goBack?.()}
        />
        <Text style={styles.headerText}>Search Results</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "bus" && styles.activeTab]}
          onPress={() => setActiveTab("bus")}
        >
          <Text
            style={[styles.tabText, activeTab === "bus" && styles.activeText]}
          >
            Bus
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "flight" && styles.activeTab]}
          onPress={() => setActiveTab("flight")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "flight" && styles.activeText,
            ]}
          >
            Flight
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={activeTab === "bus" ? busTickets : flightTickets}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }: any) =>
          activeTab === "bus" ? (
            <BusTicketCard ticket={item} navigation={navigation} />
          ) : (
            <FlightTicketCard ticket={item} navigation={navigation} />
          )
        }
        ListHeaderComponent={
          <>
            {busLoading ? (
              <ActivityIndicator
                style={{ marginTop: 40 }}
                size="large"
                color="#1CB5B0"
              />
            ) : null}
            {busHint ? <Text style={styles.hint}>{busHint}</Text> : null}
          </>
        }
        ListEmptyComponent={
          !busLoading && !busHint ? (
            <Text style={styles.empty}>
              {selectedTravelDate
                ? `No trips for ${selectedTravelDate}. Try another date or re-seed the database.`
                : "No trips found. Pick source, destination, and date, or seed bus data in the backend."}
            </Text>
          ) : null
        }
      />
    </View>
  );
};

export default BusTicketSearchResultScreen;

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: "#ffff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 32,
    paddingBottom: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Poppins",
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 32,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  activeTab: { backgroundColor: "#1CB5B0" },
  tabText: { color: "#000000", fontWeight: "500" },
  activeText: { color: "#FFFFFF" },
  hint: {
    textAlign: "center",
    marginTop: 16,
    paddingHorizontal: 24,
    color: "#666",
    fontSize: 14,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
    fontSize: 15,
  },
});
