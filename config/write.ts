import { forEnvironment, writeTestConfig } from "./load";

let config = await forEnvironment('default');
await writeTestConfig(config);
