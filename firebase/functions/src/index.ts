import { initializeApp } from 'firebase-admin/app';
import * as functions from 'firebase-functions/v2';
import * as logger from "firebase-functions/logger";
import Application from './app';

const instance = initializeApp();
const app = new Application({ instance, logger });

export const storageOnFinalized = functions.storage.onObjectFinalized({ memory: '2GiB' }, async (event) => {
  await app.galleries.onObjectFinalized(event.data.name, event.data.contentType);
});
