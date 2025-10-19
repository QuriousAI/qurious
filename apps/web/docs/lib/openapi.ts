import { createOpenAPI } from "fumadocs-openapi/server";
import { readFileSync } from "node:fs";
import yaml from "js-yaml";

const getConvexJsonSpecs = () => {
  // Dump the directory structure to help debug the path issue
  // try {
  //   const { execSync } = require("child_process");

  //   const path = "../../../packages"

  //   const output = execSync(`ls ${path}`, { encoding: "utf8" });
  //   console.log(`Directory structure of '${path}':\n`, output);
  // } catch (err) {
  //   console.error("Failed to read directory structure:", err);
  // }

  const convexYamlPath =
    "../../../packages/backend/convex-spec-1760111256314.yaml";
  const data = readFileSync(convexYamlPath, "utf8");
  const yamlData = yaml.load(data);
  const jsonData = JSON.stringify(yamlData);

  return jsonData;
};

export const openapi = createOpenAPI({
  // the OpenAPI schema, you can also give it an external URL.
  // input: [getConvexJsonSpecs()],
  input: ["../../../packages/backend/manual-test.json"]
});
