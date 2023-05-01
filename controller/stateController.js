// const data = {
//   states: require("../model/states.json"),
//   setStates: (data) => {
//     this.states = data;
//   },
// };

const State = require("../model/States");

const abb = [ "AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI",
 "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC",
 "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", 
"OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];


//Get all States
const GetStates = async (req, res) => {
  const states = await State.find();
  if (!states)
    return res.status(400).json({ message: "No state found." });
  res.json(states);
};

//Create an State
const CreateNewState = async (req, res) => {
  if (!req.body.stateCode) {
    return res
      .status(400)
      .json({ message: "stateCode is required" });
  }
  try {
    const result = await State.create({
      stateCode: req.body.stateCode,
      //stateName: req.body.stateName,
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};


//Update New
const UpdateStateFF = async (req, res) => {
 
  if (!abb.includes(req.params.id,0)) {
    return res.status(404).json({ message: "Invalid State Code. " });
  }

  if (!req.body.funFacts) {
    return res.status(400).json({ message: "funFact parameter is required. " });
  }

  const state = await State.findOne({ stateCode: req.params.id }).exec();

  if (!state) {
    return res
      .status(404)
      .json({ message: `No State matches ${req.params.id}` });
  }
 
  await State.updateOne(
    { stateCode: req.params.id },
    { $push: { funFacts: req.body.funFacts } }
  );

  res.json({ message: "Fun facts updated successfully." });
};



//Replace State Funfact
const ReplaceStateFF = async (req, res) => {
  if (!req.body.stateCode) {
    return res.status(400).json({ message: "stateCode parameter is required. " });
  }

  if (!req.body.funFacts) {
    return res.status(400).json({ message: "funFact parameter is required. " });
  }

  if (!req.body.index || !req.body.index > 0) {
    return res.status(400).json({ message: "index of funFact parameter >0 to be replaced is required. " });
  }

  const state = await State.findOne({ stateCode: req.body.stateCode }).exec();

  if (!state) {
    return res
      .status(204)
      .json({ message: `No State matches ${req.body.stateCode}` });
  }
  //if (req.body.stateCode) state.stateCode = req.body.StateCode;
  
  if (req.body.funFacts) state.funFacts = req.body.funFacts;

  const result = await State.save();
  res.json(result);
};




//Delete State
const DeleteState = async (req, res) => {

  if (!abb.includes(req.params.id,0)) {
    return res.status(404).json({ message: "Invalid State Code. " });
    }

  if (!req?.body.stateCode) {
    return res.status(400).json({ message: "stateCode is required. " });
  }

  const state = await State.findOne({ stateCode: req.body.stateCode }).exec();

  if (!state) {
    return res
      .status(404)
      .json({ message: `No stateCode matches ${req.body.stateCode}` });
  }
  const result = await State.deleteOne({ stateCode: req.body.stateCode });
  res.json(result);
};


const DeleteStateFF = async (req, res) => {
  // if (!req?.body.stateCode) {
  //   return res.status(400).json({ message: "stateCode is required. " });
  // }

  if (!abb.includes(req.params.id,0)) {
    return res.status(404).json({ message: "Invalid State Code. " });
    }
  

  // const state = await State.findOne({ stateCode: req.body.stateCode }).exec();

  // if (!state) {
  //   return res
  //     .status(204)
  //     .json({ message: `No stateCode matches ${req.body.stateCode}` });
  // }

  const index = parseInt(req.body.index)-1;

  console.log(index);
  console.log(req.params.id); 

  await State.updateOne(
    { stateCode: req.params.id },
    { $pull: { funFacts: { $exists: true, $in: [index] } } }
  );


  // await State.updateOne(
  //   { stateCode: req.params.id },
  //   { $unset: { [`funFacts.index`]: "" } }
  // );

  //   //{ $unset: { [`funFacts.${req.body.index}`]: "" } }
  // );
  


  //res.json(result);
};



//Get State
const GetState = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "stateCode is required. " });
  }

  if (!abb.includes(req.params.id,0)) {
  return res.status(404).json({ message: "Invalid State Code. " });
  }

 let state = await State.findOne({ stateCode: req.params.id }).exec();

 console.log(state);

  if (!state) {
    return res
      .status(404)
      .json({ message: "No stateCode matches. " });
  }

  res.json(state);
};

//Get State FunFact
const GetStateFF = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "stateCode is required. " });
  }

  if (!abb.includes(req.params.id,0)) {
  return res.status(404).json({ message: "Invalid State Code. " });
  }

 let state = await State.findOne({ stateCode: req.params.id }).exec();

 console.log(state);

  if (!state) {
    return res
      .status(404)
      .json({ message: "No stateCode matches. " });
  }

  res.json(state);
};

//Get State Captial
const GetStateCap = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "stateCode is required. " });
  }

  if (!abb.includes(req.params.id,0)) {
  return res.status(404).json({ message: "Invalid State Code. " });
  }

 let state = await State.findOne({ stateCode: req.params.id }).exec();

 console.log(state);

  if (!state) {
    return res
      .status(404)
      .json({ message: "No stateCode matches. " });
  }

  res.json(state);
};

//Get State Nickname
const GetStateNick = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "stateCode is required. " });
  }

  if (!abb.includes(req.params.id,0)) {
  return res.status(404).json({ message: "Invalid State Code. " });
  }

 let state = await State.findOne({ stateCode: req.params.id }).exec();

 console.log(state);

  if (!state) {
    return res
      .status(404)
      .json({ message: "No stateCode matches. " });
  }

  res.json(state);
};

//Get State Populaiton
const GetStatePop = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "stateCode is required. " });
  }

  if (!abb.includes(req.params.id,0)) {
  return res.status(404).json({ message: "Invalid State Code. " });
  }

 let state = await State.findOne({ stateCode: req.params.id }).exec();

 console.log(state);

  if (!state) {
    return res
      .status(404)
      .json({ message: "No stateCode matches. " });
  }

  res.json(state);
};

//Get State Admission Date
const GetStateAdmission = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "stateCode is required. " });
  }

  if (!abb.includes(req.params.id,0)) {
  return res.status(404).json({ message: "Invalid State Code. " });
  }

 let state = await State.findOne({ stateCode: req.params.id }).exec();

 console.log(state);

  if (!state) {
    return res
      .status(404)
      .json({ message: "No stateCode matches. " });
  }

  res.json(state);
};

module.exports = {
  GetStates,
  UpdateStateFF,
  ReplaceStateFF,
  DeleteState,
  DeleteStateFF,
  CreateNewState,
  GetState,
  GetStateFF,
  GetStateCap,
  GetStateNick,
  GetStatePop,
  GetStateAdmission,
};
