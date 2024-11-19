import assert from 'assert';
import { getTestApp, setup } from './helpers/setup';
import { getStorageHelper, storage } from './helpers/storage';

describe('uploads', function () {
  setup(this);
  storage(this);

  it('resolve path for original', async () => {
    const app = getTestApp(this);
    const paths: [string, boolean][] = [
      ['foo/bar', false],
      ['foo/bar/baz.jpg', false],
      ['galleries/foo/thumbnails/film-000.jpg', false],
      ['galleries/foo/film-000.jpg', true],
    ];
    paths.forEach(([path, expected]) => {
      const resolved = app.galleries.resolvePathForOriginal(path);
      assert.strictEqual(!!resolved, expected);
    });
  });

  it('upload an image', async () => {
    const app = getTestApp(this);
    const storage = getStorageHelper(this);

    await storage.uploadFile('film-0647-018.png', 'galleries/main/film-0647-018.png');

    const gallery = app.galleries.gallery('main');
    const res = await gallery.onImageFinalized('film-0647-018.png');

    {
      const snapshot = await res.gallery.get();
      const data = snapshot.data();
      assert.deepEqual(data, { name: 'main', images: 0 });
    }
    {
      const snapshot = await res.image.get();
      const data = snapshot.data();

      assert.deepEqual(data, {
        original: {
          size: { width: 2048, height: 1365 },
          url: data!.original.url,
        },
        thumbnails: {
          '2048x2048': {
            size: { width: 2048, height: 1365 },
            url: data!.thumbnails['2048x2048'].url,
          },
          '120x120': {
            size: { width: 120, height: 80 },
            url: data!.thumbnails['120x120'].url,
          },
        },
        name: 'film-0647-018.png',
        createdAt: data!.createdAt,
      });
    }
  });

  it('deletes files on document delete', async () => {
    const app = getTestApp(this);
    const storage = getStorageHelper(this);
    await storage.uploadFile('film-0647-018.png', 'galleries/main/film-0647-018.png');
    const gallery = app.galleries.gallery('main');

    await gallery.onImageFinalized('film-0647-018.png');

    {
      const metadata = await storage.getMetadata('galleries/main/thumbnails/film-0647-018-2048x2048.jpeg');
      assert.ok(metadata?.contentType === 'image/jpeg');
    }

    await app.galleries.onImageDeleted({ gallery: 'main', image: 'film-0647-018.png' });

    {
      const metadata = await storage.getMetadata('galleries/main/film-0647-018.png');
      assert.ok(!metadata);
    }
    {
      const metadata = await storage.getMetadata('galleries/main/thumbnails/film-0647-018-2048x2048.jpeg');
      assert.ok(!metadata);
    }
    {
      const metadata = await storage.getMetadata('galleries/main/thumbnails/film-0647-018-120x120.jpeg');
      assert.ok(!metadata);
    }
  });
});
