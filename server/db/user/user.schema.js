const Schema = require("mongoose").Schema;

exports.UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    timeJoined: {
      type: Date,
      default: Date.now,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { collection: "userTable" }
);
