import React, {memo, useCallback, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  FlipInXUp,
  FlipOutXDown,
  SlideInLeft,
} from 'react-native-reanimated';

import ModalStructure from '../atoms/ModalStructure';
import {Colors, Mixins, Typography} from '../styles';
import AddProduct from '../utils/AddProduct';
import GrayButton from './GrayButton';
import PrimaryButton from './PrimaryButton';

type Props = {visible: boolean; toggleModal: () => void};

function AddProductModal({visible, toggleModal}: Props): JSX.Element {
  const [productLink, setProductLink] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const fetchDetails = useCallback(async () => {
    setIsFetching(true);

    await AddProduct(productLink);

    setIsFetching(false);
    setProductLink('');
    toggleModal();
  }, [productLink, toggleModal]);

  return (
    <>
      <ModalStructure visible={visible} toggleModal={toggleModal}>
        <Animated.View entering={SlideInLeft} style={style.container}>
          <Text style={style.label}>Enter product URL</Text>

          <TextInput
            style={style.textInput}
            numberOfLines={2}
            onChangeText={setProductLink}
            value={productLink}
            placeholder="Product URL"
            placeholderTextColor={Colors.GRAY_MEDIUM}
          />

          {isFetching && (
            <Animated.View entering={FlipInXUp}>
              <GrayButton label="Fetching..." />
            </Animated.View>
          )}
          {isFetching || (
            <Animated.View exiting={FlipOutXDown}>
              <TouchableOpacity onPress={fetchDetails}>
                <PrimaryButton label="Submit" />
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>
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
