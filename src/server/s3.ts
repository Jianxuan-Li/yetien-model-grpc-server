import { config } from '../config';
import { Readable } from 'stream';
import {
  S3Client,
  GetObjectCommand,
  GetObjectCommandOutput
} from '@aws-sdk/client-s3';

export const asStream = (response: GetObjectCommandOutput) => {
  return response.Body as Readable;
};

export const asBuffer = async (response: GetObjectCommandOutput) => {
  const stream = asStream(response);
  const chunks: Buffer[] = [];
  return new Promise<Buffer>((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
};

export const download = async (objectId: string) => {
  if (
    config.aws.accessKeyId == undefined ||
    config.aws.secretAccessKey == undefined
  ) {
    throw new Error('AWS credentials can not be undefined');
  }

  const s3Client: S3Client = new S3Client({
    region: config.aws.region,
    credentials: {
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.secretAccessKey
    }
  });

  const command = new GetObjectCommand({
    Bucket: config.aws.bucket,
    Key: objectId
  });

  const response = await s3Client.send(command);
  return asBuffer(response);
};
