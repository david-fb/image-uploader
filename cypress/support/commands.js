import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

Cypress.Commands.add('login', (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
});
