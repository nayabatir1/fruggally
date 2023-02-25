import React, {memo, useState} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';

import Divider from '../atoms/Divider';
import DeleteProductModal from '../molecules/DeleteProductModal';
import ProductCard from '../organisms/ProductCard';
import useStore from '../store/Store';
import {Colors} from '../styles';

function Index(): JSX.Element {
  const [productId, setProductId] = useState<null | string>(null);

  const {products, isRefetching, refetchProducts} = useStore();

  return (
    <>
      {products.length ? (
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
      ) : (
        <Text style={style.textCenter}>Add products to view them</Text>
      )}

      <DeleteProductModal
        productId={productId || ''}
        setProductId={setProductId}
      />
    </>
  );
}

const style = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
    color: Colors.WHITE,
  },
});

export default memo(Index);
