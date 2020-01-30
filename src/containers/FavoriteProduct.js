import React from "react";
import { TouchableOpacity } from "react-native";
import { observer } from "mobx-react";

import { useStores } from "../store";
import FavoriteButton from "../components/FavoriteButton";

export default observer((props) => {
  const { favoriteStore } = useStores();
  const isFavorited = favoriteStore.favoriteProducts.includes(props.productId)

  return (
    <TouchableOpacity onPress={() => favoriteStore.toggleFavorite(props.productId)}>
      <FavoriteButton filled={isFavorited} />
    </TouchableOpacity>
  )
});