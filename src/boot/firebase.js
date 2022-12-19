import { boot } from 'quasar/wrappers';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
};

export default boot(({ app }) => {
  // Initialize Firebase
  app.config.globalProperties.$firebaseApp = initializeApp(firebaseConfig);
  app.config.globalProperties.$auth = getAuth(app.config.globalProperties.$firebase);

  onAuthStateChanged(app.config.globalProperties.$auth, (user) => {
    if (user) {
      console.log('logged in');
      console.log(app.config.globalProperties.$auth.currentUser.displayName);
    } else {
      console.log('logged out');
    }
  });
});
