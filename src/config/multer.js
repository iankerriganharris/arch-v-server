import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

const s3 = new aws.S3()

module.exports = {
  s3Bucket: {
    storage: multerS3({
      s3: s3,
      bucket: 'arch-v',
      key: function(req, file, cb) {
        cb(null, Date.now().toString())
      }
    }) 
  },
  tmp: {
    dest: '/tmp'
  }
}