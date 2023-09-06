# meme-scraper

This project scrapes memes off the internet

## description

The program should be able to run multiple times without throwing an error.

## to-do's

- [ ] setup project using cheat sheet
- [ ] create a directory called memes from code
- [ ] access the Website
- [ ] either filter information unique from the HTML or a tool that helps you to extract the info by organizing the HTML content as an object (keyword not told by trainer. Parser?)
  - [ ] option 1: use String methods or use JS to break the html (.regex, .slice, etc.) into manageable pieces
  - [ ] option 2: use a tool which allows traversing the html by understanding its content and filter the information (find tool and learn how to use it)
- [ ] get the 10 image URLs
  - [ ] put them into a convenient data structure (i.e. an array)
- [ ] find a way to download images from URLs
  - [ ] get image content (not a file)
  - [ ] shape the content to be ready to be packed into a file
  - [ ] convert image binary to file
  - [ ] give the file a name
- [ ] Test logic and make sure it runs multiple times
- [ ] Make sure that the meme images are "ignored" in Git - they should not show up in your repository.

---

## exercise description

Create a cli (Command Line Interface) application that scrapes the **current version** of this website:

https://memegen-link-examples-upleveled.netlify.app/

...and saves the first 10 images into a folder called "memes" within the directory of the new project. The image files should be named with a number with a leading zero, eg. `01.jpg`, `02.jpg`, etc.

Avoid using an "image scraper" or "image downloader" library that does multiple steps at once for you (eg. do not use [`image-downloader`](https://www.npmjs.com/package/image-downloader) or [`nodejs-file-downloader`](https://www.npmjs.com/package/nodejs-file-downloader) or similar) - break the task down into smaller steps and select libraries as necessary for each step.

Make sure that the meme images are "ignored" in Git - they should not show up in your repository.

The program should be able to run multiple times without throwing an error.

## Stretch goals:

- Make the application create your own custom meme (eg. `node index.js hello karl bender` would download an image with the top text of "hello", the bottom text of "karl", with the meme image of Bender)
- Add a nice progress indicator (either messages or a progress bar)
