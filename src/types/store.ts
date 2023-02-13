import {Product} from './product';

export type Store = {
  products: Array<Product>;
  addProducts: (arg0: Product) => void;
  removeProduct: (arg0: string) => void;
};
