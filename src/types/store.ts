import {Product} from './product';

export type Store = {
  products: Array<Product>;
  isRefetching: boolean;
  addProducts: (arg0: Product) => void;
  toggleRefetching: () => void;
  removeProduct: (arg0: string) => void;
  refetchProducts: () => void;
};
