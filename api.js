const request = require("request");
const uriBase = `https://${process.env.SERVICE_URL}.com/face/v1.0/detect`;
const params = {
  returnFaceId: "true",
  returnFaceLandmarks: "false",
  returnFaceAttributes:
    "age,gender,headPose,smile,facialHair,glasses," +
    "emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
};

const options = {
  uri: uriBase,
  qs: params,
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": process.env.API_KEY,
  },
};

function callApi(url) {
  options.body = JSON.stringify({ url });
  console.log('calling Face API')
  return new Promise((resolve, reject) => {
    request.post(options, (error, response, body) => {
      if (error) {
        reject(error);
      }
      resolve(JSON.parse(body));
    });
  });
  
}

module.exports = callApi;
