import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Store} from '../types/store';
import ParseFlipkartLink from '../utils/ParseFlipkartLink';
import {Product} from '../types/product';
import ParseAmazonLink from '../utils/ParseAmazonLink';

const useStore = create<Store, [['zustand/persist', unknown]]>(
  persist(
    (set, get) => ({
      products: [],
      isRefetching: false,
      toggleRefetching: () =>
        set(state => ({isRefetching: !state.isRefetching})),
      addProducts: product =>
        set(state => ({products: [...state.products, product]})),
      removeProduct: id =>
        set(state => ({
          products: state.products.filter(product => product.id !== id),
        })),
      refetchProducts: async () => {
        set(state => ({isRefetching: !state.isRefetching}));
        let {products} = get();

        for (let i = 0; i < products.length; i++) {
          let data: Product | void;
          switch (products[i].seller) {
            case 'flipkart':
              data = await ParseFlipkartLink(products[i].link);
              break;
            case 'amazon':
              data = await ParseAmazonLink(products[i].link);
          }

          if (data) {
            products.splice(i, 1, data);
          }
        }

        set(state => ({products, isRefetching: !state.isRefetching}));
      },
    }),
    {name: 'frugally', storage: createJSONStorage(() => AsyncStorage)},
  ),
);

export default useStore;
