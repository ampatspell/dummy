import { AuthData } from "firebase-functions/lib/common/providers/https";
import Application from "./app";

export type WithAdminResponse<T> = {
  status: 'success',
  result: T;
} | {
  status: 'failed',
  reason: string;
};

export const ADMIN = 'admin';

export class RoleService {
  constructor(private readonly app: Application) {}

  async getRole(uid: string) {
    let user = await this.app.auth.getUser(uid);
    return user.customClaims?.role;
  }

  async setRole(uid: string, role: string) {
    await this.app.auth.setCustomUserClaims(uid, {
      role
    });
  }

  async withAdmin<T>(auth: AuthData | undefined, cb: () => Promise<T>): Promise<WithAdminResponse<T>> {
    let failed = (reason: string): WithAdminResponse<T> => ({ status: 'failed', reason });
    if(auth) {
      let role = await this.getRole(auth.uid);
      if(role === ADMIN) {
        let result = await cb();
        return {
          status: 'success',
          result
        };
      } else {
        return failed('not an admin');
      }
    } else {
      return failed('not signed in');
    }
  }
}
