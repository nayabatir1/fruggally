import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import AddProductModal from '../molecules/AddProductModal';

function Header(): JSX.Element {
  return (
    <>
      <View style={styles.wrapper} />
      <AddProductModal />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  plusIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default memo(Header);
