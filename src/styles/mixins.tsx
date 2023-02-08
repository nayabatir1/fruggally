import {ColorValue, Dimensions, PixelRatio} from 'react-native';

import {WHITE} from './colors';

const WINDOW_WIDTH = Dimensions.get('window').width;
const guidelineBaseWidth = 375;

export const scaleSize = (size: number) =>
  (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const scaleFont = (size: number) => size * PixelRatio.getFontScale();

type TStyle = {
  [key: string]: number;
};

function dimensions(
  property: string,
  top: number,
  right = top,
  bottom = top,
  left = right,
) {
  const styles: TStyle = {};

  styles[`${property}Top`] = scaleSize(top);
  styles[`${property}Right`] = scaleSize(right);
  styles[`${property}Bottom`] = scaleSize(bottom);
  styles[`${property}Left`] = scaleSize(left);

  return styles;
}

export function margin(
  top: number,
  right?: number,
  bottom?: number,
  left?: number,
) {
  return dimensions('margin', top, right, bottom, left);
}

export function padding(
  top: number,
  right?: number,
  bottom?: number,
  left?: number,
) {
  return dimensions('padding', top, right, bottom, left);
}

export function boxShadow(
  color: string,
  backgroundColor?: ColorValue,
  offset = {height: 2, width: 2},
  radius = 8,
  opacity = 0.2,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
    backgroundColor: backgroundColor || WHITE,
  };
}
