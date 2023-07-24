import * as grpc from '@grpc/grpc-js';
import moment from 'moment';
import { runTask } from './task';
import asrProto from '../proto';

async function runAsr(call, callback) {
  const stime = performance.now(); // start time

  const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
  process.stdout.write(
    `Task: ${call.request.speakingId} ${call.request.objectId} ${currentTime} \n`
  );

  try {
    const result = await runTask(call.request.objectId);
    console.log('result', result.data);

    const resp = {
      status: true,
      text: result.data,
      duration: 0,
      error: ''
    };

    const etime = performance.now(); // end time
    resp.duration = (etime - stime) / 1000;
    resp.duration = Math.round(resp.duration * 100) / 100;
    console.log(`Task completed. Duration: ${resp.duration} seconds`);
    callback(null, resp);
  } catch (error) {
    const resp = {
      status: false,
      text: '',
      duration: 0,
      error: error
    };
    callback(error, resp);
  }
}

export default function main(address: string) {
  const server = new grpc.Server();

  server.addService(asrProto.Asr.service, {
    runAsr: runAsr
  });

  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('Server running at ' + address);
  });
}
