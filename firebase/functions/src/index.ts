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
  return await app.identity.onBeforeUserCreated(event.data);
});

export const storageOnFinalized = functions.storage.onObjectFinalized(
  { memory: '4GiB', concurrency: 25 },
  async (event) => {
    await app.galleries.onObjectFinalized(event.data.name, event.data.contentType);
  },
);

export const galleryImageOnCreated = functions.firestore.onDocumentCreated(
  'galleries/{gallery}/images/{image}',
  async (event) => {
    const { gallery, image } = event.params;
    await app.galleries.onImageCreated({ gallery, image });
  },
);

export const galleryImageOnDeleted = functions.firestore.onDocumentDeleted(
  'galleries/{gallery}/images/{image}',
  async (event) => {
    const { gallery, image } = event.params;
    await app.galleries.onImageDeleted({ gallery, image });
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
