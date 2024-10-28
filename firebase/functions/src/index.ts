import { initializeApp } from 'firebase-admin/app';
import * as functions from 'firebase-functions/v2';
import * as logger from "firebase-functions/logger";
import Application from './app';
import { FunctionsRecordEventRequest, FunctionsRecordEventResponse } from './shared/functions';

const instance = initializeApp();
const app = new Application({ instance, logger });

export const storageOnFinalized = functions.storage.onObjectFinalized({ memory: '2GiB' }, async (event) => {
  await app.galleries.onObjectFinalized(event.data.name, event.data.contentType);
});

export const storageOnDeleted = functions.storage.onObjectDeleted(async (event) => {
  await app.galleries.onObjectDeleted(event.data.name);
});

export const recordEvent = functions.https.onCall<FunctionsRecordEventRequest, Promise<FunctionsRecordEventResponse>>(async (event) => {
  const type = event.data.type;
  if(type === 'page-view') {
    const id = event.data.id;
    if(id) {
      await app.pages.onPageView(id);
    }
  }
  return {};
});
