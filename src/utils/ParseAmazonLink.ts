import he from 'he';
import {Alert} from 'react-native';

import {Product} from '../types/product';

async function ParseAmazonLink(link: string): Promise<Product | void> {
  try {
    const home = await fetch('http://www.amazon.in');

    const headers = new Headers();

    for (const [k, v] of Object.entries(home.headers.map)) {
      headers.append(k, v);
    }

    const res = await fetch(link, {headers});

    let text = await res.text();

    text = he.decode(text);

    const name = extractName(text);

    const price = extractPrice(text);

    const image = extractImage(text);

    const date = new Date();

    return {
      name,
      price,
      image,
      seller: 'amazon',
      link,
      id: date.getTime().toString(),
      lastFetched: date,
    };
  } catch (err) {
    Alert.alert('Unale to fetch product', err?.message);
  }
}

function extractImage(html: string) {
  const exp1 = new RegExp(/<img .+?data-a-image-name="landingImage".+?>/gm);

  const [img1] = html.match(exp1) || [''];

  const exp2 = new RegExp(/src=".+?"/gm);

  const [img2] = img1.match(exp2) || [''];

  return img2.slice(5, -1);
}

function extractName(html: string) {
  const nameDivExp = new RegExp(
    /id="productTitle" class="a-size-large product-title-word-break">.+<\/span/gm,
  );

  const [nameClass] = html.match(nameDivExp) || [''];

  const nameExp = new RegExp(/>.*</gm);

  return nameClass.match(nameExp)?.[0].slice(1, -1).trim() || '';
}

function extractPrice(html: string) {
  const currencyDivExp = new RegExp(/class="a-price-symbol">\S+?<\//gm);
  const priceDivExp = new RegExp(/class="a-price-whole">\S+?<\//gm);

  const [currencyDiv] = html.match(currencyDivExp) || [''];
  const [priceDiv] = html.match(priceDivExp) || [''];

  const currencyExp = new RegExp(/>\S+?</gm);
  const priceExp = new RegExp(/>\S+?</gm);

  const currency = currencyDiv.match(currencyExp)?.[0].slice(1, -1) || '';
  const price = priceDiv.match(priceExp)?.[0].slice(1, -1) || '';

  return currency + price;
}

export default ParseAmazonLink;
