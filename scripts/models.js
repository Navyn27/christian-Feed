const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});
const sermonSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Sermon = mongoose.model("sermon", sermonSchema);
const Convos = mongoose.model("convo", sermonSchema);
const Subscriber = mongoose.model("Cfsubscriber", emailSchema);

module.exports = { Subscriber, Sermon, Convos };
