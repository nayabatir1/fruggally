import React, {memo} from 'react';

import Icon from '../assets/images/amazon-icon.svg';

type Props = {size?: number};

function AmazonIcon({size = 30}: Props): JSX.Element {
  return <Icon height={size} width={size} />;
}

export default memo(AmazonIcon);
