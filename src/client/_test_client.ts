import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { config } from "../config"

let packageDefinition = protoLoader.loadSync(path.join(config.basepath, "asrserver.proto"));
let asrProto: any = grpc.loadPackageDefinition(packageDefinition).asrserver;

let client = new asrProto.Asr(
  "localhost:9000",
  grpc.credentials.createInsecure()
);

function main() {
  let request = {
    speakingId: "testetstet",
    objectId: "sample1.flac",
  }

  const successed = (err, resp) => {
    if (err) {
      console.log("Error:", err.message);
      console.log("Error Response:", resp);
      return;
    }
    console.log("Greeting:", resp);
  }

  client.runAsr(request, successed);
}

main();