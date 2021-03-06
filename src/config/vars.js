import * as dotenv from 'dotenv-safe';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

dotenv.config()
const s3 = new aws.S3()

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  s3Uploads: {
    storage: multerS3({
      s3: s3,
      bucket: 'arch-v',
      key: function(req, file, cb) {
        cb(null, Date.now().toString())
      }
    }) 
  }
}