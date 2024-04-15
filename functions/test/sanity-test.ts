import assert from "assert";
import { getTestApp, setup } from "./helpers/setup";
import { getStorageHelper, storage } from "./helpers/storage";

describe('uploads', function() {
  setup(this);
  storage(this);

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
});
