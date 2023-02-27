import {Alert, Vibration} from 'react-native';
import useStore from '../store/Store';
import ParseAmazonLink from './ParseAmazonLink';
import ParseFlipkartLink from './ParseFlipkartLink';

export default async (productLink: string) => {
  let type = 'flipkart';

  if (!productLink.includes('flipkart')) {
    type = 'amazon';
  }

  let product;

  const [link] = productLink.match(/https:.+/gm) || [''];

  if (!link) {
    Alert.alert('Invalid link', "Check the link you've provided");
    return null;
  }

  switch (type) {
    case 'flipkart':
      product = await ParseFlipkartLink(link);
      break;

    case 'amazon':
      product = await ParseAmazonLink(link);
  }

  if (product) {
    Vibration.vibrate([100, 200, 100, 200]);
    useStore.getState().addProducts(product);
  }
};
