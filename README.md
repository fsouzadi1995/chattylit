# 🔥💬 Chattylit

Chattylit is a real-time chat application made with Angular and Firebase/Firestore.

## Run

To run the app, you can either clone and create a new environments directory inside `src` and two environment files, one `environment.ts` and one `environment.prod.ts` that contains an environment object, filled with your firebase credentials.

Example:

```
export const environment = {
  production: false,
  firebase: {
    apiKey: '######',
    authDomain: 'somewhere.firebaseapp.com',
    projectId: 'chattylit-#####',
    storageBucket: '######.appspot.com',
    messagingSenderId: '123456789',
    appId: '1:9:999999999999999999999999',
    measurementId: 'someId',
  },
};
```


or you can [simply click here](https://chattylit-f08ee.web.app/).
