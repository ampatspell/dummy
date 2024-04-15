import { initializeApp } from 'firebase-admin/app';
import Application from '../../src/app';
import functionsTest from 'firebase-functions-test';
import config from './config.json';
import { FeaturesList } from 'firebase-functions-test/lib/features';

const test = functionsTest(config.firebase, config.serviceAccountKeyPath);
const instance = initializeApp();

const logger = {
  info: console.info.bind(console),
};

const key = '__setup';

type Setup = {
  app: Application;
  test: FeaturesList;
}

export const setup = (caller: Mocha.Suite) => {
  caller.beforeEach(() => {
    const app = new Application({ instance, logger });
    (caller as any)[key] = { app, test };
  });
};

export const getTestApp = (caller: Mocha.Suite) => {
  const setup = (caller as any)[key] as Setup;
  return setup.app;
};
