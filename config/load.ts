import all from '../config';
import { readFile } from 'node:fs/promises';

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

export const forEnvironment = async (name: string): Promise<LoadedEnvironmentConfig> => {
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

console.log(await forEnvironment('default'));
