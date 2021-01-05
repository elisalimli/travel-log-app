const { db } = require("../utils/admin");
const { validatePost } = require("../utils/validates");

exports.postSurv = async (req, res) => {
  const newSurv = {
    title: req.body.title,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    rating: req.body.rating,
    createdAt: new Date().toISOString(),
    survId: null,
    userName: req.user.userName,
  };
  const { valid, errors } = validatePost(newSurv);
  if (!valid) return res.status(400).json(errors);

  try {
    const doc = await db.collection("survs").add(newSurv);
    newSurv.survId = doc.id;
    await db.doc(`/survs/${newSurv.survId}`).update({ survId: doc.id });
    // res.status(200).json({ message: "Surv created!" });
    res.status(200).json(newSurv);
  } catch (error) {
    console.log(error);
    res.json({ general: "Something went wrong,please try again." });
    // next(error);
  }
};

exports.getAllSurvs = async (req, res) => {
  try {
    const survs = [];
    const docs = await db
      .collection("survs")
      .where("userName", "==", req.user.userName)
      .get();
    docs.forEach((doc) => {
      survs.push(doc.data());
    });
    res.status(200).json(survs);
  } catch (error) {
    next(error);
  }
};
