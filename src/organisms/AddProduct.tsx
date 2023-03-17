import React, {useCallback, useState, memo} from 'react';
import {TouchableOpacity} from 'react-native';
import EntypeIcons from 'react-native-vector-icons/Entypo';

import AddProductModal from '../molecules/AddProductModal';
import {Colors} from '../styles';

function AddProduct(): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => {
    setShowModal(p => !p);
  }, []);

  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
        <EntypeIcons name="add-to-list" size={25} color={Colors.WHITE} />
      </TouchableOpacity>

      <AddProductModal visible={showModal} toggleModal={toggleModal} />
    </>
  );
}

export default memo(AddProduct);
