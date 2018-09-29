
import aws from 'aws-sdk';

const getObject = async (bucket, key) => {
  try {
    const s3 = new aws.S3();
    const s3Data = await s3.getObject({
      Bucket: bucket,
      Key: key
    }).promise();
    return s3Data.Body
  } catch(err) {
    return err
  }
}

module.exports = {
  getObject
}