import { boot } from 'quasar/wrappers';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      getAuth(),
      (user) => {
        resolve(user);
      },
      reject
    );
  });
}

export default boot(({ router }) => {
  // something to do
  router.beforeEach(async (to, from, next) => {
    // Check to see if the route has the meta field "authRequired" set to true
    let authRequired = to.matched.some((route) => route.meta.authRequired);
    const auth = getAuth();
    let isAuthenticated = (await getCurrentUser()) !== null;

    if (authRequired) {
      if (isAuthenticated) {
        //User is already signed in. Continue on.
        next();
      } else {
        next({
          name: 'login',
        });
      }
    } else if (isAuthenticated && to.name === 'login') {
      next('/');
    } else {
      //Doesn't requrie authentication. Just continue on.
      next();
    }
  });
});
