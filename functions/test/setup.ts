import { initializeApp } from 'firebase-admin/app';
import Application from '../src/app';
import functionsTest from 'firebase-functions-test';
import { loadConfig } from '../../config/config';

loadConfig();

functionsTest({}, 'asd');
const instance = initializeApp();

const logger = {
  info: console.info.bind(console),
};

export const setup = () => {
  const app = new Application({ instance, logger });
  app.logger.info('hello');
}

setup();
