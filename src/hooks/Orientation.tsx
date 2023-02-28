import {useDeferredValue, useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';

enum Orientation {
  PORTRAIT,
  LANDSCAPE,
}

function useOrientation(): keyof typeof Orientation {
  const [orientation, setOrientation] =
    useState<keyof typeof Orientation>('PORTRAIT');

  const {height, width} = useWindowDimensions();

  useEffect(() => {
    if (height < width) {
      setOrientation('LANDSCAPE');
    } else {
      setOrientation('PORTRAIT');
    }
  }, [height, width]);

  return useDeferredValue(orientation);
}

export default useOrientation;
