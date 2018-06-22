const path = require('path');
const fs = require('fs');

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
      const { originalname: name, path: tempPath, mimetype, size } = file;
      const target = path.join(__dirname, '../..', 'src/img/uploads', name);

      if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
        fs.unlink(tempPath, err => {
          if (!hasError(err, res, 500)) {
            reject('Wrong file type!');
          }
        });
      }

      if (size > fiveMegaBytes) {
        fs.unlink(tempPath, err => {
          if (!hasError(err, res, 500)) {
            reject(`Picture ${name} is too big!`);
          }
        });
      }

      fs.rename(tempPath, target, err => {
        if (!hasError(err, res, 500)) {
          pictures.push({
            field: fields.shift(),
            url: `/img/uploads/${name}`
          });
          if (pictures.length === fieldsLength) {
            resolve(pictures);
          }
        }
      });
    }
  });
};
