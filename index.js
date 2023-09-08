import * as fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import extractUrls from 'extract-urls';
import { parse } from 'node-html-parser';

const websiteUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

// Save current working directory path
const cwd = process.cwd();

// Set folder path by joining current working directory and memes
const folderPath = path.join(cwd, 'memes');
console.log(`Your images will be saved to: ${folderPath}`);

// Create folder
try {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
} catch (err) {
  console.error(err);
}

// Fetch website
const response = await fetch(websiteUrl);

// Transform HTTP response to text
const data = await response.text();

// Parse HTML full HTML to <img> elements only
const root = parse(data)
  .querySelectorAll('img[src^="https://api.memegen.link/"]')
  .toString();

// Extract urls from <img> element list
const filteredImageUrls = extractUrls(root);

// Declare function to download images
async function downloadImage(url, filename) {
  const downloadResponse = await axios.get(url, {
    // The response is a JavaScript ArrayBuffer containing binary data.
    // (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType)
    responseType: 'arraybuffer',
  });

  // Join folder path and file name
  fs.writeFile(folderPath + '\\' + filename, downloadResponse.data, (err) => {
    if (err) throw err;
    console.log('Image downloaded successfully!');
  });
}
// Set number format to 2 digits minimum, essentially leading zeros for single digit numbers (0 -> 00, 1 -> 01, etc.)
const numberFormat = new Intl.NumberFormat('en-US', {
  minimumIntegerDigits: 2,
});

// Set amount of images to download
const imageAmountToDownload = 10;

// Download images
for (
  let imagesDownloaded = 1;
  imagesDownloaded <= imageAmountToDownload;
  imagesDownloaded++
) {
  await downloadImage(
    filteredImageUrls[imagesDownloaded],
    numberFormat.format(imagesDownloaded) + '.jpg',
  );
}

// ----- Misc comments
// downloadImage('https://example.com/image.jpg', 'image.jpg');

// Things that didn't work

// remove all spaces - will break element name attribute name
// let trimmedImages = images.replace(/\s/g, '');

// get value of all src attributes parsed img list
// console.log(parse(parsedImages).toString().getAttribute('src'));

// check if list URLs are okay
// console.log(filteredImageUrls);
// check that you can get the first element of the array
// console.log(filteredImageUrls[0]);

// Check fetched data
// console.log('Data from fetch with promise' + data);

// Check image elements only
// console.log(parsedImageElements);
