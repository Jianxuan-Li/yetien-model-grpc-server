import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const current_dir = path.resolve();

export type ModelConfig = {
  url: string | undefined;
  user: string | undefined;
  pwd: string | undefined;
};

export type AWSConfig = {
  bucket: string | undefined;
  accessKeyId: string | undefined;
  secretAccessKey: string | undefined;
  endpoint: string | undefined;
  region: string | undefined;
};

export type Config = {
  basepath: string;
  model: ModelConfig[];
  aws: AWSConfig;
};

export const config: Config = {
  basepath: current_dir,
  model: [
    {
      url: process.env.YETIEN_DEV_MODEL_0_ADDR,
      user: process.env.YETIEN_DEV_MODEL_0_USER,
      pwd: process.env.YETIEN_DEV_MODEL_0_PWD
    }
  ],
  aws: {
    bucket: process.env.AWS_STORAGE_BUCKET_NAME,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    endpoint: process.env.AWS_S3_ENDPOINT_URL,
    region: process.env.AWS_S3_REGION_NAME
  }
};
