import React, {useCallback, useState, memo} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

import AddProductModal from '../molecules/AddProductModal';
import {Mixins, Typography} from '../styles';

function AddProduct(): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => setShowModal(p => !p), []);

  return (
    <>
      <AddProductModal visible={showModal} toggleModal={toggleModal} />

      <TouchableOpacity style={style.plusIcon} onPress={toggleModal}>
        <AntIcon name="pluscircle" size={50} color="#1faeff" />
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
  container: {
    backgroundColor: '#fff',
    width: Dimensions.get('window').width * 0.95,
    borderRadius: 10,
    ...Mixins.padding(20),
  },
  label: {
    color: '#000',
    ...Typography.FONT_REGULAR,
  },
  textInput: {
    color: '#000',
    borderWidth: 1,
    borderRadius: 10,
    ...Mixins.margin(15, 0),
  },
});

export default memo(AddProduct);
