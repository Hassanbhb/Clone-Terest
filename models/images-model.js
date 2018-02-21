const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imgSchema = new Schema({
  title: String,
  url: String,
  owner: String,
  likes: Number,
  voters: [String]
});

const Img = mongoose.model('img', imgSchema);

module.exports = Img;
