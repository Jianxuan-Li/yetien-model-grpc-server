import { download } from '../src/server/s3';

test('download object from s3', async () => {
  const buffer = await download('sample1.flac');
  expect(buffer).not.toBeNull();
  expect(buffer.length).toBeGreaterThan(0);
}, 30000);
