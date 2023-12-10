const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../db/user/user.model");
const path = require("path");
const dotenv = require("dotenv");
const router = express.Router();
const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

router.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const secretKey = process.env.JWT_SECRET || "defaultSecret";
  try {
    const user = await UserModel.findUserByUsername(username);
    if (!user) {
      return res.status(404).send("User not found!");
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(403).send("Invalid Password!");
    }
    const token = jwt.sign({ username }, secretKey, { expiresIn: 3600 });
    res.cookie("username", token);
    res.status(200).json({ username });
  } catch (e) {
    res.status(500).send("Server Error!");
  }
});

router.post("/signup", async function (req, res) {
  const { username, password } = req.body;
  const secretKey = process.env.JWT_SECRET || "defaultSecret";

  try {
    if (!username || !password) {
      return res.status(400).send("Missing username or password");
    }
    const existingUser = await UserModel.findUserByUsername(username);
    if (existingUser) {
      return res.status(409).send("Username already exists!");
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);
    const createUserResponse = await UserModel.createUser({
      username: username,
      password: encryptedPassword,
    });

    const token = jwt.sign({ username }, secretKey, { expiresIn: 3600 });
    res.cookie("username", token);
    return res
      .status(200)
      .json({ message: "User created successfully", username });
  } catch (e) {
    console.error("Error during signup:", e);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/isLoggedIn", async function (req, res) {
  const username = req.cookies.username;
  const secretKey = process.env.JWT_SECRET || "defaultSecret";
  let decryptedUsername;

  if (!username) {
    return res.send({ username: null });
  }
  try {
    const decodedToken = jwt.verify(username, secretKey);
    decryptedUsername = decodedToken.username;
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      console.error("Token has expired");
    } else {
      console.error("Token verification failed", e.message);
    }
    return res.send({ username: null });
  }

  if (!decryptedUsername) {
    return res.send({ username: null });
  } else {
    return res.send({ username: decryptedUsername });
  }
});

router.post("/logOut", async function (req, res) {
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
