import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Store} from '../types/store';

const useStore = create<Store, [['zustand/persist', unknown]]>(
  persist(
    (set, _get) => ({
      products: [],
      addProducts: product =>
        set(state => ({products: [...state.products, product]})),
      removeProduct: id =>
        set(state => ({
          products: state.products.filter(product => product.id !== id),
        })),
    }),
    {name: 'frugally', storage: createJSONStorage(() => AsyncStorage)},
  ),
);

export default useStore;
