import delayObj from './delay';
import users from './users';

const env = process.env.NODE_ENV || 'development';
const delay = delayObj[env];

let currentUser = null;

const authenticate = (email, password) => {
  const user = users.filter(user => user.email === email)[0];
  if (user && user.password === password) {
    return user;
  } else {
    return false;
  }
};

class AuthApi {
  static login (email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = authenticate(email, password);
        if (user) {
          currentUser = Object.assign({}, user);
          resolve(user);
        } else {
          reject('Invalid email/password pair');
        }
      }, delay);
    });
  }

  static logout () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        currentUser = null;
        resolve();
      }, delay);
    });
  }

  static getCurrentUser () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(currentUser);
      }, delay);
    });
  }
}

export default AuthApi;
