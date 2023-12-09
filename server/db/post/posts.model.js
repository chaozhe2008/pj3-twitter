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

function updatePostContent(postId, newContent) {
  return PostModel.findByIdAndUpdate(postId, { content: newContent }).exec();
}

function deletePost(postId) {
  return PostModel.deleteOne({ _id: postId }).exec();
}

function findPostByUsername(username) {
  return PostModel.find({ username: username }).exec();
}

module.exports = {
  createPost,
  returnAllPost,
  getPostById,
  deletePost,
  updatePostContent,
  findPostByUsername,
};
