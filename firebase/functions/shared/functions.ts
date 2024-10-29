export type WithAdminResponse<T> =
  | {
      status: 'success';
      result: T;
    }
  | {
      status: 'failed';
      reason: string;
    };

export type FunctionsRecordEventRequest = {
  type?: 'page-view';
  id?: string;
};

export type FunctionsRecordEventResponse = Record<string, never>;

export type FunctionsSetRoleEventRequest = {
  uid: string;
  role: string;
};

export type FunctionsSetRoleEventResponse = WithAdminResponse<
  | {
      status: 'success';
    }
  | {
      status: 'failed';
      reason: string;
    }
>;
