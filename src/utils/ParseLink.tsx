async function parseLink(link: string) {
  const res = await fetch(link);

  const html = await res.text();

  const price = extractPrice(html);

  const name = extractName(html);

  const image = extractImage(html);

  return {name, price, image};
}

function extractImage(html: string) {
  const exp1 = new RegExp(
    /<img loading="eager" class="_396cs4 _2amPTt.*\/><\//gm,
  );

  const [img1] = html.match(exp1) || [''];

  const exp2 = new RegExp(/src=".*.src/gm);

  const [img2] = img1.match(exp2) || [''];

  const exp3 = new RegExp(/".*\?/gm);

  const [img3] = img2.match(exp3) || [''];

  return img3.slice(1, -1);
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

export default parseLink;
