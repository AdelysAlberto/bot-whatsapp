const qr = require('qr-image');

const generateImage = async (base64: string) => {
  console.log('⚡ Generando Imagen ⚡\'');

  const qrSvg = qr.image(base64, { type: 'svg', margin: 4, size: 4 });
  qrSvg.pipe(require('fs').createWriteStream('./public/qrCode.svg'));
};

export = generateImage
