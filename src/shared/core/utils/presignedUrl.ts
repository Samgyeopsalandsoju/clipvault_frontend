import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3 from '../lib/s3/s3Client';

// get
export const generateGetUrl = async ({ key }: { key: string }) => {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;

  if (!bucketName) throw new Error('Bucket name is not defined');

  const params = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const command = new GetObjectCommand(params);
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
    return signedUrl;
  } catch (error) {
    console.error('ERROR : create GET generateGetUrl : ', error);
  }
};

// delete
export const generateDeleteUrl = async ({ key }: { key: string }) => {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  if (!bucketName) throw new Error('Bucket name is not defined');

  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const command = new DeleteObjectCommand(params);
  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
  return signedUrl;
};

interface GeneratePutUrlProps {
  fileName: string;
  fileType: string;
  ownerToken: string;
}

// put
export const generatePutUrl = async ({ fileName, fileType, ownerToken }: GeneratePutUrlProps) => {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  try {
    if (!bucketName) {
      throw new Error('Bucket name is not defined');
    }

    const params = {
      Bucket: bucketName,
      Key: fileName,
      ContentType: fileType,
      Metadata: {
        owner: ownerToken,
      },
    };

    const command = new PutObjectCommand(params);
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    return signedUrl;
  } catch (error) {
    console.error(`ERROR: create PUT getSignedUrl : `, error);
  }
};
