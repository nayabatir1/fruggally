import React, {memo} from 'react';

import Icon from '../assets/images/flipkart-icon.svg';

type Props = {size?: number};

function FlipkartIcon({size = 30}: Props): JSX.Element {
  return <Icon height={size} width={size} />;
}

export default memo(FlipkartIcon);
