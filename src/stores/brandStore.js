import { observable, action, decorate } from "mobx";


class BrandStore {
   activeBrands = ['Alala', 'margaux', 'Social Paint', 'Hint', 'Margaux'];

  isBrandActive(brandName) {
    return this.activeBrands.includes(brandName);
  }

  addBrand(brandName) {
    this.activeBrands.push(brandName);
  }

  removeBrand(brandName) {
    this.activeBrands = this.activeBrands.filter(
      bName => bName !== brandName
    );
  }

  toggleBrand(brandName) {
    if (this.isBrandActive(brandName)) {
      this.removeBrand(brandName);
    } else {
      this.addBrand(brandName);
    }
  }
}

export default decorate(BrandStore, {
  activeBrands: observable,
  isBrandActive: action,
  addBrand: action,
  removeBrand: action,
  toggleBrand: action,
});
