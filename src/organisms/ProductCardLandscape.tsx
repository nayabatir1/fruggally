import React, {memo, useCallback, useMemo} from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import useLastUpdated from '../hooks/LastUpdated';
import SellerIcon from '../molecules/SellerIcon';
import {Colors, Mixins, Typography} from '../styles';
import {Product} from '../types/product';

interface Props extends Product {
  setProductId: (arg0: string | null) => void;
}

function ProductCardLandscape({
  name,
  seller,
  image,
  price,
  id,
  link,
  lastFetched,
  setProductId,
}: Props): JSX.Element {
  const RandomValue = useMemo(
    () => Math.round(Math.random() * (Colors.DARK_COLORS.length - 1)),
    [],
  );

  const memoizedStyle = useMemo(() => style(RandomValue), [RandomValue]);

  const openLink = useCallback(() => {
    Linking.openURL(link);
  }, [link]);

  const markProductForDeletion = useCallback(
    () => setProductId(id),
    [id, setProductId],
  );

  const lastUpdated = useLastUpdated(lastFetched);

  return (
    <View style={memoizedStyle.container}>
      <Image
        style={memoizedStyle.img}
        source={{uri: image}}
        progressiveRenderingEnabled
        resizeMode="contain"
        alt="product image"
      />

      <View style={memoizedStyle.details}>
        <View style={memoizedStyle.icon}>
          <SellerIcon seller={seller} />

          <View style={memoizedStyle.link}>
            <Pressable onPress={openLink}>
              <EvilIcons name="external-link" color={Colors.BLACK} size={30} />
            </Pressable>

            <EntypoIcon name="dot-single" color={Colors.BLACK} />

            <Pressable onPress={markProductForDeletion}>
              <EntypoIcon name="trash" color={Colors.ALERT} size={25} />
            </Pressable>
          </View>
        </View>

        <Text style={memoizedStyle.name}>{name}</Text>

        <View style={memoizedStyle.priceWrapper}>
          {price.length > 1 ? (
            <>
              <Text style={memoizedStyle.currency}>{price.slice(0, 1)}</Text>
              <Text style={memoizedStyle.price}>{price.slice(1)}</Text>
            </>
          ) : (
            <Text style={memoizedStyle.notAvail}>N.A.</Text>
          )}
        </View>
      </View>
      <Text style={memoizedStyle.lastFetch}>{lastUpdated}</Text>
    </View>
  );
}

const style = (index: number) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('window').width - 100,
      borderRadius: 10,
      backgroundColor: Colors.MILK,
      flexDirection: 'row',
      marginRight: 10,
      ...Mixins.padding(10),
    },
    img: {
      width: '30%',
      height: '100%',
    },
    details: {
      flex: 1,
      paddingLeft: 30,
      justifyContent: 'space-between',
      height: '80%',
    },
    icon: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    name: {
      marginTop: -30,
      color: Colors.BLACK,
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
    notAvail: {
      color: Colors.BLACK,
      fontSize: Typography.FONT_SIZE_18,
    },
    link: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
    },
    lastFetch: {
      position: 'absolute',
      bottom: 10,
      right: 20,
    },
  });

export default memo(ProductCardLandscape);
