import React, {useCallback, useState, memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

import AddProductModal from '../molecules/AddProductModal';
import {Colors} from '../styles';

function AddProduct(): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => setShowModal(p => !p), []);

  return (
    <>
      <AddProductModal visible={showModal} toggleModal={toggleModal} />

      <TouchableOpacity style={style.plusIcon} onPress={toggleModal}>
        <AntIcon name="pluscircle" size={50} color={Colors.PATRICKS_BLUE} />
      </TouchableOpacity>
    </>
  );
}

const style = StyleSheet.create({
  plusIcon: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});

export default memo(AddProduct);
