import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { IconButton } from "react-native-paper";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

import PackagePlan from "@/components/Package/PackageCard";
import { loadAuthSession } from "@/auth/authStorage";
import {
  searchTravelPackages,
  type TravelPackageDto,
  cityNameFromTravelPackage,
  beachNameFromTravelPackage,
} from "@/api/packageApi";

const PLACEHOLDER_IMAGE = require("../../../../../../assets/Ngapali/NP1.png");

const PackageResultScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const from = (route.params?.from as string | undefined)?.trim();
  const to = (route.params?.to as string | undefined)?.trim();
  const departOnDate = (route.params?.departOnDate as string | undefined)?.trim();

  const [rows, setRows] = useState<TravelPackageDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!from || !to || !departOnDate) {
      setRows([]);
      setHint("Pick source, destination, and date first.");
      return;
    }

    setLoading(true);
    setHint(null);
    try {
      const session = await loadAuthSession();
      if (!session) {
        setRows([]);
        setHint("Sign in to search travel packages.");
        return;
      }

      const res = await searchTravelPackages(session.accessToken, {
        from,
        to,
        departOnDate,
        page: 1,
        limit: 20,
      });

      setRows(res.data ?? []);
      if (!res.data?.length) {
        setHint("No packages found for this route/date.");
      }
    } catch (e: unknown) {
      setRows([]);
      setHint(e instanceof Error ? e.message : "Could not load packages.");
    } finally {
      setLoading(false);
    }
  }, [from, to, departOnDate]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load])
  );

  const renderDuration = (p: TravelPackageDto) => {
    const nights = Number(p.hotel?.nights ?? 1);
    const days = nights + 1;
    return `${days} Days ${nights} Night`;
  };

  const renderDescription = (p: TravelPackageDto) => {
    const fromCity = cityNameFromTravelPackage(p);
    const toBeach = beachNameFromTravelPackage(p);
    const hotelName =
      p.hotel?.hotel && typeof p.hotel.hotel === "object" && "hotelName" in p.hotel.hotel
        ? String((p.hotel.hotel as any).hotelName ?? "Hotel")
        : "Hotel";
    const busName =
      p.busTicket?.ticket && typeof p.busTicket.ticket === "object" && "ticketName" in p.busTicket.ticket
        ? String((p.busTicket.ticket as any).ticketName ?? "Bus Ticket")
        : "Bus Ticket";
    return `From ${fromCity} to ${toBeach}. Bus: ${busName}. Hotel: ${hotelName}.`;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          width: "100%",
          paddingBottom: 80,
          paddingTop: 24,
        }}
      >
        {/* Header */}
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
              onPress={() => navigation.goBack()}
              style={{
                margin: 0,
                padding: 0,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
            />

            <Text style={styles.headerTitle}>Package Results</Text>
          </View>
        </View>

        {/* Package List */}
        <View style={{ width: "100%", paddingHorizontal: 32 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#1CB5B0" style={{ marginTop: 32 }} />
          ) : hint ? (
            <Text style={styles.hint}>{hint}</Text>
          ) : null}

          {!loading && rows.map((p, idx) => {
            const toBeach = beachNameFromTravelPackage(p);
            const image =
              idx % 2 === 0
                ? PLACEHOLDER_IMAGE
                : require("../../../../../../assets/Ngapali/NP2.png");

            return (
              <PackagePlan
                key={p._id}
                packageId={p._id}
                image={image}
                location={`${toBeach}, Myanmar`}
                title={p.packageName}
                subtitle={`${cityNameFromTravelPackage(p)} → ${toBeach}`}
                description={renderDescription(p)}
                price={`${Math.round(p.pricePerPerson).toLocaleString()} MMK`}
                duration={renderDuration(p)}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default PackageResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 24,
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#000",
  },

  hint: {
    marginTop: 24,
    textAlign: "center",
    color: "#888",
  },
});
