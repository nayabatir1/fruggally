import he from 'he';

import {Product} from '../types/product';

async function ParseAmazonLink(link: string): Promise<Product | void> {
  console.log(link);
  try {
    const res = await fetch(link);

    console.log(res.status);

    let text = await res.text();

    text = he.decode(text);

    const name = extractName(text);

    const price = extractPrice(text);

    const image = extractImage(text);

    console.log(image);

    return {
      name,
      price,
      image,
      seller: 'amazon',
      link,
      id: new Date().getTime().toString(),
    };
  } catch (err) {
    console.log(err);
  }
}

function extractImage(html: string) {
  const exp1 = new RegExp(/<img .+?data-a-image-name="landingImage".+?>/gm);

  const [img1] = html.match(exp1) || [''];

  console.log(img1);

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

  console.log(priceDiv);

  const currencyExp = new RegExp(/>\S+?</gm);
  const priceExp = new RegExp(/>\S+?</gm);

  const currency = currencyDiv.match(currencyExp)?.[0].slice(1, -1) || '';
  const price = priceDiv.match(priceExp)?.[0].slice(1, -1) || '';

  console.log({currency, price});

  return currency + price;
}

export default ParseAmazonLink;
