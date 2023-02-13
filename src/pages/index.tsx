import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import AddProduct from '../organisms/AddProduct';
import useStore from '../store/Store';
import {Colors} from '../styles';

function Index(): JSX.Element {
  const {products} = useStore();

  return (
    <>
      <View>
        {products.map(product => (
          <Text style={style.black} key={product.id}>
            {product.name}
          </Text>
        ))}
      </View>

      <AddProduct />
    </>
  );
}

const style = StyleSheet.create({
  black: {color: Colors.BLACK},
});

export default memo(Index);
