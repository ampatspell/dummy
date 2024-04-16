import { initializeApp } from 'firebase-admin/app';
import functions from 'firebase-functions/v2';
import * as logger from "firebase-functions/logger";
import Application from './app';

const instance = initializeApp();
const app = new Application({ instance, logger });

export const storageOnFinalized = functions.storage.onObjectFinalized({ memory: '2GiB' }, async (event) => {
  const contentType = event.data.contentType;
  if(!contentType?.startsWith('image/')) {
    return;
  }

  const name = event.data.name;
  if(name.includes('/thumbnails/')) {
    return;
  }

  app.logger.info('storageOnFinalized', name);
});
