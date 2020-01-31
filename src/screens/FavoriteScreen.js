import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { observer } from "mobx-react";


import { useStores } from "../store";
import { GET_FAVORITE_PRODUCTS } from "../queries";
import ProductList from "../components/ProductList";
import EmptyResults from "../components/EmptyResults";
import Loader from "../components/Loader";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    height: "100%",
  }
});

const FavoriteProducts = observer((props) => {
  const { favoriteStore } = useStores();

  const { data, loading, error } = useQuery(GET_FAVORITE_PRODUCTS, {
    variables: {
      productIds: favoriteStore.favoriteProducts,
    }
  });


  if (loading) return <Loader />;
  if (error) return <Text>{JSON.stringify(error)}</Text>;
  if (!data) return <EmptyResults />;

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
