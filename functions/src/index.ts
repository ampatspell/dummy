import { initializeApp } from 'firebase-admin/app';
import functions from 'firebase-functions/v2';
import * as logger from "firebase-functions/logger";
import Application from './app';

const instance = initializeApp();
const app = new Application({ instance, logger });

export const storageOnFinalized = functions.storage.onObjectFinalized({}, async (event) => {



});
