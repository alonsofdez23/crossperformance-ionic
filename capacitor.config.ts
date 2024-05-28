import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'alonso.fernandez',
  appName: 'Cross Performance',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: 'white',
      showSpinner: true,
      androidSpinnerStyle: 'small',
      iosSpinnerStyle: 'small',
      spinnerColor: '#563722',
      splashFullScreen: true,
      splashInmersive: true,
      //useDialog: true,
    },
  }
};

export default config;
