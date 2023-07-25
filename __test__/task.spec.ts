import { post } from '../src/server/request';
import mockAxios from 'jest-mock-axios';
import { config } from '../src/config';
import { download } from '../src/server/s3';
import { modelResponse } from './modelResponse';

afterEach(() => {
  mockAxios.reset();
});

test('download file and post to ASR model', async () => {
  const buffer = await download('sample1.flac');
  expect(buffer).not.toBeNull();
  expect(buffer.length).toBeGreaterThan(0);

  const fileBlob = new Blob([buffer]);

  const resq = post(fileBlob, 'sample1.flac', { ...config.model[0] });
  mockAxios.mockResponse(modelResponse, mockAxios.lastReqGet());
  const result = await resq;

  expect(result.status).toBe(200);
  expect(result.data).not.toBeNull();
  expect(result.data).toMatch(/^going/);
});
