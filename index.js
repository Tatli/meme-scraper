import * as fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import extractUrls from 'extract-urls';
import { parse } from 'node-html-parser';

/* `browserless` will be passed to `html-get`
 * as driver for getting the rendered HTML. */

const websiteUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

// Print current working directory
const cwd = process.cwd();

// Set folder path
const folderPath = path.join(cwd, 'memes');
console.log(folderPath);

// Create folder
try {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
} catch (err) {
  console.error(err);
}

// fetch request
const response = await fetch(websiteUrl);
// response to text request
const data = await response.text();
// print data from fetch
// console.log('Data from fetch with promise' + data);

const root = parse(data);
// console.log(root.querySelectorAll('img').toString().getAttribute('img'));

const parsedImageElements = root
  .querySelectorAll('img[src^="https://api.memegen.link/"]')
  .toString();
// console.log(parsedImageElements);

const filteredImageUrls = extractUrls(parsedImageElements);
// check if list URLs are okay
// console.log(filteredImageUrls);
// check that you can get the first element of the array
// console.log(filteredImageUrls[0]);

// declare function to download images
async function downloadImage(url, filename) {
  const downloadResponse = await axios.get(url, {
    // The response is a JavaScript ArrayBuffer containing binary data. (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType)
    responseType: 'arraybuffer',
  });

  // since writeFile won't take a path as parameter I joined it to the filename lol
  fs.writeFile(folderPath + '\\' + filename, downloadResponse.data, (err) => {
    if (err) throw err;
    console.log('Image downloaded successfully!');
  });
}
const numberFormat = new Intl.NumberFormat('en-US', {
  minimumIntegerDigits: 2,
});

// download 10 images
for (let imagesDownloaded = 1; imagesDownloaded <= 11; imagesDownloaded++) {
  await downloadImage(
    filteredImageUrls[imagesDownloaded],
    // set numberFormat to minimumIntegerDigits: 2 for leading zero
    numberFormat.format(imagesDownloaded) + '.jpg',
  );
}
// downloadImage('https://example.com/image.jpg', 'image.jpg');

// Things that didn't work

// remove all spaces - will break element name attribute name
// let trimmedImages = images.replace(/\s/g, '');

// get value of all src attributes parsed img list
// console.log(parse(parsedImages).toString().getAttribute('src'));
