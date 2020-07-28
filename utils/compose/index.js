const { createCanvas, loadImage } = require('canvas');
const sharp = require('sharp');
const AMAZON_S3_BUCKET = process.env.AMAZON_S3_BUCKET;

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
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
            context.font = "bold 30pt Menlo";
            context.textAlign = 'center';
            context.fillStyle = '#fff';
            const textHeight = 30
            const textWidth = context.measureText(text).width
            x = (cellX + perImageWidth / 2);
            y = (height / 2) - (textHeight / 2)
            context.fillText(text, x, y);
          }
          cellX = perImageWidth * (index + 1);
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