import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {ViewStyle, TextStyle} from 'react-native';
import {Typography} from '../styles';

type Props = {label: string; wrapperStyle?: ViewStyle; labelStyle?: TextStyle};

function Button({label, wrapperStyle, labelStyle}: Props): JSX.Element {
  return (
    <View style={StyleSheet.compose(style.view, wrapperStyle)}>
      <Text style={StyleSheet.compose(style.label, labelStyle)}>{label}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...Typography.FONT_BOLD,
    fontSize: Typography.FONT_SIZE_18,
  },
});

export default memo(Button);
