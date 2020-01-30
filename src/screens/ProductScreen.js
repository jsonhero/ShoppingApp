import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Button } from 'react-native-elements';
import { Rating } from "react-native-elements";
import FavoriteProduct from "../containers/FavoriteProduct";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  }
});

const GET_SINGLE_PRODUCT = gql`
  query getSingleProduct($productId: ID!) {
    product(where: {
      id: $productId
    }) {
      id
      name
      description
      thumbnail
      brandName
      brand {
        description
      }
    }
  }
`;


function ProductDisplay(props) {
  const { data, loading, error } = useQuery(GET_SINGLE_PRODUCT, {
    variables: {
      productId: props.productId,
    }
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{JSON.stringify(error)}</Text>;
  if (!data) return <Text>Not found</Text>;

  const { id, name, description, thumbnail, brandName, brand } = data.product

  return (
    <React.Fragment>
      <View style={{ position: "relative", display: "flex", width: "100%", height: 450, borderBottomColor: "#d1d1d1", borderBottomWidth: 1 }}>
        <View
          style={{ position: "absolute", top: 10, right: 10, zIndex: 99999 }}
        >
          <FavoriteProduct productId={id} />
        </View>
        <Image
          resizeMode="stretch"
          style={{ flex: 1  }}
          source={{ uri: thumbnail }}
        />
      </View>
      <ScrollView contentContainerStyle={{ display: "flex", alignItems: "center"}}>
        <View style={{ marginTop: 8, width: "90%" }}>
          <View style={{ borderBottomColor: "#d1d1d1", borderBottomWidth: 1, paddingBottom: 16, marginBottom: 8 }}>
            <Text style={{ fontFamily: "work-sans-bold", fontSize: 18, marginBottom: 6 }}>{name}</Text>
            <Text style={{ fontFamily: "work-sans-bold", fontSize: 16, color: "#1f4582", marginBottom: 6 }}>$25.99</Text>
            <Text style={{ fontFamily: "work-sans" }}>{description}</Text>
          </View>
          <View style={{ borderBottomColor: "#d1d1d1", borderBottomWidth: 1, paddingBottom: 16, marginBottom: 8 }}>
            <Text style={{ fontFamily: "work-sans-bold", fontSize: 16 }}>
              {brandName}
            </Text>
            <Text style={{ fontFamily: "work-sans" }}>{brand.description}</Text>
          </View>
          <View>
            <Text style={{ fontFamily: "work-sans-bold", fontSize: 16 }}>Reviews</Text>
            <View style={{ width: 75, paddingBottom: 6, paddingTop: 4 }}>
              <Rating
                showRating={false}
                showReadOnlyText={false}
                imageSize={15}
                readonly
              />
            </View>
          </View>
        </View>        
      </ScrollView>
      <View style={{ display: "flex", alignItems: "center", width: "100%", position: "fixed", bottom: 0, height: 60, paddingTop: 10, paddingBottom: 10, borderTopColor: "#d1d1d1", borderTopWidth: 1  }}>
        <Button buttonStyle={{ backgroundColor: "#3ea84c", width: "90%" }} title="Buy Now" />
      </View>
    </React.Fragment>
  );
}


export default class ProductScreen extends React.Component {
         static navigationOptions = {
           headerBackTitle: null,
         };
         render() {
           const { navigation } = this.props;
           console.log(navigation.getParam('id'), ":: ID")
           // should have dumby pic if not loaded
           return (
             <View style={styles.container}>
               <ProductDisplay productId={navigation.getParam("id")} />
             </View>
           );
         }
       }
