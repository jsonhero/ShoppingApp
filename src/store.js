import React from "react";
import { createStore } from "./createStore";
import { useLocalStore } from "mobx-react";

import { FavoriteStore, BrandStore } from './stores';

const storeContext = React.createContext({
  favoriteStore: new FavoriteStore(),
  brandStore: new BrandStore(),
})

export const StoreProvider = ({ children }) => {
  const store = {
    favoriteStore: new FavoriteStore(),
    brandStore: new BrandStore(),
  }
  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

// export const useStore = () => {
//   const store = React.useContext(storeContext);
//   if (!store) {
//     throw new Error("useStore must be used within a StoreProvider.");
//   }
//   return store;
// };

export const useStores = () => React.useContext(storeContext)