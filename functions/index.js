const functions = require('firebase-functions');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs-extra');
const { join, dirname, basename, extname } = require('path');
const { tmpdir } = require('os');
const sharp = require('sharp');

const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

const storage = new Storage();

exports.optimizeImages = functions.storage.object().onFinalize(async (object) => {
  const fileBucket = object.bucket;
  const filePath = object.name;
  const contentType = object.contentType;
  if (fileBucket && filePath && contentType) {
    if (!contentType.startsWith('image/')) {
      console.log('This is not an image');
      return true;
    }

    // Get the file name.
    const extendName = extname(filePath);
    const fileName = basename(filePath, extendName);
    const fileFullName = `${fileName}${extendName}`;
    if (fileName.includes('_thumb_')) {
      console.log('Already a Thumbnail.');
      return true;
    }

    // Download file from bucket.
    const bucket = storage.bucket(fileBucket);
    const file = bucket.file(filePath);

    const [data] = await file.getMetadata();
    if (data.metadata && data.metadata.optimized) {
      console.log('Image has been already optimized');
      return true;
    }

    const workingDir = join(tmpdir(), 'thumbs');
    const destination = join(workingDir, fileFullName);

    await fs.ensureDir(workingDir);
    await file.download({ destination });
    const bucketDir = dirname(filePath);

    //Generate image resize
    const sizes = [720];
    const extendNameTransform = '.png';
    const timestamp = Date.now();
    const resizesPromises = sizes.map((size) => {
      const thumbName = `${fileName}_${timestamp}_thumb_${size}${extendNameTransform}`;
      const thumbPath = join(workingDir, thumbName);
      return sharp(destination).resize(size).png().toFile(thumbPath);
    });
    await Promise.all(resizesPromises);
    console.log('generate resize image, done!');

    // Optimizing images
    await imagemin([`${workingDir}/*.png`], {
      destination: workingDir,
      plugins: [imageminPngquant({ quality: [0.6, 0.6] })],
    });
    console.log('optimizing png, done!');

    // Upload image
    const files = await fs.readdir(workingDir);
    console.log(files);
    // Ignore original
    const optimizedFiles = files.filter((file) => basename(file).includes('_thumb_'));
    const uploadPromises = optimizedFiles.map((file) => {
      const path = join(workingDir, file);
      return bucket.upload(path, {
        destination: join(bucketDir, basename(file)),
        metadata: {
          metadata: {
            optimized: true,
          },
        },
      });
    });
    await Promise.all(uploadPromises).then();
    console.log('upload images, done!');
    return (() => {
      fs.remove(workingDir);
      file.delete();
    })();
  } else {
    console.log('incomplete data');
    return false;
  }
});
