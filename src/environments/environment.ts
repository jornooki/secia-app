// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  apiUrl:'https://api-secia.herokuapp.com/',

  firebase: {
    apiKey: "AIzaSyAefXQgEly21HVWkTFWzkCl1RKNhrzGcPo",
    authDomain: "secia-app.firebaseapp.com",
    databaseURL: "https://secia-app.firebaseio.com",
    projectId: "secia-app",
    storageBucket: "secia-app.appspot.com",
    messagingSenderId: "537323069282",
    appId: "1:537323069282:web:0fe74c073d7ebce23f563b",
    measurementId: "G-HS7FGBZ57P"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
