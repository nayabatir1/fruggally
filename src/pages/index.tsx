import React, {memo} from 'react';
import {View, FlatList, Text} from 'react-native';

import Divider from '../atoms/Divider';
import AddProduct from '../organisms/AddProduct';
import ProductCard from '../organisms/ProductCard';
import useStore from '../store/Store';

function Index(): JSX.Element {
  const {products, isRefetching} = useStore();

  return (
    <>
      <View>
        {isRefetching ? (
          <Text>Refetching products</Text>
        ) : (
          <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={({item}) => <ProductCard {...item} />}
            ItemSeparatorComponent={Divider}
          />
        )}
      </View>

      <AddProduct />
    </>
  );
}

export default memo(Index);
