const mongoose = require("mongoose");

const PostSchema = require("./posts.schema").PostSchema;

const PostModel = mongoose.model("PostModel", PostSchema);

function createPost(Post) {
  return PostModel.create(Post);
}

function returnAllPost() {
  return PostModel.find().exec();
}

function getPostById(id) {
  return PostModel.findById(id).exec();
}

// function findPostByColor(pokeColor) {
//   return PostModel.find({ color: pokeColor }).exec();
// }

function deletePost(PostId) {
  return PostModel.deleteOne({ _id: PostId }).exec();
}

function findPostByUsername(username) {
  return PostModel.find({ username: username }).exec();
}

module.exports = {
  createPost,
  returnAllPost,
  getPostById,
  //   findPostByColor,
  deletePost,
  findPostByUsername,
};
