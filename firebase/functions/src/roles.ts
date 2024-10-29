import type { AuthData } from 'firebase-functions/lib/common/providers/https';
import Application from './app';
import { UserRecord } from 'firebase-admin/auth';
import { WithAdminResponse } from '../shared/functions';

export const ADMIN = 'admin';

export class RoleService {
  constructor(private readonly app: Application) {}

  async getUserByUid(uid: string) {
    return this.app.auth.getUser(uid);
  }

  getRole(user: UserRecord) {
    return user.customClaims?.role;
  }

  isAdmin(user: UserRecord) {
    return this.getRole(user) === ADMIN || user.email === this.app.config.adminEmail();
  }

  async isAdminByUid(uid: string) {
    const user = await this.getUserByUid(uid);
    return this.isAdmin(user);
  }

  async getRoleByUid(uid: string) {
    const user = await this.getUserByUid(uid);
    return this.getRole(user);
  }

  async setRole(uid: string, role: string) {
    await this.app.auth.setCustomUserClaims(uid, {
      role,
    });
  }

  async withAdmin<T>(auth: AuthData | undefined, cb: () => Promise<T>): Promise<WithAdminResponse<T>> {
    const failed = (reason: string): WithAdminResponse<T> => ({ status: 'failed', reason });
    if (auth) {
      if (await this.isAdminByUid(auth.uid)) {
        const result = await cb();
        return {
          status: 'success',
          result,
        };
      } else {
        return failed('not an admin');
      }
    } else {
      return failed('not signed in');
    }
  }
}
