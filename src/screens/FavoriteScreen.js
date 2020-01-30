import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { observer } from "mobx-react";


import { useStores } from "../store";
import ProductList from "../components/ProductList";
import EmptyResults from "../components/EmptyResults";


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  }
});

const GET_FAVORITE_PRODUCTS = gql`
  query getFavoriteProducts($productIds: [ID!]) {
    products(where: {
      id_in: $productIds
    }) {
      id
      name
      thumbnail
      brandName
    }
  }
`;


const FavoriteProducts = observer((props) => {
  const { favoriteStore } = useStores();

  const { data, loading, error } = useQuery(GET_FAVORITE_PRODUCTS, {
    variables: {
      productIds: favoriteStore.favoriteProducts,
    }
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{JSON.stringify(error)}</Text>;

  if (data.products.length === 0) {
    return <EmptyResults />
  }

  return (
    <ProductList products={data.products} navigation={props.navigation} />
  );

});


export default class FavoriteScreen extends React.Component {
  static navigationOptions = {
    headerBackTitle: null,
  };
  render() {
    return (
      <View style={styles.container}>
        <FavoriteProducts {...this.props} />
      </View>
    );
  }
}
