import React from 'react';
import {StyleSheet} from 'react-native';

import Button from '../atoms/Button';

function PrimaryButton(): JSX.Element {
  return (
    <Button
      label="Submit"
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
