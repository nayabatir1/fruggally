import React, {memo} from 'react';
import {View, FlatList} from 'react-native';

import Divider from '../atoms/Divider';
import AddProduct from '../organisms/AddProduct';
import ProductCard from '../organisms/ProductCard';
import useStore from '../store/Store';

function Index(): JSX.Element {
  const {products, isRefetching, refetchProducts} = useStore();

  return (
    <>
      <View>
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ProductCard {...item} />}
          refreshing={isRefetching}
          onRefresh={refetchProducts}
          ItemSeparatorComponent={Divider}
        />
      </View>

      <AddProduct />
    </>
  );
}

export default memo(Index);
