import React, {memo, useCallback} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import ModalStructure from '../atoms/ModalStructure';
import useStore from '../store/Store';
import {Colors, Mixins, Typography} from '../styles';
import DangerButton from './DangerButton';
import GrayButton from './GrayButton';

type Props = {
  productId: string;
  setProductId: (arg0: string | null) => void;
};

function DeleteProductModal({productId, setProductId}: Props): JSX.Element {
  const closeModal = useCallback(() => setProductId(null), [setProductId]);

  const {removeProduct} = useStore();

  const remove = useCallback(() => {
    removeProduct(productId);
    closeModal();
  }, [closeModal, productId, removeProduct]);

  return (
    <ModalStructure toggleModal={closeModal} visible={!!productId}>
      <View style={style.wrapper}>
        <Octicons name="trash" size={50} color={Colors.ALERT} />

        <Text style={style.title}>Are you sure?</Text>

        <Text style={style.message}>
          Do you really want to remove this product
        </Text>

        <View style={style.buttonWrapper}>
          <TouchableOpacity style={style.button} onPress={closeModal}>
            <GrayButton label="No" />
          </TouchableOpacity>

          <TouchableOpacity style={style.button} onPress={remove}>
            <DangerButton label="Yes" />
          </TouchableOpacity>
        </View>
      </View>
    </ModalStructure>
  );
}

const style = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.WHITE,
    width: Dimensions.get('window').width * 0.95,
    borderRadius: 5,
    alignItems: 'center',
    ...Mixins.padding(20, 10),
  },
  title: {
    fontSize: Typography.FONT_SIZE_20,
    color: Colors.BLACK,
    textAlign: 'center',
    ...Mixins.margin(10, 0),
  },
  darkText: {
    color: Colors.BLACK,
  },
  message: {
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BLACK,
    marginBottom: 40,
  },
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: '30%',
  },
});

export default memo(DeleteProductModal);
