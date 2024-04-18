import assert from "assert";
import { getTestApp, setup } from "./helpers/setup";
import { getStorageHelper, storage } from "./helpers/storage";

describe('uploads', function() {
  setup(this);
  storage(this);

  it('resolve path for original', async () => {
    const app = getTestApp(this);
    const paths: [string, boolean][] = [
      [ 'foo/bar', false ],
      [ 'foo/bar/baz.jpg', false ],
      [ 'galleries/foo/thumbnails/film-000.jpg', false ],
      [ 'galleries/foo/film-000.jpg', true ],
    ];
    paths.forEach(([ path, expected ]) => {
      const resolved = app.galleries.resolvePathForOriginal(path);
      assert.strictEqual(!!resolved, expected);
    });
  });

  it('upload a file', async () => {
    const app = getTestApp(this);
    const storage = getStorageHelper(this);

    await storage.uploadFile('film-0647-018.png', 'galleries/main/film-0647-018.png');

    const gallery = app.galleries.gallery('main');
    let res = await gallery.onImageFinalized('film-0647-018.png');

    {
      let snapshot = await res.gallery.get();
      let data = snapshot.data();
      assert.deepEqual(data, { name: 'main' });
    }
    {
      let snapshot = await res.image.get();
      let data = snapshot.data();
      assert.deepEqual(data, {
        sizes: {
          original: {
            size: { width: 2048, height: 1365 },
            url: data!.sizes.original.url,
          },
          '2048x2048': {
            size: { width: 2048, height: 1365 },
            url: data!.sizes['2048x2048'].url,
          },
          '120x120': {
            size: { width: 120, height: 80 },
            url: data!.sizes['120x120'].url,
          }
        },
        name: 'film-0647-018.png',
        createdAt: data!.createdAt,
      });
    }
  });

  it('NOW deletes documents on file delete', async () => {
    const app = getTestApp(this);
    const storage = getStorageHelper(this);
    await storage.uploadFile('film-0647-018.png', 'galleries/main/film-0647-018.png');
    const gallery = app.galleries.gallery('main');

    let res = await gallery.onImageFinalized('film-0647-018.png');

    {
      let metadata = await storage.getMetadata('galleries/main/thumbnails/film-0647-018-2048x2048.jpeg');
      assert.ok(metadata.contentType === 'image/jpeg');
    }

    await app.galleries.onObjectDeleted('galleries/main/film-0647-018.png');

    {
      let snapshot = await res.image.get();
      assert.ok(!snapshot.exists);
    }
    {
      let metadata = await storage.getMetadata('galleries/main/thumbnails/film-0647-018-2048x2048.jpeg');
      assert.ok(!metadata);
    }
    {
      let metadata = await storage.getMetadata('galleries/main/thumbnails/film-0647-018-120x120.jpeg');
      assert.ok(!metadata);
    }
  });
});
