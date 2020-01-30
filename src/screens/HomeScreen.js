import React from "react";
import { StyleSheet, Button, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProductSplash from "../containers/ProductSplash";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
});

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => (
        <Button onPress={() => alert("This is a button!")} title="Info" />
      ),
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('Favorites')}>
          <Ionicons name={"md-heart"} size={25} color={"white"} />
        </TouchableOpacity>
      ),
    }
  };
  render() {
    return (
      <View style={styles.container}>
        {/* <Button
          onPress={() => props.navigation.navigate("Other")}
          title="Goto Other"
        /> */}
        <ProductSplash {...this.props} />
      </View>
    );
  }
}