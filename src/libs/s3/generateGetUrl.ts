import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3 from '@/libs/s3/s3Client';

export const generateGetUrl = async ({ key }: { key: string }) => {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;

  console.log('@@@@@  check s3 instance @@@@@@@@@@');
  console.log('bucketName : ', bucketName);
  console.log('s3 : ', s3);
  if (!bucketName) throw new Error('Bucket name is not defined');

  const params = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const command = new GetObjectCommand(params);
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
    console.log('signedUrl : ', signedUrl);
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    return signedUrl;
  } catch (error) {
    console.error('ERROR : create GET generateGetUrl : ', error);
  }
};
