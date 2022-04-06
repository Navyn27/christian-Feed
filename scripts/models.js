const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

const Subscriber = mongoose.model("Cfsubscriber", emailSchema);

module.exports = Subscriber;
