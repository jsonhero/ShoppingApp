import React from 'react';
import { Text } from 'react-native';
import { ApolloProvider } from "@apollo/react-hooks";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as Font from "expo-font";

import { client } from "./src/apolloClient";

import HomeScreen from "./src/screens/HomeScreen";
import ProductScreen from "./src/screens/ProductScreen";
import ProductFilterScreen from "./src/screens/ProductFilterScreen";
import FavoriteScreen from "./src/screens/FavoriteScreen";

import { StoreProvider } from "./src/store"; 


const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Product: ProductScreen,
    ProductFilter: ProductFilterScreen,
    Favorites: FavoriteScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => {
      return {
        unmountInactiveScreens: true,
        headerTitle: () => (
          <Text style={{ fontSize: 20, color: "white", fontFamily: "work-sans" }}>
            ShopMate
          </Text>
        ),
        headerStyle: {
          backgroundColor: "#026ef2",
        },
        headerTitleStyle: {
          fontWeight: "bold"
        }
      };
    },
  },
);


const AppContainer = createAppContainer(AppNavigator);


export default class App extends React.Component {
  state = {
    fontLoaded: false,
  }
  async componentDidMount() {
    await Font.loadAsync({
      "work-sans": require("./assets/fonts/Work_Sans/WorkSans-Regular.ttf"),
      "work-sans-bold": require("./assets/fonts/Work_Sans/WorkSans-Medium.ttf"),
    });

    this.setState({ fontLoaded: true })
  }
  render() {
    // Do not render app until fonts are loaded.
    return this.state.fontLoaded ? (
      <StoreProvider>
        <ApolloProvider client={client}>
          <AppContainer />
        </ApolloProvider>
      </StoreProvider>
    ) : null;
  }
}