import delayObj from './delay';
import users from './users';

const env = process.env.NODE_ENV || 'development';
const delay = delayObj[env];

class UserApi {
  static getAllUsers () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], users));
      }, delay);
    });
  }
}

export default UserApi;
