import delayObj from './delay';

const env = process.env.NODE_ENV || 'development';
const delay = delayObj[env];

const posts = [];
const content = Array.apply(null, Array(10)).map(
  String.prototype.valueOf,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
).join(' ');

const replaceAll = (str, find, replace) => {
  return str.replace(new RegExp(find, 'g'), replace);
}

const generateId = (post) => {
  return replaceAll(post.title.toLowerCase(), ' ', '-');
};

for (let i = 0; i < 10; i++) {
  posts.push({
    title: `Post ${i}`,
    content: content
  });
  posts[i].id = generateId(posts[i]);
}

class PostApi {
  static getAllPosts () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], posts));
      }, delay);
    });
  }

  static savePost (post) {
    post = Object.assign({}, post); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minPostTitleLength = 4;
        if (post.title.length < minPostTitleLength) {
          reject(`Title must be at least ${minPostTitleLength} characters.`);
        }

        if (post.id) {
          const existingPostIndex = posts.findIndex(a => a.id == post.id);
          posts.splice(existingPostIndex, 1, post);
        } else {
          post.id = generateId(post);
          posts.push(post);
        }

        resolve(post);
      }, delay);
    });
  }

  static deletePost (postId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfpostToDelete = posts.findIndex(post => {
          post.id == postId;
        });
        posts.splice(indexOfpostToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default PostApi;
