import React, {memo} from 'react';
import {View} from 'react-native';

import AddProduct from '../organisms/AddProduct';
import ProductCard from '../organisms/ProductCard';
import useStore from '../store/Store';

function Index(): JSX.Element {
  const {products} = useStore();

  return (
    <>
      <View>
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </View>

      <AddProduct />
    </>
  );
}

export default memo(Index);
