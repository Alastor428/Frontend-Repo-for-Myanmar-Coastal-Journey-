import React, { useCallback, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import TourGuideCard from "@/components/TourGuide/TourGuideCard";
import { loadAuthSession } from "@/auth/authStorage";
import { listTourGuides, type TourGuideDto } from "@/api/tourGuideApi";

const defaultGuideImage = require("../../../../../../assets/tourguide/tourguidephoto.jpg");

type ResultParams = {
  startDate?: string;
  endDate?: string;
  beachName?: string;
};

function beachLabel(g: TourGuideDto): string {
  const b = g.beach;
  if (b && typeof b === "object" && b.beachName) return b.beachName;
  return "Myanmar";
}

const TourGuideResultScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { startDate, endDate, beachName = "" } =
    (route.params as ResultParams) || {};

  const [guides, setGuides] = useState<TourGuideDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const session = await loadAuthSession();
      if (!session) {
        setGuides([]);
        setError("Please sign in to browse tour guides.");
        return;
      }
      const res = await listTourGuides(session.accessToken, {
        page: 1,
        limit: 50,
        availableOnly: false,
        beachName: beachName.trim() || undefined,
        startDate: startDate,
        endDate: endDate,
      });
      setGuides(res.data ?? []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Could not load tour guides";
      setError(msg);
      setGuides([]);
    } finally {
      setLoading(false);
    }
  }, [beachName, startDate, endDate]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load])
  );

  const start = startDate ?? new Date().toISOString();
  const end = endDate ?? new Date(Date.now() + 86400000).toISOString();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <IconButton
            icon="chevron-left"
            size={32}
            iconColor="#000"
            onPress={() => navigation?.goBack?.()}
            style={styles.backButton}
          />
          <Text style={styles.headerTitle}>Tour Guide Results</Text>
        </View>

        {beachName.trim() && startDate && endDate ? (
          <Text style={styles.filterSummary}>
            {beachName.trim()} · {startDate.slice(0, 10)} → {endDate.slice(0, 10)}
            {"\n"}
            <Text style={styles.filterSub}>
              All guides at this beach; status is for your selected dates.
            </Text>
          </Text>
        ) : null}

        {loading ? (
          <ActivityIndicator style={{ marginTop: 24 }} size="large" />
        ) : error ? (
          <Text style={styles.hint}>{error}</Text>
        ) : guides.length === 0 ? (
          <Text style={styles.hint}>
            No tour guides for this beach yet. Create guides in Postman linked to
            this beach, or try another beach name.
          </Text>
        ) : null}

        <View style={styles.listContainer}>
          {!loading &&
            guides.map((tourGuide) => {
              const rangeStatus =
                tourGuide.rangeStatus ??
                (tourGuide.availability === "Busy" ? "Busy" : "Available");
              const canRent = rangeStatus === "Available";
              return (
                <TourGuideCard
                  key={tourGuide._id}
                  image={defaultGuideImage}
                  name={tourGuide.name}
                  location={beachLabel(tourGuide)}
                  phone={tourGuide.phone ?? "—"}
                  experience={`${tourGuide.experienceYears ?? 0} years experience`}
                  gender={tourGuide.gender ?? "—"}
                  languages={tourGuide.languages ?? []}
                  price={`${Number(tourGuide.pricePerDay).toLocaleString()} ${tourGuide.currency ?? "MMK"} / day`}
                  status={rangeStatus}
                  statusBusy={rangeStatus === "Busy"}
                  rentDisabled={!canRent}
                  onRentPress={
                    canRent
                      ? () =>
                          navigation?.navigate("TourGuidePaymentScreen", {
                            tourGuideId: tourGuide._id,
                            guideName: tourGuide.name,
                            guideLocation: beachLabel(tourGuide),
                            guidePhone: tourGuide.phone ?? "—",
                            guidePricePerDay: tourGuide.pricePerDay,
                            guideCurrency: tourGuide.currency ?? "MMK",
                            guideImage: defaultGuideImage,
                            startDate: start,
                            endDate: end,
                          })
                      : () =>
                          Alert.alert(
                            "Busy",
                            "This guide is not free for the dates you picked (booked or marked busy)."
                          )
                  }
                />
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default TourGuideResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 80,
    paddingTop: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    marginTop: 40,
    marginBottom: 16,
  },
  backButton: {
    margin: 0,
    padding: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#000",
  },
  filterSummary: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  filterSub: {
    fontSize: 11,
    color: "#888",
    marginTop: 4,
  },
  listContainer: {
    width: "100%",
    alignItems: "center",
  },
  hint: {
    textAlign: "center",
    marginHorizontal: 24,
    marginTop: 12,
    color: "#666",
    fontSize: 14,
  },
});
