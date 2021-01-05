const router = require("express").Router();

const { postSurv, getAllSurvs } = require("../handlers/logsHandler");
const FBAuth = require("../utils/FBAuth");

router.get("/", FBAuth, getAllSurvs);

router.post("/post", FBAuth, postSurv);

module.exports = router;
