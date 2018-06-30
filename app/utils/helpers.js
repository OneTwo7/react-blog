const path = require('path');
const fs = require('fs');
const User = require('mongoose').model('User');
const keys = require('../keys');
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

const hasError = (err, res, status = 400) => {
  if (err) {
    res.status(status);
    res.send({ reason: err.toString() });
    return true;
  }
  return false;
};

exports.prepareUser = prepareUser;

exports.hasError = hasError;

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

exports.uploadPictures = (res, files, pictureFields) => {
  return new Promise((resolve, reject) => {
    if (!pictureFields) {
      resolve([]);
    }

    const fiveMegaBytes = 5 * 1024 * 1024;
    const fields = Array.prototype.concat(pictureFields);
    const fieldsLength = fields.length;
    const pictures = [];

    for (let file of files) {
      const { originalname, filename, mimetype, size, path: tempPath } = file;

      if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
        fs.unlink(tempPath, err => {
          if (!hasError(err, res, 500)) {
            reject('Wrong file type!');
          }
        });
        return;
      }

      if (size > fiveMegaBytes) {
        fs.unlink(tempPath, err => {
          if (!hasError(err, res, 500)) {
            reject(`Picture ${originalname} is too big!`);
          }
        });
        return;
      }

      if (s3) {
        const target = path.join(
          'blog', filename + path.extname(originalname)
        );

        fs.readFile(tempPath, (err, data) => {
          if (!hasError(err, res)) {
            s3.upload({
              Key: target,
              Body: data,
              ACL: 'public-read'
            }, (err, data) => {
              fs.unlink(tempPath, (err) => {
                if (hasError(err, res, 500)) {
                  return;
                }
              });

              if (!hasError(err, res)) {
                pictures.push({
                  field: fields.shift(),
                  url: data.Location
                });
                if (pictures.length === fieldsLength) {
                  resolve(pictures);
                }
              }
            });
          }
        });
      } else {
        const target = path.join(keys.uploadsPath, originalname);

        fs.rename(tempPath, target, err => {
          if (!hasError(err, res, 500)) {
            pictures.push({
              field: fields.shift(),
              url: `/img/uploads/${originalname}`
            });
            if (pictures.length === fieldsLength) {
              resolve(pictures);
            }
          }
        });
      }
    }
  });
};

exports.handleSocialLogin = (id, name, done) => {
  User.findOne({ id }).exec((err, existingUser) => {
    if (existingUser) {
      done(null, existingUser);
    } else {
      const user = new User({ id, name });
      user.save().then(err => {
        done(null, user);
      });
    }
  });
}
