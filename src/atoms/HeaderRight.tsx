import React, {memo} from 'react';
import {Pressable} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import useStore from '../store/Store';

import {Colors} from '../styles';

function HeaderRight(): JSX.Element {
  const {refetchProducts} = useStore();

  return (
    <Pressable onPress={refetchProducts}>
      <FeatherIcon name="refresh-ccw" size={25} color={Colors.WHITE} />
    </Pressable>
  );
}

export default memo(HeaderRight);
