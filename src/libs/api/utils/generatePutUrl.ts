import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3 from '../config/s3Client';

interface GeneratePutUrlProps {
  fileName: string;
  fileType: string;
  ownerToken: string;
}

export const generatePutUrl = async ({ fileName, fileType, ownerToken }: GeneratePutUrlProps) => {
  console.log('@@@@@@@@@  check s3 instance @@@@@@@@@@@@@@');
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  console.log('bucketName : ', bucketName);
  console.log('fileName : ', fileName);
  console.log('fileType : ', fileType);
  console.log('ownerToken : ', ownerToken);
  console.log('s3 : ', s3);

  if (!bucketName) throw new Error('Bucket name is not defined');

  const params = {
    Bucket: bucketName,
    Key: fileName,
    ContentType: fileType,
    Metadata: {
      owner: ownerToken,
    },
  };

  try {
    const command = new PutObjectCommand(params);
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    console.log('signedUrl : ', signedUrl);
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    return signedUrl;
  } catch (error) {
    console.error(`ERROR: create PUT getSignedUrl : `, error);
  }
};
