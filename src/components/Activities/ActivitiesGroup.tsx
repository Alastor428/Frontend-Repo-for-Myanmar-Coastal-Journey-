import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageSourcePropType,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const HORIZONTAL_PADDING = 32;
const GAP = 16;
const ITEMS_PER_ROW = 4;
const ITEM_WIDTH =
  (width - HORIZONTAL_PADDING * 2 - GAP * (ITEMS_PER_ROW - 1)) / ITEMS_PER_ROW;

export interface ActivityItem {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

interface ActivitiesGroupProps {
  activities: ActivityItem[];
  onActivityPress?: (activity: ActivityItem) => void;
}

const ActivityCard: React.FC<{
  activity: ActivityItem;
  onPress?: () => void;
}> = ({ activity, onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.item, pressed && styles.pressed]}
  >
    <View style={styles.iconButton}>
      <Image
        source={activity.image}
        style={styles.iconImage}
        resizeMode="contain"
      />
    </View>
    <Text style={styles.iconLabel} numberOfLines={1}>
      {activity.title}
    </Text>
  </Pressable>
);

const ActivitiesGroup: React.FC<ActivitiesGroupProps> = ({
  activities,
  onActivityPress,
}) => {
  const rows: ActivityItem[][] = [];
  for (let i = 0; i < activities.length; i += ITEMS_PER_ROW) {
    rows.push(activities.slice(i, i + ITEMS_PER_ROW));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Activities</Text>
      <View style={styles.grid}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onPress={() => onActivityPress?.(activity)}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default ActivitiesGroup;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_PADDING,
    // marginTop: 24,
    marginBottom: 24,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins",
    marginBottom: 16,
  },
  grid: {
    gap: GAP,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: GAP,
  },
  item: {
    width: ITEM_WIDTH,
    alignItems: "center",
    gap: 8,
  },
  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.96 }],
  },
  iconButton: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: 12,
    padding: 8,
    backgroundColor: "#E0F0F0",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  iconImage: {
    width: 36,
    height: 36,
  },
  iconLabel: {
    fontFamily: "Poppins",
    fontSize: 11,
    fontWeight: "400",
    color: "#1E1E1E",
    textAlign: "center",
  },
});
