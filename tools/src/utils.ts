import child from "child_process";
import { existsSync } from "fs";
import { dirname, join, resolve } from "path";
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

export const symlink = async (from: string, to: string) => {
  from = resolve(from);
  to = resolve(to);
  if(!existsSync(to)) {
    await exec(`ln -s ${from} ${to}`);
  } else {
    note(`Exists: ${to}`);
  }
}

export const dummyRoot = resolve(join(dirnameForFileURL(import.meta.url), '..', '..'));
export const dummyPath = (path: string) => join(dummyRoot, path);
