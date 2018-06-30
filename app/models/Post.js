const mongoose      = require('mongoose');
const { Schema }    = mongoose;
const User          = mongoose.model('User');
const pictureSchema = require('./Picture');

const postSchema = Schema({
  author:     { type: Schema.Types.ObjectId, ref: 'User' },
  title:      { type: String, required: '{PATH} is required!' },
  content:    { type: String, required: '{PATH} is required!' },
  category:   { type: String, required: '{PATH} is required!' },
  tags:       { type: String },
  created_at: { type: Date, default: Date.now },
  pictures:   [pictureSchema]
});

const Post = mongoose.model('Post', postSchema);

const text1 = '<h2>Lorem ipsum dolor sit amet</h2>' +
'Consectetur adipiscing elit. Sed arcu nunc, porttitor in pellentesque ' +
'vitae, lobortis vitae lacus. Pellentesque et neque porta, volutpat nisi in,' +
' interdum ipsum. Praesent pulvinar nibh vel fringilla pharetra. Sed varius' +
' nunc. <em>Maecenas</em> in ipsum in velit consequat porttitor. Maecenas ' +
'augue mauris, efficitur id orci a, fringilla placerat quam. Cras rutrum ' +
'enim risus. In dictum, quam at commodo sollicitudin, lacus risus placerat ' +
'metus, vel sodales nunc nulla blandit <a href="/">molestie</a> enim.';

const text2 = '<h2>Lorem ipsum</h2>Consectetur elit.\r\n<a href="/">href</a>';

const code = `const path = require('path');

module.exports = (app) => {

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../src/index.html'));
  });

};`;

const shell = `me@laptop:~$ mongo
> use my_db
> show collections
> db.users.findOne({ name: 'Peter' })`;

const firstContent = JSON.stringify([
  { id: "field-0", type: "text",  content: text1 },
  { id: "field-1", type: "code",  content: code  },
  { id: "field-2", type: "shell", content: shell }
]);

const secondContent = JSON.stringify([
  { id: "field-0", type: "text",  content: text1 }
]);

const anotherContent = JSON.stringify([
  { id: "field-0", type: "text",  content: text2 }
]);

const samplePosts = [
  {
    title:    'First',
    content:  firstContent,
    category: 'Distinctive',
    tags:     'first sample'
  },
  {
    title:    'Second',
    content:  secondContent,
    category: 'Distinctive',
    tags:     'second sample'
  },
  {
    title:    'Another',
    content:  anotherContent,
    category: 'Generic',
    tags:     'another sample'
  }
];

(async () => {
  try {
    const posts = await Post.find({});
    if (posts.length === 0) {
      const guest = await User.findOne({ email: 'guest@example.com' });
      const admin = await User.findOne({ email: 'admin@example.com' });
      samplePosts[2].author = guest._id;
      for (let i = 0; i < 20; i++) {
        Post.create(samplePosts[2]);
      }
      samplePosts[1].author = admin._id;
      samplePosts[0].author = admin._id;
      Post.create(samplePosts[1]);
      Post.create(samplePosts[0]);
    }
  } catch (e) {
    console.log(e);
  }
})();
