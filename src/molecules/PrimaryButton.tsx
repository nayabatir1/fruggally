import React from 'react';
import {StyleSheet} from 'react-native';

import Button from '../atoms/Button';

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
    backgroundColor: '#136fff',
    borderRadius: 10,
  },
  label: {
    color: '#97e5ff',
  },
});

export default PrimaryButton;
