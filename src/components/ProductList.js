import React from "react";
import { StyleSheet, FlatList, View } from "react-native";

import ProductItem from "./ProductItem";

const styles = StyleSheet.create({
  listView: {
    marginTop: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnWrapper: {
    marginTop: 20,
    width: 360,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default function ProductList({ navigation, products }) {
  return (
    <View style={styles.listView}>
      <FlatList
        columnWrapperStyle={styles.columnWrapper}
        numColumns={2}
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductItem
            id={item.id}
            name={item.name}
            description={item.description}
            imageUrl={item.thumbnail}
            price={"$25.99"}
            navigation={navigation}
            brandName={item.brandName}
          />
        )}
      />
    </View>
  );
}
