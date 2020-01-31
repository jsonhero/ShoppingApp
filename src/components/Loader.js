import React from "react";
import { View, ActivityIndicator } from "react-native";

export default function Loader() {
  return (
    <View style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}