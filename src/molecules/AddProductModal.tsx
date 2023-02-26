import React, {memo, useCallback, useState} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';

import ModalStructure from '../atoms/ModalStructure';
import useStore from '../store/Store';
import {Colors, Mixins, Typography} from '../styles';
import ParseAmazonLink from '../utils/ParseAmazonLink';
import parseFlipkartLink from '../utils/ParseFlipkartLink';
import GrayButton from './GrayButton';
import PrimaryButton from './PrimaryButton';

type Props = {visible: boolean; toggleModal: () => void};

function AddProductModal({visible, toggleModal}: Props): JSX.Element {
  const [productLink, setProductLink] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const {addProducts} = useStore();

  const closeModal = useCallback(async () => {
    setIsFetching(true);
    let type = 'flipkart';

    if (!productLink.includes('flipkart')) {
      type = 'amazon';
    }

    let product;

    const [link] = productLink.match(/https:.+/gm) || [''];

    if (!link) {
      setIsFetching(false);
      Alert.alert('Invalid link', "Check the link you've provided");
      return;
    }

    setProductLink(link);

    switch (type) {
      case 'flipkart':
        product = await parseFlipkartLink(link);
        break;

      case 'amazon':
        product = await ParseAmazonLink(link);
    }

    setProductLink('');

    if (product) {
      Vibration.vibrate([100, 200, 100, 200]);
      addProducts(product);
    }
    setIsFetching(false);
    toggleModal();
  }, [addProducts, productLink, toggleModal]);

  return (
    <>
      <ModalStructure visible={visible} toggleModal={toggleModal}>
        <View style={style.container}>
          <Text style={style.label}>Enter product URL</Text>

          <TextInput
            style={style.textInput}
            numberOfLines={2}
            onChangeText={setProductLink}
            value={productLink}
            placeholder="Product URL"
            placeholderTextColor={Colors.GRAY_MEDIUM}
          />

          {isFetching ? (
            <GrayButton label="Fetching..." />
          ) : (
            <TouchableOpacity onPress={closeModal}>
              <PrimaryButton label="Submit" />
            </TouchableOpacity>
          )}
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
