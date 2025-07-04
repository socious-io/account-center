export const config = {
  env: import.meta.env.VITE_ENV,
  baseURL: import.meta.env.VITE_BASE_URL,
  accessExpire: import.meta.env.VITE_ACCESS_EXPIRE,
  refreshExpire: import.meta.env.VITE_REFRESH_EXPIRE,
  appBaseURL: import.meta.env.VITE_APP_URL,
  basePath: import.meta.env.VITE_BASE_PATH,
  logDiscordWebHook: import.meta.env.VITE_LOG_DISCORD_WEBHOOK,
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  dappENV: import.meta.env.VITE_DAPP_ENV,
};

export const isTestingEnvironment = config.env === 'test';
