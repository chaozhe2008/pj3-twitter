const Schema = require("mongoose").Schema;

exports.PostSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    timePosted: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "postTable" }
);
