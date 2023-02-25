import React, {memo, useCallback, useMemo} from 'react';
import {Image, Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import AmazonIcon from '../atoms/AmazonIcon';
import FlipkartIcon from '../atoms/FlipkartIcon';
import {Colors, Mixins, Typography} from '../styles';
import {Product} from '../types/product';
import useStore from '../store/Store';

dayjs.extend(relativeTime);

interface Props extends Product {}

function ProductCard({
  name,
  seller,
  image,
  price,
  id,
  link,
  lastFetched,
}: Props): JSX.Element {
  const RandomValue = useMemo(
    () => Math.round(Math.random() * (Colors.DARK_COLORS.length - 1)),
    [],
  );

  const memoizedStyle = useMemo(() => style(RandomValue), [RandomValue]);

  const openLink = useCallback(() => {
    Linking.openURL(link);
  }, [link]);

  const lastUpdated = useMemo(() => {
    var today = dayjs(new Date());

    return dayjs(lastFetched).from(today);
  }, [lastFetched]);

  const {removeProduct} = useStore();

  return (
    <View style={memoizedStyle.container}>
      <View style={memoizedStyle.icon}>
        {seller === 'flipkart' ? (
          <FlipkartIcon size={20} />
        ) : (
          <AmazonIcon size={20} />
        )}

        <View style={memoizedStyle.link}>
          <Pressable onPress={openLink}>
            <EvilIcons name="external-link" color={Colors.BLACK} size={30} />
          </Pressable>

          <EntypoIcon name="dot-single" color={Colors.BLACK} />

          <Pressable onPress={() => removeProduct(id)}>
            <EntypoIcon name="trash" color={Colors.ALERT} size={25} />
          </Pressable>
        </View>
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

      <Text style={memoizedStyle.lastFetch}>{lastUpdated}</Text>
    </View>
  );
}

const style = (index: number) =>
  StyleSheet.create({
    container: {
      borderRadius: 10,
      backgroundColor: Colors.MILK,
      position: 'relative',
      ...Mixins.padding(10),
    },
    icon: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: 1,
    },
    seller: {
      left: 10,
    },
    link: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
    },
    img: {
      height: 'auto',
      width: '100%',
      aspectRatio: 2 / 1,
      marginTop: -25,
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
      alignSelf: 'flex-start',
      backgroundColor: Colors.LIGHT_COLORS[index],
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
      ...Mixins.margin(0, 0, 0, 5),
    },
    lastFetch: {
      color: Colors.GRAY_DARK,
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
  });

export default memo(ProductCard);
