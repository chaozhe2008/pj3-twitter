const express = require("express");
const router = express.Router();
const PostModel = require("../db/post/posts.model");
const jwt = require("jsonwebtoken");

const postDB = [
  {
    user: "pikachu",
    color: "yellow",
    health: 100,
  },
];

// POST localhost:8000/api/Post/
router.post("/", async function (request, response) {
  const newPost = request.body;
  const username = request.cookies.username;

  let decryptedUsername;
  try {
    decryptedUsername = jwt.verify(username, "PASSWORD");
  } catch (e) {
    return response.status(404).send("Invalid request");
  }

  newPost.username = decryptedUsername;

  // if(!newPost.color || !newPost.name || !newPost.health) {
  //     return response.status(422).send("Missing argument to create new Post");
  // }

  try {
    const createPostResponse = await PostModel.createPost(newPost);
    console.log(createPostResponse);
    return response.send("Post Successfully Created: " + createPostResponse);
  } catch (error) {
    return response.status(500).send(error);
  }

  //    PostDb.push(newPost);

  //response.status(200).send("Post " + newPost.name + " was created successfully");
});

router.get("/", function (request, response) {
  const username = request.cookies.username;

  let decryptedUsername;
  try {
    decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD");
  } catch (e) {
    return response.status(404).send("Invalid request");
  }

  PostModel.findPostByUsername(decryptedUsername)
    .then(function (dbResponse) {
      response.cookie("PostCount", dbResponse.length + 1);
      response.send(dbResponse);
    })
    .catch(function (error) {
      response.status(500).send(error);
    });
});

// http://localhost:8000/api/Post/pikachu
/*

    request.params = {
        name: pikachu
    }

*/
router.get("/:id", function (request, response) {
  const PostId = request.params.id;

  PostModel.getPostById(PostId)
    .then(function (dbResponse) {
      response.send(dbResponse);
    })
    .catch(function (error) {
      response.status(500).send(error);
    });
});

//http://localhost:8000/api/Post/find?color=yellow&size=large
router.get("/find", function (req, res) {
  const color = req.query.color;

  if (!color) {
    return res.send(PostDb);
  }

  const output = [];

  for (let Post of PostDb) {
    if (Post.color === color) {
      output.push(Post);
    }
  }

  res.send(output);
});

// http://localhost:8000 + /api/Post + /
router.get("/pikachu", function (req, res) {
  res.send("This is the pikachu");
});

router.get("/", function (req, res) {
  res.send("This is the the base Post route");
});

router.delete("/:PostId", async function (req, response) {
  const PostId = req.params.PostId;

  const deleteResponse = await PostModel.deletePost(PostId);
  return response.send("Successfully delete Post!");
});

router.post("/", function (req, res) {
  res.send("This is how you'll create new Post");
});

module.exports = router;
