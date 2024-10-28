import minimist from "minimist";
import { dummyRoot as source, note, symlinks, mkdirp, writeFile } from "./utils";
import { join, resolve } from "path";
import { readFile } from "fs/promises";

let args = minimist(process.argv.slice(2));
const target = resolve(args._[0]);
const dryRun = !!args['dry-run'];

note('source', source);
note('target:', target);

const client = async () => {
  let paths = [
    'client/src/routes/+layout.server.ts',
    'client/src/routes/+layout.svelte',
    'client/src/routes/[...path]',
    'client/src/routes/backend',
    'client/src/dummy',
  ];

  await symlinks({
    source,
    target,
    paths,
    dryRun,
  });
}

const firebase = async () => {
  let paths = [
    'firebase/functions/src',
    'firebase/functions/test',
    'firebase/functions/.gitignore',
    'firebase/functions/.mocharc.json',
    'firebase/functions/package.json',
    'firebase/functions/tsconfig.json',
    'firebase/rules',
    'firebase/.gitignore',
    'firebase/firebase.json',
    'firebase/package.json',
  ];

  await mkdirp(join(target, 'firebase/functions'));

  await symlinks({
    source,
    target,
    paths,
    dryRun,
  });
}

const root = async () => {
  let paths = [
    'package.json',
  ];

  await symlinks({
    source,
    target,
    paths,
    dryRun,
  });
}

const config = async () => {
  let config = JSON.parse(await readFile(join(target, 'config.json'), 'utf-8'));

  let client = `PUBLIC_FIREBASE='${JSON.stringify(config.firebase, null, 2)}'`;
  await writeFile(join(target, 'client', '.env'), client);

  let firebaserc = JSON.stringify({
    projects: { default: config.firebase.projectId }
  }, null, 2);
  await writeFile(join(target, 'firebase', '.firebaserc'), firebaserc);
}

await client();
await firebase();
await root();
await config();
