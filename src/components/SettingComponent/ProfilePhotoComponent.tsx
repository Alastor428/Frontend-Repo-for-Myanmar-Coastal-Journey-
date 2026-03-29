import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";

import { ImageSourcePropType } from "react-native";

interface ProfilePhotoComponentProps {
  imageUrl: ImageSourcePropType;
  onPress?: () => void;
}
const ProfilePhotoComponent: React.FC<ProfilePhotoComponentProps> = ({
  imageUrl,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <Card style={styles.card}>
      <View style={styles.container}>
        <Image source={imageUrl} style={styles.image} />
      </View> 
      {/* <View style={{ alignItems: "center", justifyContent: "center", padding: 10 }}>
        <Text variant="titleMedium">{userName}</Text>
      </View> */}
    </Card>
    </TouchableOpacity>
  );
};

export default ProfilePhotoComponent;

const styles = StyleSheet.create({
  card: {
    margin: 0,
    borderRadius: 50,
    width: 100,
  },
  container: {

    alignItems: "center",
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});