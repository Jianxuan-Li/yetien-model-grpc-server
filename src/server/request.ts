import axios from 'axios';
import { ModelConfig } from '../config';

export async function post(file: Blob, filename: string, server: ModelConfig) {
  if (
    server.url == undefined ||
    server.user == undefined ||
    server.pwd == undefined
  ) {
    throw new Error('Model server credentials can not be undefined');
  }

  const form = new FormData();
  form.append('audio_file', file, filename);

  const resp = await axios.post(server.url, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
      accept: 'application/json'
    },
    auth: {
      username: server.user,
      password: server.pwd
    }
  });

  if (resp.status === 200) {
    return resp;
  }

  throw new Error(resp.statusText);
}
