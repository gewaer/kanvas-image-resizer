const { createCanvas, loadImage } = require('canvas');
const sharp = require('sharp');
const AMAZON_S3_BUCKET = process.env.AMAZON_S3_BUCKET;

const GAP = 10;

const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
  var words = text.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

const calculateWrappedTextHeight = (context, text, y, maxWidth, lineHeight) => {
  var words = text.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }

  return y;
  
}

const composeImage = (imgs, alts, width = 667, height = 500, backgroundColor='#262628') => {
  return new Promise(async (resolve, reject) => {
    if (Array.isArray(imgs) && Array.isArray(alts) ) {
      if (imgs.length === alts.length) {
        const perImageWidth = width / imgs.length;
        const canvas = createCanvas(width, height);
        const context = canvas.getContext('2d');  
        context.fillStyle = backgroundColor;
        context.fillRect(0,0, width, height);
        let cellX = 0;
        for(let index = 0; index <= imgs.length - 1; index++) {
          const img = imgs[index];
         
          let x = perImageWidth * index;
          let y = 0;
  
          if (img) {
            const imageUrl = `${AMAZON_S3_BUCKET}${img}`;
            const image = await loadImage(imageUrl);
            // const editImage = await sharp(image)
            // console.log(editImage);
            context.drawImage(image, cellX, y, perImageWidth, height)
          } else {
            const text = alts[index];
            context.font = "bold 25pt Menlo";
            context.textAlign = 'left';
            context.fillStyle = '#fff';
            const textHeight = calculateWrappedTextHeight(context, text, y, perImageWidth, 40)
            x = (cellX + GAP);
            y = (height / 2) - (textHeight / 2)
            if (textHeight >= 200) {
              text += '...'
            }
            wrapText(context, text, x, y, perImageWidth - 25, 40)
          }
          
          cellX = perImageWidth * (index + 1);
          if (index < imgs.length - 1 ) {
            context.fillStyle = '#232324';
            context.fillRect(cellX, 0, GAP, height);
            cellX += GAP;
          }
        }
   
        const buffer = canvas.toBuffer("image/jpeg");
        resolve(buffer);
  
  
      } else {
        reject(new Error('img and alt length should be the same'))
      }
    }
  })
  
}

module.exports = composeImage;