import React, {memo, useMemo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import AmazonIcon from '../atoms/AmazonIcon';
import FlipkartIcon from '../atoms/FlipkartIcon';
import {Colors, Mixins, Typography} from '../styles';
import {margin} from '../styles/mixins';
import {Product} from '../types/product';

interface Props extends Product {}

function ProductCard({name, seller, image, price}: Props): JSX.Element {
  const RandomValue = useMemo(() => Math.round(Math.random() * 9), []);

  const memoizedStyle = useMemo(() => style(RandomValue), [RandomValue]);

  return (
    <View style={memoizedStyle.container}>
      <View
        style={StyleSheet.flatten([memoizedStyle.icon, memoizedStyle.seller])}>
        {seller === 'flipkart' ? (
          <FlipkartIcon size={20} />
        ) : (
          <AmazonIcon size={20} />
        )}
      </View>

      <View
        style={StyleSheet.flatten([memoizedStyle.icon, memoizedStyle.link])}>
        <EvilIcons name="external-link" color={Colors.BLACK} size={30} />
      </View>

      <Image
        style={memoizedStyle.img}
        source={{uri: image}}
        progressiveRenderingEnabled
        resizeMode="contain"
        alt="product image"
      />

      <Text style={memoizedStyle.name}>{name}</Text>

      <View style={memoizedStyle.priceWrapper}>
        <Text style={memoizedStyle.currency}>{price.slice(0, 1)}</Text>
        <Text style={memoizedStyle.price}>{price.slice(1)}</Text>
      </View>
    </View>
  );
}

const style = (index: number) =>
  StyleSheet.create({
    container: {
      borderRadius: 10,
      backgroundColor: Colors.MILK,
      ...Mixins.padding(10),
    },
    icon: {
      position: 'absolute',
      top: 10,
    },
    seller: {
      left: 10,
    },
    link: {
      right: 10,
    },
    img: {
      height: 'auto',
      width: '100%',
      aspectRatio: 2 / 1,
    },
    nameWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    name: {
      color: Colors.BLACK,
      fontSize: Typography.FONT_SIZE_16,
      ...Mixins.margin(10, 0),
      ...Typography.FONT_REGULAR,
    },
    priceWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.LIGHT_COLORS[index],
      alignSelf: 'flex-start',
      borderRadius: 10,
      ...Mixins.padding(5, 10),
    },
    currency: {
      color: Colors.DARK_COLORS[index],
      fontSize: Typography.FONT_SIZE_30,
      ...Typography.FONT_REGULAR,
    },
    price: {
      color: Colors.BLACK,
      fontSize: Typography.FONT_SIZE_18,
      ...margin(0, 0, 0, 5),
    },
  });

export default memo(ProductCard);
