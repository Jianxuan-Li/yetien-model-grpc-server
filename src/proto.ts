import path from 'path';
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import { config } from './config';

const packageDefinition = protoLoader.loadSync(
  path.join(config.basepath, 'asrserver.proto'),
  { keepCase: true, defaults: true, oneofs: true }
);

/* eslint-disable @typescript-eslint/no-explicit-any */
const asrProto: any = grpc.loadPackageDefinition(packageDefinition).asrserver;
/* eslint-enable @typescript-eslint/no-explicit-any */

export default asrProto;
