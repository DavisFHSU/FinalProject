const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const funFactSchema = new Schema({
//   funFact: {
//     type: String
//   }
// });


const statesSchema = new Schema({
  stateCode: {
    type: String,
    required: true,
    unique: true
  },

  funFacts: {
    type: [String],
    default: [],
  },

  //funFacts: [funFactSchema]
});


module.exports = mongoose.model("States", statesSchema);
