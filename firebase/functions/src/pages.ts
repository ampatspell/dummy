import { FieldValue } from 'firebase-admin/firestore';
import Application from './app';

export class PagesService {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async onPageView(id: string) {
    this.app.logger.info('pages.on-page-view', id);
    const docRef = this.app.firestore.doc(`pages/${id}`);
    try {
      await docRef.update({
        views: FieldValue.increment(1),
      });
    } catch (err) {
      this.app.logger.info('pages.on-page-view failed', err);
    }
  }
}
