# Facesoft API Wrapper

NodeJS package and browser SDK to interact with [Facesoft API](https://www.facesoft.io).

## Quick Start
```
npm install facesoft --save
```
```
const Facesoft = require('facesoft');

const app = new Facesoft("INSERT_API_KEY");
app.detectFromURL("https://facesoft.io/assets/img/facesoft-demo-matching-A.jpg").then(response => {
    console.log(response);
}).catch(error => {
  console.log(error);  
})
```
## Browser
https://sdk.facesoft.io/javascript/latest/facesoft.min.js
```
<script src="//sdk.facesoft.io/javascript/latest/facesoft.min.js"></script>
```
## API
### Detect
#### From Base64 String
```
Facesoft.detect(image1)
```
#### From URL
```
Facesoft.detectFromURL(url)
```
#### From File
```
Facesoft.detectFromFile(filelocation)
```

### Match
#### From Base64 String
```
Facesoft.match(image1, image2)
```
#### From URLs
```
Facesoft.matchFromURLs(url1, url2)
```
#### From Files
```
Facesoft.matchFromFiles(filelocation1, filelocation2)
```
### Tags
#### Get Tag Info
```
Facesoft.getTagInfo(tagID)
```
#### Create Tag
```
Facesoft.createTag(tagID)
```
#### Delete Tag With Images
```
Facesoft.deleteTagWithImages(tagID)
```
#### Recognize Tag By Face
```
Facesoft.recognizeTagByFace(tagID)
```
#### Associate Image With Tag
```
Facesoft.associateImageWithTag(tagID, b64image)
```
#### Delete Image
```
Facesoft.deleteImage(imageID)
```
#### Validate Image With Tag
```
Facesoft.validateImageWithTag(tagID, image1)
```