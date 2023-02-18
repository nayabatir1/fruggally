import he from 'he';

import {Product} from '../types/product';

async function ParseFlipkartLink(link: string): Promise<Product | void> {
  console.log(link);
  try {
    const res = await fetch(link);

    console.log(res.status);

    let html = await res.text();

    html = he.decode(html);

    const price = extractPrice(html);

    const name = extractName(html);

    const image = extractImage(html);

    return {
      name,
      price,
      image,
      seller: 'flipkart',
      link,
      id: new Date().getTime().toString(),
    };
  } catch (err) {
    console.log(err);
  }
}

function extractImage(html: string) {
  const exp1 = new RegExp(
    /<img loading="eager" class="_396cs4 _2amPTt _3qGmMb".+?>/gm,
  );

  const exp2 = new RegExp(/<img class="_2r_T1I _396QI4".+?>/gm);

  const [img1] = html.match(exp1) || html.match(exp2) || [''];

  const exp3 = new RegExp(/src=".+?"/gm);

  const [img2] = img1.match(exp3) || [''];

  return img2.slice(5, -1);
}

function extractName(html: string) {
  const nameDivExp = new RegExp(/class="_2NKhZn">.+<\/p/gm);

  const [nameClass] = html.match(nameDivExp) || [''];

  const nameExp = new RegExp(/p>.*</gm);

  return nameClass.match(nameExp)?.[0].slice(2, -1) || '';
}

function extractPrice(html: string) {
  const priceDivExp = new RegExp(/class="_30jeq3 _16Jk6d">\S*<\//gm);

  const [priceDiv] = html.match(priceDivExp) || [''];

  const priceExp = new RegExp(/>\S*</gm);

  return priceDiv.match(priceExp)?.[0].slice(1, -1) || '';
}

export default ParseFlipkartLink;
