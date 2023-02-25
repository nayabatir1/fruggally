import React, {memo} from 'react';
import AmazonIcon from '../atoms/AmazonIcon';
import FlipkartIcon from '../atoms/FlipkartIcon';

type Props = {seller: 'flipkart' | 'amazon'};

function SellerIcon({seller}: Props): JSX.Element {
  return seller === 'flipkart' ? (
    <FlipkartIcon size={20} />
  ) : (
    <AmazonIcon size={20} />
  );
}

export default memo(SellerIcon);
