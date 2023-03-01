import React, {memo, useMemo} from 'react';
import {StyleSheet, Text, useWindowDimensions} from 'react-native';

import {Colors} from '../styles';

function ListEmptyComponent(): JSX.Element {
  const {width} = useWindowDimensions();

  const memoizedStyle = useMemo(() => style(width), [width]);

  return (
    <Text style={memoizedStyle.textCenter}>Add products to view them</Text>
  );
}

const style = (width: number) =>
  StyleSheet.create({
    textCenter: {
      textAlign: 'center',
      color: Colors.WHITE,
      width,
    },
  });

export default memo(ListEmptyComponent);
