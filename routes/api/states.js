const express = require("express");
const router = express();
const stateController = require("../../controller/stateController");

//req.params.id


router.route("/:id").get(stateController.GetState);

router.route("/:id/funfact").get(stateController.GetStateFF);

router.route("/:id/capital").get(stateController.GetStateCap);

router.route("/:id/nickname").get(stateController.GetStateNick);

router.route("/:id/population").get(stateController.GetStatePop);

router.route("/:id/admission").get(stateController.GetStateAdmission);

router.route("/:id").post(stateController.CreateNewState);

router.route("/:id/funfact").post(stateController.UpdateStateFF);

router.route("/:id/funfact").patch(stateController.ReplaceStateFF);

router.route("/:id/funfact").delete(stateController.DeleteStateFF);

//router.route("/:id").delete(stateController.DeleteState);





router
  .route("/")
  .get(stateController.GetStates);
  //.post(stateController.CreateNewState)
  //.put(stateController.UpdateState)
  //.delete(stateController.DeleteState);



module.exports = router;
