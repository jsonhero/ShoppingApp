export function createStore() {
  return {
    favoriteProducts: [],
    addFavorite(productId) {
      this.favoriteProducts.push(productId);
    },
    removeFavorite(productId) {
      this.favoriteProducts = this.favoriteProducts.filter(
        pId => pId !== productId
      );
    },
    toggleFavorite(productId) {
      if (this.favoriteProducts.includes(productId)) {
        this.removeFavorite(productId);
      } else {
        this.addFavorite(productId);
      }
    },
    
    // Would normally load this from an API for initial state
    activeBrands: ['Alala', 'margaux', 'Social Paint', 'Hint', 'Margaux'],
    addBrand(brandName) {
      this.activeBrands.push(brandName);
    },
    removeBrand(brandName) {
      this.activeBrands = this.activeBrands.filter(
        bName => bName !== brandName
      );
    },
    toggleBrand(brandName) {
      if (this.activeBrands.includes(brandName)) {
        this.removeBrand(brandName);
      } else {
        this.addBrand(brandName);
      }
    }
  }
}