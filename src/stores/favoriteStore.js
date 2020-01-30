import { observable, action, decorate } from "mobx";


class FavoriteStore {
  favoriteProducts = [] 

  isProductFavorited(productId) {
    return this.favoriteProducts.includes(productId);
  }

  addFavorite(productId) {
    this.favoriteProducts.push(productId);
  }

  removeFavorite(productId) {
    this.favoriteProducts = this.favoriteProducts.filter(
      pId => pId !== productId
    );
  }

  toggleFavorite(productId) {
    if (this.isProductFavorited(productId)) {
      this.removeFavorite(productId);
    } else {
      this.addFavorite(productId);
    }
  }
}

export default decorate(FavoriteStore, {
  favoriteProducts: observable,
  isProductFavorited: action,
  addFavorite: action,
  removeFavorite: action,
  toggleFavorite: action,
});