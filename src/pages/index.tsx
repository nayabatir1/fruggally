import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

import Divider from '../atoms/Divider';
import ListEmptyComponent from '../atoms/ListEmptyComponent';
import useOrientation from '../hooks/Orientation';
import DeleteProductModal from '../molecules/DeleteProductModal';
import ProductCardLandscape from '../organisms/ProductCardLandscape';
import ProductCardPortrait from '../organisms/ProductCardPortrait';
import useStore from '../store/Store';
import {Product} from '../types/product';
import {Intent} from '../types/shareIntent';
import AddProduct from '../utils/AddProduct';

function Index(): JSX.Element {
  const [productId, setProductId] = useState<null | string>(null);

  const {products, isRefetching, refetchProducts, toggleRefetching} =
    useStore();

  const orientation = useOrientation();

  useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles(
      async (files: Array<Intent>) => {
        toggleRefetching();
        const [{text}] = files;

        console.log({text});

        if (text) {
          await AddProduct(text);
        }
        toggleRefetching();
        ReceiveSharingIntent.clearReceivedFiles();
      },
      (_error: Error) => {
        // console.log(error);
      },
    );
  }, [toggleRefetching]);

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
      <FlatList
        data={products}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        refreshing={isRefetching}
        onRefresh={refetchProducts}
        ItemSeparatorComponent={Divider}
        horizontal={orientation === 'LANDSCAPE'}
        removeClippedSubviews
      />

      <DeleteProductModal
        productId={productId || ''}
        setProductId={setProductId}
      />
    </>
  );
}

export default memo(Index);
