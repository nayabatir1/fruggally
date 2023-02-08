import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

import ModalStructure from '../atoms/ModalStructure';

function AddProductModal(): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => setShowModal(p => !p), []);

  return (
    <>
      <ModalStructure visible={showModal} toggleModal={toggleModal}>
        <Text>testing</Text>
      </ModalStructure>
      <TouchableOpacity style={styles.plusIcon} onPress={toggleModal}>
        <AntIcon name="pluscircle" size={40} color="#1faeff" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  plusIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default AddProductModal;
