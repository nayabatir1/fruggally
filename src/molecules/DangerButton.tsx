import React, {memo} from 'react';
import {StyleSheet} from 'react-native';

import Button from '../atoms/Button';
import {Colors, Mixins} from '../styles';

type Props = {label: string};

function DangerButton({label}: Props): JSX.Element {
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
    backgroundColor: Colors.LIGHT_CORAL,
    borderRadius: 10,
    ...Mixins.padding(10, 15),
  },
  label: {
    color: Colors.BOSTON_RED,
  },
});

export default memo(DangerButton);
