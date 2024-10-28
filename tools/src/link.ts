import minimist from "minimist";
import { dummyPath, dummyRoot, note, symlink } from "./utils";
import { join, resolve } from "path";

let args = minimist(process.argv.slice(2));
const targetRoot = resolve(args._[0]);

note('source', dummyRoot);
note('target:', targetRoot);

let paths = [
  'src/routes/+layout.server.ts',
  'src/routes/+layout.svelte',
  'src/routes/[...path]',
  'src/routes/backend',
  'src/base',
];

console.log();

await Promise.all(paths.map(async path => {
  let source = dummyPath(`client/${path}`);
  let target = join(targetRoot, path);
  await symlink(source, target);
}));
