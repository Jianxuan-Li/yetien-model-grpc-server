import { post } from "./request"
import { download } from "./s3";
import { config } from "../config";

export type taskResult = {
  status: number;
  data: string;
};

export const asrRequest = async (objectId: string) => {
  const buffer = await download(objectId);
  const fileBlob = new Blob([buffer]);
  return await post(fileBlob, objectId, { ...config.model[0] });
};

export const runTask = async (objectId: string) => {
  const result: taskResult = await asrRequest(objectId);
  return result;
};
