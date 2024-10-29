import { Param } from "firebase-functions/lib/params/types";
import { defineString } from "firebase-functions/params";

const param = <T extends string | number | boolean | string[]> (param: Param<T>) => {
  return () => param.value();
};

export const config = {
  adminEmail: param(defineString('ADMIN_EMAIL', { description: 'admin email' })),
} as const;

export type Config = typeof config;
