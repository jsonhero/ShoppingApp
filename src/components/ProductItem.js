import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { Rating } from "react-native-elements";

import ProductFavorite from "../containers/FavoriteProduct";

const styles = StyleSheet.create({
  productItem: {
    width: 175,
    marginBottom: 55,
  },
  productText: {
    fontFamily: 'gothic-a1',
    marginTop: 15,
    fontWeight: 'bold',
  },
});


export default function ProductItem({ id, name, price, description, imageUrl, navigation, brandName }) {
  return (
    <View style={styles.productItem}>
      <View
        style={{
          height: 310,
          width: "100%",
          position: "relative"
        }}
      >
        <View
          style={{ position: "absolute", top: 10, right: 10, zIndex: 99999 }}
        >
          <ProductFavorite productId={id} />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Product", {
              id
            })
          }
        >
          <Image
            style={{
              height: "100%",
              width: "100%"
            }}
            source={{ uri: imageUrl }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.productText}>
        <Text
          style={{ fontFamily: "work-sans-bold", textTransform: "capitalize" }}
        >
          {brandName}
        </Text>
        <Text style={{ fontFamily: "work-sans" }}>{name}</Text>
        <View style={{ width: 75, paddingBottom: 6, paddingTop: 4 }}>
          <Rating
            showRating={false}
            showReadOnlyText={false}
            imageSize={15}
            readonly
          />
        </View>
        <Text style={{ fontFamily: "work-sans-bold", fontSize: 16 }}>
          {price}
        </Text>
      </View>
    </View>
  );
}