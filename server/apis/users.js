const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const UserModel = require("../db/user/user.model");

router.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await UserModel.findUserByUsername(username);
    if (!user) {
      return res.status(404).send("User not found!");
    }

    if (user.password !== password) {
      return res.status(403).send("Invalid Password!");
    }
    console.log("Log in informatioin:", user.username, user.password);
    const token = jwt.sign(username, "PASSWORD");
    res.cookie("username", token);
    res.status(200).json({ username });
  } catch (e) {
    res.status(500).send("Server Error!");
  }
});

router.post("/signup", async function (req, res) {
  const { username, password } = req.body;
  console.log(username, password);

  try {
    if (!username || !password) {
      return res.status(409).send("Missing username or password");
    }
    const createUserResponse = await UserModel.createUser({
      username: username,
      password: password,
    });
    const token = jwt.sign(username, "PASSWORD");
    res.cookie("username", token);
    return res.json({ message: "User created successfully", username });
  } catch (e) {
    res.status(401).send("Username already exists!");
  }
});

router.get("/isLoggedIn", async function (req, res) {
  const username = req.cookies.username;

  if (!username) {
    return res.send({ username: null });
  }
  let decryptedUsername;
  try {
    decryptedUsername = jwt.verify(username, "PASSWORD");
  } catch (e) {
    return res.send({ username: null });
  }

  if (!decryptedUsername) {
    return res.send({ username: null });
  } else {
    return res.send({ username: decryptedUsername });
  }
});

router.post("/logOut", async function (req, res) {
  console.log("get log out request");
  res.cookie("username", "", {
    maxAge: 0,
  });

  res.send(true);
});

router.get("/:username", async function (req, res) {
  const username = req.params.username;
  const userData = await UserModel.findUserByUsername(username);
  return res.send(userData);
});

module.exports = router;
