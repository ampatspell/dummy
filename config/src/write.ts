import { forEnvironment, writeSvelteConfig, writeTestConfig } from "./load";

let config = await forEnvironment('default');

await Promise.all([
  writeTestConfig(config),
  writeSvelteConfig(config),
]);
