import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

import Divider from '../atoms/Divider';
import useOrientation from '../hooks/Orientation';
import DeleteProductModal from '../molecules/DeleteProductModal';
import ProductCardLandscape from '../organisms/ProductCardLandscape';
import ProductCardPortrait from '../organisms/ProductCardPortrait';
import useStore from '../store/Store';
import {Colors} from '../styles';
import {Product} from '../types/product';
import {Intent} from '../types/shareIntent';
import AddProduct from '../utils/AddProduct';

function Index(): JSX.Element {
  const [productId, setProductId] = useState<null | string>(null);

  const {products, isRefetching, refetchProducts} = useStore();

  const orientation = useOrientation();

  useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles(
      async (files: Array<Intent>) => {
        const [{text}] = files;

        if (text) {
          await AddProduct(text);
        }

        ReceiveSharingIntent.clearReceivedFiles();
      },
      (_error: Error) => {
        // console.log(error);
      },
    );
  }, []);

  const renderItem = useCallback(
    ({item}: {item: Product}) => {
      if (orientation === 'PORTRAIT') {
        return <ProductCardPortrait {...item} setProductId={setProductId} />;
      } else {
        return <ProductCardLandscape {...item} setProductId={setProductId} />;
      }
    },
    [orientation],
  );

  return (
    <>
      {products.length ? (
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          refreshing={isRefetching}
          onRefresh={refetchProducts}
          ItemSeparatorComponent={Divider}
          horizontal={orientation === 'LANDSCAPE'}
          removeClippedSubviews
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
