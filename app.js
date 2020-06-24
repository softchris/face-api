// https://ms.portal.azure.com/#create/Microsoft.CognitiveServicesFace
'use strict';

const dotenv = require('dotenv');
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const port = 3000;

// this needs to happen early to read keys from .env
dotenv.config();

const { calculateHappiness, applyEmojiToImage, bufferToStream } = require('./lib');
const analyzeImageWithApi = require('./api')

// INFO use this as an example if you go to http://localhost:3000/analyze?url=<url>
// const url2 = 'https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg';

app.get('/analyze', async(req, res) => {
  if (!req.query.url) {
    res.json({ error: 'URL param missing from body' });
  }
  const { url } = req.query;
  const buffer = await run(url);
  const readStream = bufferToStream(buffer);
  console.log('Streaming response to client');
  readStream.pipe(res);
});

app.get('/', (req, res) => res.send('Welcome to Mojifier'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

async function run(url) {
  const imageUrl = url;
  const response = await analyzeImageWithApi(imageUrl);
  if (response.error) {
    throw response.error;
  } else {
    const faces = calculateHappiness(response);
    const face = faces[0];
    return applyEmojiToImage(face, imageUrl);
  }
}




    

