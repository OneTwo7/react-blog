const mongoose = require('mongoose');
const { Schema } = mongoose;

const pictureSchema = Schema({
  field: { type: String, required: '{PATH} is required!' },
  url:   { type: String, required: '{PATH} is required!' }
});

module.exports = pictureSchema;
