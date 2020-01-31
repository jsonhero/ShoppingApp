import React from "react";
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

export const useStores = () => React.useContext(storeContext)