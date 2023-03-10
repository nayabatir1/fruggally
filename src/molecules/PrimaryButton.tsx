import React, {memo} from 'react';
import {StyleSheet} from 'react-native';

import Button from '../atoms/Button';
import {Colors, Mixins} from '../styles';

type Props = {label: string};

function PrimaryButton({label}: Props): JSX.Element {
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
    backgroundColor: Colors.PATRICKS_BLUE,
    borderRadius: 10,
    ...Mixins.padding(15, 0),
  },
  label: {
    color: Colors.WHITE,
  },
});

export default memo(PrimaryButton);
