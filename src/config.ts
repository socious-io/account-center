export const config = {
  env: import.meta.env.VITE_ENV,
  baseURL: import.meta.env.VITE_BASE_URL,
  appBaseURL: import.meta.env.VITE_APP_URL,
  workURL: import.meta.env.VITE_WORK_URL,
  fundURL: import.meta.env.VITE_FUND_URL,
  verifyURL: import.meta.env.VITE_VERIFY_URL,
  basePath: import.meta.env.VITE_BASE_PATH,
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  dappENV: import.meta.env.VITE_DAPP_ENV,
  logDiscordWebHook: import.meta.env.VITE_LOG_DISCORD_WEBHOOK,
};

export const isTestingEnvironment = config.env === 'test';
