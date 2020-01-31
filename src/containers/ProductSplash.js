import React  from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { observer } from "mobx-react";

import { useStores } from "../store";
import { GET_PRODUCTS } from "../queries";
import EmptyResults from "../components/EmptyResults";
import Loader from "../components/Loader";
import ProductList from "../components/ProductList";

export default observer((props) => {

  const { brandStore } = useStores();

  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: {
      brandNames: brandStore.activeBrands,
    },
  });

  if (loading) return <Loader />;
  if (error) return <Text>{JSON.stringify(error)}</Text>;
  if (!data) return <EmptyResults />;

  return (
    <View style={{ paddingBottom: 150 }}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', height: 45, borderBottomWidth: 1, borderBottomColor: '#d1d1d1'}}>
        <TouchableOpacity 
          onPress={() =>
            props.navigation.replace("ProductFilter")
          }
          style={{
          borderRadius: 2,
          borderWidth: 1,
          borderColor: "#d1d1d1",
          paddingTop: 3,
          paddingBottom: 3,
          width: 75,
          marginLeft: 8,
          marginRight: 8
        }}>
          <Text style={{ textAlign: "center", color: "black" }}>Filter</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 10 }}>{data.products.length} Items</Text>
      </View>
      {
      (data.products.length === 0) ? 
        <EmptyResults /> : <ProductList products={data.products} navigation={props.navigation} />
      }
    </View>
  );

});