import { post } from "../src/server/request"
import { config } from "../src/config"
import path from "path";
import fs from "fs";

test("post request to model api", async () => {
  const file = fs.readFileSync(path.join(config.basepath, "__test__", "sample1.flac"));
  const fileBlob = new Blob([file]);

  const result = await post(fileBlob, "sample1.flac", { ...config.model[0] });
  expect(result.status).toBe(200);
  expect(result.data).not.toBeNull();
}, 30000);
