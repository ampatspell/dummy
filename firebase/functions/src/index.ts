import { initializeApp } from 'firebase-admin/app';
import * as functions from 'firebase-functions/v2';
import * as logger from "firebase-functions/logger";
import Application from './app';
import { FunctionsRecordEventRequest, FunctionsRecordEventResponse, FunctionsSetRoleEventRequest, FunctionsSetRoleEventResponse } from './shared/functions';
import { config } from './config';

const instance = initializeApp();
const app = new Application({ instance, logger, config: config });

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

export const setRole = functions.https.onCall<FunctionsSetRoleEventRequest, Promise<FunctionsSetRoleEventResponse>>(async (event) => {
  return await app.roles.withAdmin(event.auth, async () => {
    const uid = event.data.uid;
    const role = event.data.role;
    if(!uid || !role) {
      return {
        status: 'failed',
        reason: 'uid and role is required'
      };
    }
    await app.roles.setRole(uid, role);
    return {
      status: 'success'
    };
  });
});
