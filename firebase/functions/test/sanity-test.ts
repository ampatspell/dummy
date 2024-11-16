import assert from 'assert';
import { getTestApp, setup } from './helpers/setup';
import { FieldValue } from 'firebase-admin/firestore';

describe('sanity', function () {
  setup(this);

  it('firestore undefined', async () => {
    const app = getTestApp(this);
    const ref = app.firestore.doc('foo/bar');

    await ref.set({
      name: 'zeeba',
    });

    await ref.set({
      name: FieldValue.delete(),
      email: 'zeeba@gmail.com',
    }, { merge: true });

    {
      const snapshot = await ref.get();
      assert.deepEqual(snapshot.data(), {
        email: 'zeeba@gmail.com',
      });
    }
  });
});
