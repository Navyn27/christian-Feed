const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});
const scriptureSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
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
    title: {
      type: String,
      required: true,
    },
    snippet: {
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
const convosSchema = new Schema(
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
    contribution: {
      type: Array,
      required: false,
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

const Scripture = mongoose.model("scripture", scriptureSchema);
const Sermon = mongoose.model("sermon", sermonSchema);
const Convos = mongoose.model("convo", convosSchema);
const Subscriber = mongoose.model("Cfsubscriber", emailSchema);

module.exports = { Scripture, Subscriber, Sermon, Convos };
