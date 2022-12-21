import { boot } from 'quasar/wrappers';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  app.config.globalProperties.$firebaseStorage = getStorage();
  connectStorageEmulator(app.config.globalProperties.$firebaseStorage, 'localhost', 9199);
});
