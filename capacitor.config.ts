import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'jp.socious.network',
  appName: 'Socious',
  webDir: 'dist',
  server: { hostname: 'dev-id.socious.io', androidScheme: 'https', iosScheme: 'https' },
  plugins: {
    CapacitorCookies: { enabled: true },
    PushNotifications: { presentationOptions: ['badge', 'sound', 'alert'] },
  },
};

export default config;
