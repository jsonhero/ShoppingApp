import React from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Button } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { observer } from "mobx-react";
import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";

import { useStores } from '../store';
import { GET_PRODUCT_BRANDS } from "../queries";
import Loader from "../components/Loader";
import EmptyResults from "../components/EmptyResults";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

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

  const brandIsActive = brandStore.activeBrands.includes(name);

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
            opacity: brandIsActive ? 0 : 0.2,
            zIndex: 99999,
            borderRadius: 10,
          }}
        ></View>
        <Text
          style={{
            fontFamily: "work-sans-bold",
            fontSize: 32,
            zIndex: 99999,
            textAlign: "center",
            lineHeight: 150,
            color: brandIsActive ? "#67A9FA" : "white",
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
            borderWidth: brandIsActive ? 2 : null,
            borderColor: brandIsActive ? "#67A9FA" : null
          }}
        />
      </View>
    </TouchableOpacity>
  );
});

function ProductBrands(props) {
  const { data, loading, error } = useQuery(GET_PRODUCT_BRANDS);


  if (loading) return <Loader />;
  if (error) return <Text>{JSON.stringify(error)}</Text>;
  if (!data) return <EmptyResults />;
  
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
        <TouchableOpacity onPress={() => navigation.replace("Home")} style={{ marginLeft: 6 }}>
          <Ionicons name={"md-arrow-back"} size={25} color={"white"} />
        </TouchableOpacity>
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
