// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  apiUrl: 'http://localhost:8000/api/',

  stripe: {
    publishableKey: 'pk_test_51LxluOFEu1F8Aw4ZFU3RtCL17JX0zICqtplmw3ereucD6pSNkh3BNoZIGHolOaBDzV4YG0eBse1jeG6rJbJiiQxN005p5lBK6R',
    secretKey: 'sk_test_51LxluOFEu1F8Aw4ZwuUrgemdMVPM8uIQiek2Lv42AKe0PIQj73rZ66kmz75LoJWai6vUyil7iCnZo6Wpe5zauj3d00AINA9WUt',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
