import all from './config';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export type EnvironmentConfig = {
  firebase: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    appId: string;
  },
  serviceAccountKeyPath?: string;
};

export type LoadedEnvironmentConfig = EnvironmentConfig & { serviceAccountKey?: Record<string, unknown> };

export type Config = {
  [key: string]: EnvironmentConfig;
};

export const forEnvironment = async (name: keyof typeof all): Promise<LoadedEnvironmentConfig> => {
  const config = all[name] as (EnvironmentConfig | undefined);
  if(!config) {
    throw new Error(`Configuration for environment '${name}' not found`);
  }
  if(config.serviceAccountKeyPath) {
    const string = await readFile(config.serviceAccountKeyPath, 'utf-8');
    const json = JSON.parse(string);
    return Object.assign({}, config, { serviceAccountKey: json });
  }
  return config;
}

// dirnameForURL(import.meta.url)
export const dirnameForURL = (url: string) => dirname(fileURLToPath(url));

const root = join(dirnameForURL(import.meta.url), '..', '..');

const writeJson = async (path: string, object: any) => {
  const location = join(root, path);
  await writeFile(location, JSON.stringify(object, null, 2));
}

export const writeTestConfig = async (config: LoadedEnvironmentConfig) => {
  await writeJson('firebase/functions/test/helpers/config.json', config);
}

export const writeSvelteConfig = async (config: LoadedEnvironmentConfig) => {
}
