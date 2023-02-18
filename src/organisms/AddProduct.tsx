import React, {useCallback, useState, memo} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

import AddProductModal from '../molecules/AddProductModal';
import {Colors, Mixins, Typography} from '../styles';

function AddProduct(): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => setShowModal(p => !p), []);

  return (
    <>
      <AddProductModal visible={showModal} toggleModal={toggleModal} />

      <TouchableOpacity style={style.plusIcon} onPress={toggleModal}>
        <AntIcon name="pluscircle" size={50} color={Colors.SECONDARY} />
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
    backgroundColor: Colors.WHITE,
    width: Dimensions.get('window').width * 0.95,
    borderRadius: 10,
    ...Mixins.padding(20),
  },
  label: {
    color: Colors.BLACK,
    ...Typography.FONT_REGULAR,
  },
  textInput: {
    color: Colors.BLACK,
    borderWidth: 1,
    borderRadius: 10,
    ...Mixins.margin(15, 0),
  },
});

export default memo(AddProduct);
