import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Picker, FlatList, TouchableOpacity, Button } from "react-native";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { observer } from "mobx-react";
import _ from "lodash";

import { useStores } from '../store';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const GET_PRODUCT_BRANDS = gql`
  query getProductBrands {
    products {
      brandName
      brand {
        banner
      }
    }
  }
`;


function createBrandArray(productBrandArray) {
  const brandMap = new Map();

  for (let i = 0; i < productBrandArray.length; i++) {
    let product = productBrandArray[i];
    if (!brandMap.has(product.brandName)) {
      brandMap.set(product.brandName, product.brand)
    };
  }

  const brandArray = [];
  for (let [key, value] of brandMap.entries()) {
    brandArray.push({ name: key, bannerImageSrc: _.get(value, 'banner', null)})
  }
  return brandArray;
}


const BrandSplash = observer(({ name, imageSrc }) => {
  const { brandStore } = useStores();

  console.log(brandStore, 'Store');
  const val = brandStore.isBrandActive(name);

  return (
    <TouchableOpacity onPress={() => brandStore.toggleBrand(name)}>
      <View
        style={{
          width: 350,
          height: 150,
          marginBottom: 8,
          position: "relative"
        }}
      >
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#000000",
            opacity: "0.2",
            zIndex: 99999,
            borderRadius: 10,
            display: val ? "normal" : "none"
          }}
        ></View>
        <Text
          style={{
            fontFamily: "work-sans-bold",
            fontSize: 32,
            zIndex: 99999,
            textAlign: "center",
            lineHeight: 150,
            color: val ? "#67A9FA" : "white",
          }}
        >
          {name}
        </Text>
        <Image
          source={{ uri: imageSrc }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
            position: "absolute",
            borderWidth: val ? 2 : null,
            borderColor: val ? "#67A9FA" : null
          }}
        />
      </View>
    </TouchableOpacity>
  );
});

function ProductBrands(props) {
  const { data, loading, error } = useQuery(GET_PRODUCT_BRANDS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{JSON.stringify(error)}</Text>;
  if (!data) return <Text>Not found</Text>;

  // const { id, name, description, thumbnail } = data.products;
  const brandArray = createBrandArray(data.products);

  return (
    <View>
      <Text style={{ fontFamily: "work-sans", textAlign: "center", fontSize: 20, marginBottom: 8, marginTop: 8 }}>Select Brands</Text>
      <FlatList
        data={brandArray}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <BrandSplash name={item.name} imageSrc={item.bannerImageSrc} />
        )}
      />
    </View>
  );
}

export default class ProductFilterScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerBackTitle: null,
      headerLeft: () => (
        <Button
          title="< Back"
          color="white"
          onPress={() => navigation.replace("Home")}
        />
      ),
    }
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ProductBrands />
      </View>
    );
  }
}
