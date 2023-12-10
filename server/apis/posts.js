const express = require("express");
const router = express.Router();
const PostModel = require("../db/post/posts.model");
const jwt = require("jsonwebtoken");
const path = require("path");
const dotenv = require("dotenv");
const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

router.get("/", async function (request, response) {
  try {
    const posts = await PostModel.returnAllPost();
    response.send(posts);
  } catch (error) {
    response.status(500).send("Error fetching all posts");
  }
});

router.post("/", async function (request, response) {
  const newPost = request.body;
  const username = request.cookies.username;
  const secretKey = process.env.JWT_SECRET || "defaultSecret";
  let decryptedUsername;
  try {
    const decodedToken = jwt.verify(username, secretKey);
    decryptedUsername = decodedToken.username;
  } catch (e) {
    return response.status(404).send("Invalid request");
  }
  newPost.username = decryptedUsername;
  try {
    const createPostResponse = await PostModel.createPost(newPost);
    return response.send("Post Successfully Created: " + createPostResponse);
  } catch (error) {
    return response.status(500).send(error);
  }
});

router.get("/:username", async function (request, response) {
  const { username } = request.params;
  try {
    const posts = await PostModel.findPostByUsername(username);
    response.status(200).json(posts);
  } catch (error) {
    response.status(500).send(error.message);
  }
});

router.get("/post/:id", async function (request, response) {
  const postId = request.params.id;
  try {
    const post = await PostModel.getPostById(postId);
    response.status(200).json(post);
  } catch (error) {
    response.status(500).send(error.message);
  }
});

router.put("/:id", async function (request, response) {
  const postId = request.params.id;
  const newContent = request.body.content;

  try {
    await PostModel.updatePostContent(postId, newContent);
    response.status(200).send("Post updated successfully");
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete("/:id", async function (request, response) {
  const postId = request.params.id;

  try {
    await PostModel.deletePost(postId);
    response.status(200).send("Post deleted successfully");
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;
