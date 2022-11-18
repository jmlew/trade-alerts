import { environment } from '@trade-alerts/shared/environments';

import { EnvVar } from './env-var.enum';

export function getEnvVar(envVar: EnvVar | string): string {
  const value = process.env[envVar];
  console.log('getEnvVar', envVar, value);
  if (value == null) {
    throw Error(
      `The environment variable ${envVar} does not exist in the apps/web-app/.env file.`
    );
  }
  return process.env[envVar] as string;
}

export function isProd(): boolean {
  return environment.production;
}

export function isDev(): boolean {
  return !environment.production;
}

export function isUseMockInDev(): boolean {
  return environment.useMockInDev;
}

export function isCypress(): boolean {
  return (window as any).Cypress;
}

export function isJest(): boolean {
  return process.env['JEST_WORKER_ID'] !== undefined;
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}
