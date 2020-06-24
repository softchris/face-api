
const path = require("path");
const Jimp = require("jimp");
const { Readable } = require('stream');
const EmotivePoint = require("./models/emotivepoint");
const Rect = require("./models/rect");
const Face = require("./models/face");

async function applyEmojiToImage(face, url) {
  // response from JSON
  const emojiImage = await Jimp.read(
    path.join(__dirname, "emojis", `${face.mojiIcon}.png`)
  );
  // resizing emoji to fit face
  emojiImage.resize(face.faceRectangle.width, face.faceRectangle.height);

  let sourceImage = await Jimp.read(url);
  let compositeImage = sourceImage;
  // applying emoji image to source image
  compositeImage = compositeImage.composite(
    emojiImage,
    face.faceRectangle.left,
    face.faceRectangle.top
  );

  console.log("Composite image created");

  return new Promise((resolve, reject) => {
    compositeImage.getBuffer(Jimp.MIME_JPEG, (error, buffer) => {
      // get a buffer of the composed image
      if (error) {
        let message = "There was an error adding the emoji to the image";
        context.log.error(error);
        reject(message);
      } else {
        // put the image into the context body
        resolve(buffer);
      }
    });
  });
}

function calculateHappiness(resp) {
  if (resp.length === 0) {
    throw "No faces found in image";
  }

  let faces = [];

  // Loop through faces and find an emoji
  resp.forEach((f) => {
    let scores = new EmotivePoint(f.faceAttributes.emotion);
    let faceRectangle = new Rect(f.faceRectangle);
    let face = new Face(scores, faceRectangle);
    faces.push(face);
  });

  return faces;
}

function bufferToStream(binary) {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary);
      this.push(null);
    },
  });

  return readableInstanceStream;
}

module.exports = {
  applyEmojiToImage,
  calculateHappiness,
  bufferToStream,
};
