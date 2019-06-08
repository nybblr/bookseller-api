const AWS = require('aws-sdk');

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_BUCKET,
} = process.env;
const URL_EXPIRATION = Number(process.env.URL_EXPIRATION);

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const s3 = new AWS.S3();

let generateURL = (file) =>
  s3.getSignedUrl('getObject', {
    Bucket: AWS_BUCKET,
    Key: file,
    Expires: URL_EXPIRATION,
  });

module.exports = generateURL;