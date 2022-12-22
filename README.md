# Image Uploader

Optimize and resize images with sharp

![Image Uploader App](https://raw.githubusercontent.com/david-fb/image-uploader/main/screenshot.png)

## Environment Variables

To run this project, you will need to add the following environment variables from Google Firebase to your .env file:

```
APIKEY=
AUTHDOMAIN=
PROJECTID=
STORAGEBUCKET=
MESSAGINGSENDERID=
APPID=

```

## Installation

Install project dependencies:

```bash
npm install
```

Install firebase emulators

```bash
cd functions
npm install
```

Run Firebase emulators:

```bash
cd functions
firebase emulators:start
```

Run Quasar App:

```bash
quasar dev
```
