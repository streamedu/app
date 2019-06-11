// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyDW_tqi9gP6n9TnxLPET2uvcDbn1Axfwng",
    authDomain: "streamedu-da926.firebaseapp.com",
    databaseURL: "https://streamedu-da926.firebaseio.com",
    projectId: "streamedu-da926",
    storageBucket: "streamedu-da926.appspot.com",
    messagingSenderId: "1026777076236",
    appId: "1:1026777076236:web:f7f5c9e2d2c5c9ca"
  },
  youtube: {
    key: "AIzaSyAS2M-XNK8Z9jso1sHU9bYSwyFL-KRmoVw",
    url: "https://www.googleapis.com/youtube/v3",
    channelId : "UCO-ctiKzNKCuUGUurWWDHkA",
    playList:    "UUO-ctiKzNKCuUGUurWWDHkA"
  },
  credencials: {
    "client_id": "914724794406-4j5pna3ctm7m2knrpbo96p7s4lbm5h7r.apps.googleusercontent.com", 
    "project_id": "streamedu-239917", 
    "auth_uri": "https://accounts.google.com/o/oauth2/auth", 
    "token_uri": "https://oauth2.googleapis.com/token", 
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", 
    "client_secret": "bvnVZgf1ekxLnKj70sEjTEO4", 
    "redirect_uris": ["http://localhost:8080/oauth2callback"], 
    "javascript_origins": ["http://localhost"] 
  },
  youtubeCredencials : {
    "clientID" : "914724794406-khqmhkg5h7q6urk0nqhlak8hpjdhmkm3.apps.googleusercontent.com",
    "secretClientID" : "yxhAtuYek_AmJSA2B3IRghSK",
    "client_id":"914724794406-khqmhkg5h7q6urk0nqhlak8hpjdhmkm3.apps.googleusercontent.com",
    "project_id":"streamedu-239917",
    "auth_uri":"https://accounts.google.com/o/oauth2/auth",
    "token_uri":"https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
    "client_secret":"yxhAtuYek_AmJSA2B3IRghSK",
    "redirect_uris":["http://localhost:4200/calback"],
    "javascript_origins":["http://localhost:4200"]
  },
  youtube2Credencials : {
    "client_id": "1026777076236-7a4nuo8orgdqmiri95hgr5f4cf85kbbr.apps.googleusercontent.com",
    "project_id": "streamedu-da926",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "aR_jyP_UWiy890WhpBVTs5-Q",
    "redirect_uris": ["http://localhost:4200/calback"],
    "javascript_origins": ["http://localhost:4200"]
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


