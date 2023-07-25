import { post } from '../src/server/request';
import { config } from '../src/config';
import mockAxios from 'jest-mock-axios';
import path from 'path';
import fs from 'fs';
import { modelResponse } from './modelResponse';

test('post request to model api', async () => {
  const file = fs.readFileSync(
    path.join(config.basepath, '__test__', 'sample1.flac')
  );
  const fileBlob = new Blob([file]);

  const resq = post(fileBlob, 'sample1.flac', { ...config.model[0] });
  mockAxios.mockResponse(modelResponse, mockAxios.lastReqGet());

  const result = await resq;

  expect(result.status).toBe(200);
  expect(result.data).not.toBeNull();
});
