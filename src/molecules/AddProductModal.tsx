import React, {memo, useCallback, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import ModalStructure from '../atoms/ModalStructure';
import useStore from '../store/Store';
import {Colors, Mixins, Typography} from '../styles';
import parseLink from '../utils/ParseLink';
import PrimaryButton from './PrimaryButton';

type Props = {visible: boolean; toggleModal: () => void};

function AddProductModal({visible, toggleModal}: Props): JSX.Element {
  const [text, setText] = useState('');

  const {addProducts} = useStore();

  const closeModal = useCallback(async () => {
    const product = await parseLink(text);

    toggleModal();

    addProducts(product);
  }, [addProducts, text, toggleModal]);

  return (
    <>
      <ModalStructure visible={visible} toggleModal={toggleModal}>
        <View style={style.container}>
          <Text style={style.label}>Enter product URL</Text>

          <TextInput
            style={style.textInput}
            // multiline
            numberOfLines={2}
            onChangeText={setText}
            value={text}
            placeholder="Product URL"
            placeholderTextColor={Colors.GRAY_MEDIUM}
          />

          <TouchableOpacity onPress={closeModal}>
            <PrimaryButton label="Submit" />
          </TouchableOpacity>
        </View>
      </ModalStructure>
    </>
  );
}

const style = StyleSheet.create({
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

export default memo(AddProductModal);
