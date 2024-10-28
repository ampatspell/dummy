import child from "child_process";
import { existsSync } from "fs";
import { dirname, join, relative, resolve } from "path";
import { fileURLToPath } from "url";

export const note = (...args: any[]) => {
  console.log('→', ...args);
}

export const dirnameForFileURL = (url: string) => dirname(fileURLToPath(url));

export const exec = (command: string) => {
  note(command);
  return new Promise((resolve, reject) => {
    let shell = child.spawn(command, [], { stdio: 'inherit', shell: true });
    shell.on('error', error => {
      console.log(error);
    });
    shell.on('close', code => {
      if(code !== 0) {
        return reject(`exec failed with code ${code}`);
      }
      console.log();
      resolve(0);
    });
  });
}

export const symlink = async (opts: { source: string; target: string; dryRun: boolean; }) => {
  let target = resolve(opts.target);
  let source = relative(dirname(target), resolve(opts.source));

  if(opts.dryRun) {
    console.log(`[DRY] ln -s ${source} ${target}`);
  } else {
    if(!existsSync(target)) {
      await exec(`ln -s ${source} ${target}`);
    } else {
      note(`exists: ${target}`);
    }
  }
}

export const dummyRoot = resolve(join(dirnameForFileURL(import.meta.url), '..', '..'));
export const dummyPath = (path: string) => join(dummyRoot, path);
