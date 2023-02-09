import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

import ModalStructure from '../atoms/ModalStructure';
import {Colors, Mixins, Typography} from '../styles';
import parseLink from '../utils/ParseLink';
import PrimaryButton from './PrimaryButton';

function AddProductModal(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');

  const toggleModal = useCallback(() => setShowModal(p => !p), []);

  const closeModal = useCallback(async () => {
    // setShowModal(false);
    const d = await parseLink(text);

    console.log(d);
  }, [text]);

  return (
    <>
      <ModalStructure visible={showModal} toggleModal={toggleModal}>
        <View style={style.container}>
          <Text style={style.label}>Enter product URL</Text>

          <TextInput
            style={style.textInput}
            multiline
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

      <TouchableOpacity style={style.plusIcon} onPress={toggleModal}>
        <AntIcon name="pluscircle" size={40} color="#1faeff" />
      </TouchableOpacity>
    </>
  );
}

const style = StyleSheet.create({
  plusIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
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

export default AddProductModal;
