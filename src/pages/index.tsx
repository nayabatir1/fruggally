import React, {memo} from 'react';
import {FlatList} from 'react-native';

import Divider from '../atoms/Divider';
import ProductCard from '../organisms/ProductCard';
import useStore from '../store/Store';

function Index(): JSX.Element {
  const {products, isRefetching, refetchProducts} = useStore();

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({item}) => <ProductCard {...item} />}
      refreshing={isRefetching}
      onRefresh={refetchProducts}
      ItemSeparatorComponent={Divider}
    />
  );
}

export default memo(Index);
