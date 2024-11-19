import { FieldValue } from 'firebase-admin/firestore';
import Application from './app';
import { converter } from './utils/converter';
import { PageData } from '../shared/documents';

export class PagesService {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  pagesRef() {
    return this.app.firestore.collection('pages').withConverter(converter<PageData>());
  }

  pageRef(id: string) {
    return this.pagesRef().doc(id).withConverter(converter<PageData>());
  }

  async onPageView(id: string) {
    this.app.logger.info('pages.on-page-view', id);
    const docRef = this.pageRef(id);
    try {
      await docRef.update({
        views: FieldValue.increment(1),
      });
    } catch (err) {
      this.app.logger.info('pages.on-page-view failed', err);
    }
  }
}
