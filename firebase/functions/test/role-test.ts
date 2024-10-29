import assert from "assert";
import { getTestApp, setup } from "./helpers/setup";

describe('role', function() {
  setup(this);

  it('get and set role', async () => {
    const app = getTestApp(this);
    let user = await app.auth.getUserByEmail('ampatspell@gmail.com');
    {
      await app.roles.setRole(user.uid, 'user');
      let role = await app.roles.getRole(user.uid);
      assert.strictEqual(role, 'user');
    }
    {
      await app.roles.setRole(user.uid, 'admin');
      let role = await app.roles.getRole(user.uid);
      assert.strictEqual(role, 'admin');
    }
  });
});
