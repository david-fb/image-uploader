import { boot } from 'quasar/wrappers';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from 'src/stores/user-store';

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

  onAuthStateChanged(app.config.globalProperties.$auth, async (user) => {
    const userState = useUserStore();

    if (user) {
      const userName = app.config.globalProperties.$auth.currentUser.displayName;
      userState.login(userName);
    } else {
      const { useImagesStore } = await import('src/stores/images-store');
      const imageState = useImagesStore();
      userState.logout();
      imageState.clearImages();
    }
  });
});
