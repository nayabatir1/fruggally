import React, {memo, useState} from 'react';
import {FlatList} from 'react-native';

import Divider from '../atoms/Divider';
import DeleteProductModal from '../molecules/DeleteProductModal';
import ProductCard from '../organisms/ProductCard';
import useStore from '../store/Store';

function Index(): JSX.Element {
  const [productId, setProductId] = useState<null | string>(null);

  console.log(productId);

  const {products, isRefetching, refetchProducts} = useStore();

  return (
    <>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ProductCard {...item} setProductId={setProductId} />
        )}
        refreshing={isRefetching}
        onRefresh={refetchProducts}
        ItemSeparatorComponent={Divider}
      />

      <DeleteProductModal
        productId={productId || ''}
        setProductId={setProductId}
      />
    </>
  );
}

export default memo(Index);
