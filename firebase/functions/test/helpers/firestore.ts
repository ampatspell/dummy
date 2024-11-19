import Application from '../../src/app';
import { getTestApp } from './setup';

class FirestoreHelper {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async recursiveDelete(name: string) {
    await this.app.firestore.recursiveDelete(this.app.firestore.collection(name));
  }
}

export const firestore = (suite: Mocha.Suite) => {
  suite.beforeEach(() => {
    const app = getTestApp(suite);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (suite as any).firestore = new FirestoreHelper(app);
  });
};

export const getFirestoreHelper = (suite: Mocha.Suite) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (suite as any).firestore as FirestoreHelper;
};
