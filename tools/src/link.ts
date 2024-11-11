import minimist from "minimist";
import { dummyRoot as source, note, symlinks, mkdirp, writeFile, copyFile, scope, UsageError } from "./utils";
import { join, resolve } from "path";
import { readFile } from "fs/promises";

let args = minimist(process.argv.slice(2));

const target = scope(() => {
  let path = args._[0];
  if(!path) {
    throw new UsageError('Target path is required');
  }
  return resolve(path);
});

const dryRun = !!args['dry-run'];

note('source', source);
note('target:', target);

const client = async () => {
  let paths = [
    'client/src/hooks.client.ts',
    'client/src/routes/(frontend)/[...path]',
    'client/src/routes/(frontend)/+layout.svelte',
    'client/src/routes/(frontend)/+layout.ts',
    'client/src/routes/backend',
    'client/src/routes/+layout.server.ts',
    'client/src/routes/+layout.svelte',
    'client/src/routes/+layout.ts',
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
    'firebase/functions/shared',
    'firebase/functions/test',
    'firebase/functions/.gitignore',
    'firebase/functions/.mocharc.json',
    'firebase/functions/tsconfig.json',
    'firebase/functions/eslint.config.js',
    'firebase/functions/.prettierignore',
    'firebase/functions/.prettierrc',
    'firebase/rules',
    'firebase/firebase.json',
    'firebase/package.json',
  ];

  await mkdirp({
    path: join(target, 'firebase/functions'),
    dryRun,
  });

  await symlinks({
    source,
    target,
    paths,
    dryRun,
  });

  await copyFile({
    source,
    target,
    path: 'firebase/functions/package.json',
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
  await writeFile({
    path: join(target, 'client', '.env'),
    data: client,
    dryRun,
  });

  let firebaserc = JSON.stringify({
    projects: { default: config.firebase.projectId }
  }, null, 2);
  await writeFile({
    path: join(target, 'firebase', '.firebaserc'),
    data: firebaserc,
    dryRun,
  });
}

await client();
await firebase();
await root();
await config();
