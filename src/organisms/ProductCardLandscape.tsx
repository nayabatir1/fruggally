import React, {memo, useCallback, useMemo} from 'react';
import {Dimensions, Image, Linking, StyleSheet, Text, View} from 'react-native';

import useLastUpdated from '../hooks/LastUpdated';
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
        <Text style={memoizedStyle.name}>{name}</Text>

        <View style={memoizedStyle.priceWrapper}>
          <Text style={memoizedStyle.currency}>{price.slice(0, 1)}</Text>
          <Text style={memoizedStyle.price}>{price.slice(1)}</Text>
        </View>
      </View>
    </View>
  );
}

const style = (index: number) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('window').width - 100,
      borderWidth: 2,
      borderRadius: 10,
      backgroundColor: Colors.MILK,
      flexDirection: 'row',
      ...Mixins.padding(10),
    },
    img: {
      width: '30%',
      height: '100%',
    },
    details: {
      flex: 1,
    },
    name: {
      borderWidth: 1,
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
  });

export default memo(ProductCardLandscape);
