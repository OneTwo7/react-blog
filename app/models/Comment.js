const mongoose   = require('mongoose');
const { Schema } = mongoose;
const User       = mongoose.model('User');
const Post       = mongoose.model('Post');

const commentSchema = Schema({
  author:     { type: Schema.Types.ObjectId, ref: 'User' },
  post_id:    { type: Schema.Types.ObjectId, ref: 'Post' },
  content:    { type: String, required: '{PATH} is required!' },
  created_at: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

const content1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const content2 = 'You\'ve got a lot to learn, Johnny.';

(async () => {
  try {
    const comments = await Comment.find({}).exec();
    if (comments.length === 0) {
      const admin  = await User.findOne({ email: 'admin@example.com' });
      const guest  = await User.findOne({ email: 'guest@example.com' });
      const first  = await Post.findOne({ title: 'First' });
      const second = await Post.findOne({ title: 'Second' });

      const newComments = [
        { author: admin._id, post_id: first._id,  content: content1 },
        { author: guest._id, post_id: first._id,  content: content1 },
        { author: admin._id, post_id: first._id,  content: content2 },
        { author: guest._id, post_id: second._id, content: content1 },
        { author: admin._id, post_id: second._id, content: content1 },
      ];

      Comment.insertMany(newComments);
    }
  } catch (e) {
    console.log(e);
  }
})();
