import {create} from 'zustand';

import {Store} from '../types/store';

const useStore = create<Store>(set => ({
  products: [],
  addProducts: product =>
    set(state => ({products: [...state.products, product]})),
  removeProduct: id =>
    set(state => ({
      products: state.products.filter(product => product.id !== id),
    })),
}));

export default useStore;
