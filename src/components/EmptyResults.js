import React from "react";
import { Text, View } from "react-native";


export default function EmptyResults() {
  return (
    <View style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontFamily: "work-sans", fontSize: 24 }}>No results.</Text>
    </View>
  );
}

