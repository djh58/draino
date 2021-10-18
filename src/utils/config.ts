import { config as dotenvConfig } from 'dotenv';
const { error } = dotenvConfig();

if (error) {
  throw new Error(`Could not load environment variables`);
}

interface IConfig {
  destAddress: string;
  providerURL: string;
}

export const getEnv = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`No value set for ${key}`);
  }
  return value;
}

export const config: IConfig = {
  destAddress: getEnv('DESTINATION_ADDRESS'),
  providerURL: getEnv('PROVIDER_URL')
}