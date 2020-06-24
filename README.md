# Mojifier

1. Analyzing an image using Azure Face API for emotion
1. Add proper emoji to image
1. Stream results back to browser

## How to run

1. Get a Face API account

   ```bash
   https://ms.portal.azure.com/#create/Microsoft.CognitiveServicesFace
   ```

1. Go to `Keys and Endpoint` for the resource. Note down values of `KEY1` and `Endpoint`
1. Construct request URL with `Endpoint` + `face/v1.0/detect`
1. Add `KEY1` and `Endpoint` to .env file
1. Run with `npm start`
1. Test out with navigating to URL `http://localhost:3000/analyze?url=https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg`

## What's going on?