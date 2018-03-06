import delayObj from './delay';
import PostApi from './mockPostApi';

const env = process.env.NODE_ENV || 'development';
const delay = delayObj[env];

let idCounter = 0;

const comments = [];

const generateId = () => {
  return (++idCounter).toString();
};

for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 3; j++) {
    comments.push({
      author: j % 2 + 1,
      post_id: 'post-' + i,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      created_at: new Date()
    });
    comments[i * 3 + j].id = generateId();
  }
}

class CommentApi {
  static getCommentsByPostId (id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const postComments = comments.filter(c => c.post_id === id)
        resolve(Object.assign([], postComments));
      }, delay);
    });
  }

  static saveComment (comment) {
    comment = Object.assign({}, comment); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minContentLength = 1;
        if (comment.content.length < minContentLength) {
          reject(`Content must be at least ${minContentLength} characters.`);
        }

        if (comment.id) {
          const idx = comments.findIndex(c => c.id === comment.id);
          comments.splice(idx, 1, comment);
        } else {
          comment.id = generateId().toString();
          comments.push(comment);
          PostApi.updateCommentsCount(comment.post_id, 1).catch(error => {
            throw(error);
          });
        }

        resolve(comment);
      }, delay);
    });
  }

  static deleteComment (id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = comments.findIndex(c => c.id === id);
        const postId = comments.find(c => c.id === id).post_id;
        comments.splice(idx, 1);
        PostApi.updateCommentsCount(postId, -1).catch(error => {
          throw(error);
        });
        resolve(postId);
      }, delay);
    });
  }
}

export default CommentApi;
