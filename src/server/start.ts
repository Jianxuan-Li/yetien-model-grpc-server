import server from "./server"
import { config } from "../config"

const checkConfig = () => {
  if (config.basepath == undefined) {
    throw new Error("Basepath can not be undefined");
  }

  if (config.model.length == 0) {
    throw new Error("Model server can not be undefined");
  }

  for (let i = 0; i < config.model.length; i++) {
    if (config.model[i].url == undefined || config.model[i].user == undefined || config.model[i].pwd == undefined) {
      throw new Error("Model server credentials can not be undefined");
    }
  }

  if (config.aws.accessKeyId == undefined || config.aws.secretAccessKey == undefined) {
    throw new Error("AWS credentials can not be undefined");
  }
}

checkConfig();

const port = process.env.PORT || 9000;
const address = `0.0.0.0:${port}`;
server(address);