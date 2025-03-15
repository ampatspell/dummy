import { initializeApp } from 'firebase-admin/app';
import * as functions from 'firebase-functions/v2';
import * as logger from 'firebase-functions/logger';
import Application from './app';
import {
  FunctionsRecordEventRequest,
  FunctionsRecordEventResponse,
  FunctionsSetRoleEventRequest,
  FunctionsSetRoleEventResponse,
} from '../shared/functions';
import { config } from './config';
import { isUserRole } from '../shared/documents';

const instance = initializeApp();
const app = new Application({ instance, logger, config: config });

export const userOnBeforeCreated = functions.identity.beforeUserCreated(async (event) => {
  const data = event.data;
  if (data) {
    return await app.identity.onBeforeUserCreated(data);
  }
  return undefined;
});

export const storageOnFinalized = functions.storage.onObjectFinalized(
  { memory: '4GiB', concurrency: 25 },
  async (event) => {
    await app.assets.onStorageObjectFinalized(event.data);
  },
);

export const assetsFileOnCreated = functions.firestore.onDocumentCreated(
  'assets/{folder}/files/{file}',
  async (event) => {
    const { folder, file } = event.params;
    await app.assets.onFileCreated({ folder, file });
  },
);

export const assetsFileOnDeleted = functions.firestore.onDocumentDeleted(
  'assets/{folder}/files/{file}',
  async (event) => {
    const { folder, file } = event.params;
    await app.assets.onFileDeleted({ folder, file });
  },
);

export const recordEvent = functions.https.onCall<FunctionsRecordEventRequest, Promise<FunctionsRecordEventResponse>>(
  async (event) => {
    const type = event.data.type;
    if (type === 'page-view') {
      const id = event.data.id;
      if (id) {
        await app.pages.onPageView(id);
      }
    }
    return {};
  },
);

export const setRole = functions.https.onCall<FunctionsSetRoleEventRequest, Promise<FunctionsSetRoleEventResponse>>(
  async (event) => {
    return await app.identity.withAdmin(event.auth, async () => {
      const uid = event.data.uid;
      const role = event.data.role;
      if (!uid || !role) {
        return {
          status: 'failed',
          reason: 'uid and role is required',
        };
      }
      if (!isUserRole(role)) {
        return {
          status: 'failed',
          reason: 'invalid role',
        };
      }
      await app.identity.setRole(uid, role);
      return {
        status: 'success',
      };
    });
  },
);
