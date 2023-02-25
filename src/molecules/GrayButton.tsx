import React, {memo} from 'react';

import {StyleSheet} from 'react-native';

import Button from '../atoms/Button';
import {Colors, Mixins} from '../styles';

type Props = {label: string};

function GrayButton({label}: Props): JSX.Element {
  return (
    <Button
      label={label}
      wrapperStyle={style.wrapper}
      labelStyle={style.label}
    />
  );
}

const style = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.GRAY_LIGHT,
    borderRadius: 10,
    ...Mixins.padding(10, 15),
  },
  label: {
    color: Colors.GRAY_DARK,
  },
});

export default memo(GrayButton);
