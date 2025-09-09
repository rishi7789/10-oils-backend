// const AWS = require('aws-sdk');
// const dotenv = require('dotenv');
// dotenv.config();

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: 'ap-south-1', 
// });

// const s3 = new AWS.S3();

// const uploadImages = async (file) => {
//   const timestamp = Date.now();
//   const uniqueFileName = `images/${timestamp}-${file.originalname}`;

//   const params = {
//     Bucket: 'demo-s3bucket-storage', 
//     Key: uniqueFileName,
//     Body: file.buffer,
//     ContentType: file.mimetype,
//     // ACL: 'public-read', // Optional: make file public
//   };

//   try {
//     const data = await s3.upload(params).promise();
//     return data.Location; 
//   } catch (err) {
//     console.error('S3 Upload Error:', err);
//     throw new Error('Image upload failed');
//   }
// };

const AWS = require('aws-sdk');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

// Configure AWS SDK for Cloudflare R2
const s3 = new AWS.S3({
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
  secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  region: 'auto', // region is not used by R2, so set to anything
  signatureVersion: 'v4',
});


const uploadImages = async (file) => {
  const timestamp = Date.now();
  const uniqueFileName = `images/${timestamp}-${file.originalname}`;

  const params = {
    Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
    Key: uniqueFileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    // ACL: 'public-read', // if you want public access
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (err) {
    throw new Error('Image upload failed');
  }

} 


module.exports = { uploadImages };
