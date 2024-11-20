import assert from 'assert';
import { getTestApp, setup } from './helpers/setup';
import { getStorageHelper, storage } from './helpers/storage';
import { firestore, getFirestoreHelper } from './helpers/firestore';

describe('assets', function () {
  setup(this);
  storage(this);
  firestore(this);

  it('resolve path for original', async () => {
    const app = getTestApp(this);
    const paths: [string, boolean][] = [
      ['foo/bar', false],
      ['foo/bar/baz.jpg', false],
      ['assets/foo/thumbnails/film-000.jpg', false],
      ['assets/foo/film-000.jpg', true],
    ];
    paths.forEach(([path, expected]) => {
      const resolved = app.assets.resolvePathForOriginal(path);
      assert.strictEqual(!!resolved, expected);
    });
  });

  it('handles image upload', async () => {
    const app = getTestApp(this);
    const storage = getStorageHelper(this);
    const firestore = getFirestoreHelper(this);

    await firestore.recursiveDelete('assets');

    await storage.uploadFile('film-0647-018.png', 'assets/main/film-0647-018.png');

    const gallery = app.assets.folder('main');
    const res = await gallery.onStorageFileFinalized('film-0647-018.png', 'image/png', 192);

    {
      const snapshot = await res!.gallery.get();
      const data = snapshot.data();
      assert.deepEqual(data, { name: 'main', files: 0 });
    }
    {
      const snapshot = await res!.file.get();
      const data = snapshot.data();

      assert.deepEqual(data, {
        original: {
          size: { width: 2048, height: 1365 },
          url: data!.original.url,
        },
        thumbnails: {
          '2048x2048': {
            size: { width: 2048, height: 1365 },
            url: data!.thumbnails!['2048x2048'].url,
          },
          '120x120': {
            size: { width: 120, height: 80 },
            url: data!.thumbnails!['120x120'].url,
          },
        },
        name: 'film-0647-018.png',
        contentType: 'image/png',
        type: 'image',
        size: 192,
        createdAt: data!.createdAt,
      });
    }
  });

  it('handles non-image upload', async () => {
    const app = getTestApp(this);
    const storage = getStorageHelper(this);
    const firestore = getFirestoreHelper(this);

    await firestore.recursiveDelete('assets');

    await storage.uploadFile('random.txt', 'assets/main/random.txt');

    const gallery = app.assets.folder('main');
    const res = await gallery.onStorageFileFinalized('random.txt', 'text/plain', 11);

    {
      const snapshot = await res!.gallery.get();
      const data = snapshot.data();
      assert.deepEqual(data, { name: 'main', files: 0 });
    }
    {
      const snapshot = await res!.file.get();
      const data = snapshot.data();
      assert.deepEqual(data, {
        name: 'random.txt',
        contentType: 'text/plain',
        type: 'other',
        size: 11,
        original: {
          url: data!.original.url,
        },
        createdAt: data!.createdAt,
      });
    }
  });

  it('deletes files on document delete', async () => {
    const app = getTestApp(this);
    const storage = getStorageHelper(this);
    const firestore = getFirestoreHelper(this);

    await firestore.recursiveDelete('assets');

    await storage.uploadFile('film-0647-018.png', 'assets/main/film-0647-018.png');
    const gallery = app.assets.folder('main');

    await gallery.onStorageFileFinalized('film-0647-018.png', 'image/png', 192);

    {
      const metadata = await storage.getMetadata('assets/main/thumbnails/film-0647-018-2048x2048.jpeg');
      assert.ok(metadata?.contentType === 'image/jpeg');
    }

    await app.assets.onFileDeleted({ folder: 'main', file: 'film-0647-018.png' });

    {
      const metadata = await storage.getMetadata('assets/main/film-0647-018.png');
      assert.ok(!metadata);
    }
    {
      const metadata = await storage.getMetadata('assets/main/thumbnails/film-0647-018-2048x2048.jpeg');
      assert.ok(!metadata);
    }
    {
      const metadata = await storage.getMetadata('assets/main/thumbnails/film-0647-018-120x120.jpeg');
      assert.ok(!metadata);
    }
  });
});
