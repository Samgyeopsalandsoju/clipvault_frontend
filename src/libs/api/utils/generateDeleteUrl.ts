import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3 from '../config/s3Client';

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
