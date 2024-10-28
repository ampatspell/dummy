import minimist from "minimist";
import { dummyPath, dummyRoot, note, symlink } from "./utils";
import { join, resolve } from "path";

let args = minimist(process.argv.slice(2));
const targetRoot = resolve(args._[0]);
const dryRun = !!args['dry-run'];

note('source', dummyRoot);
note('target:', targetRoot);

let paths = [
  'client/src/routes/+layout.server.ts',
  'client/src/routes/+layout.svelte',
  'client/src/routes/[...path]',
  'client/src/routes/backend',
  'client/src/dummy',
];

await Promise.all(paths.map(async path => {
  let source = join(dummyRoot, path);
  let target = join(targetRoot, path);
  await symlink({ source, target, dryRun });
}));
