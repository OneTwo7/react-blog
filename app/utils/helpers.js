const User = require('mongoose').model('User');
const keys = require('../keys');
const path = require('path');
const fs = require('fs');
const util = require('util');
const unlink = util.promisify(fs.unlink);
const readFile = util.promisify(fs.readFile);
const rename = util.promisify(fs.rename);
let s3;

if (keys.s3Region) {
  const AWS = require('aws-sdk');
  AWS.config.update({
    accessKeyId: keys.s3AccessKey,
    secretAccessKey: keys.s3SecretKey,
    region: keys.s3Region
  });
  s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: keys.s3Bucket }
  });
}

const prepareUser = ({ _id, email, name, roles }) => ({
  _id, email, name, roles
});

exports.prepareUser = prepareUser;

exports.sendUser = (req, res) => {
  if (req.user) {
    res.send(prepareUser(req.user));
  } else {
    res.send(null);
  }
};

exports.logoutUser = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.redirect = (req, res) => {
  res.redirect('/');
};

exports.uploadPictures = async (files, pictureFields) => {
  try {
    if (!pictureFields) {
      return [];
    }

    const fiveMegaBytes = 5 * 1024 * 1024;
    const fields = Array.prototype.concat(pictureFields);
    const fieldsLength = fields.length;
    const pictures = [];

    for (let file of files) {
      const { originalname, filename, mimetype, size, path: tempPath } = file;

      if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
        await unlink(tempPath);
        throw `File ${originalname} is not a picture!`;
      }

      if (size > fiveMegaBytes) {
        await unlink(tempPath);
        throw `Picture ${originalname} is too big!`;
      }

      if (s3) {
        const pictureName = filename + path.extname(originalname);
        const target = path.join('blog', pictureName);

        const data = await readFile(tempPath);
        const options = { Key: target, Body: data, ACL: 'public-read' };
        const uploadedPicture = await s3.upload(options);

        pictures.push({
          field: fields.shift(),
          url: uploadedPicture.Location
        });
      } else {
        const target = path.join(keys.uploadsPath, originalname);

        await rename(tempPath, target);

        pictures.push({
          field: fields.shift(),
          url: `/img/uploads/${originalname}`
        });
      }
    }

    return pictures;
  } catch (e) {
    throw new Error(e);
  }
};

exports.handleSocialLogin = async (id, name, done) => {
  try {
    const existingUser = await User.findOne({ id });
    if (existingUser) {
      done(null, existingUser);
    } else {
      const user = await new User({ id, name, activated: true }).save();
      done(null, user);
    }
  } catch (e) {
    done(e);
  }
};

exports.populateAuthorField = (item, user) => {
  const populatedItem = item.toObject();
  populatedItem.author = { _id: user._id, name: user.name };
  return populatedItem;
};
