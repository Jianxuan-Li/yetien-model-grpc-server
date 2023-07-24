import * as grpc from '@grpc/grpc-js';
import asrProto from '../proto';

const client = new asrProto.Asr(
  'localhost:9000',
  grpc.credentials.createInsecure()
);

function main() {
  const request = {
    speakingId: 'testetstet',
    objectId: 'sample1.flac'
  };

  const successed = (err, resp) => {
    if (err) {
      console.log(`Error:`, err.message);
      console.log(`Error Response:`, resp);
      return;
    }
    console.log('Greeting:', resp);
  };

  client.runAsr(request, successed);
}

main();
