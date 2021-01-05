//Validation stuffs
const { validateSignUp, validateLogin } = require("../utils/validates");
const { firebase, db } = require("../utils/admin");
const config = require("../utils/config");

firebase.initializeApp(config);
//-------------
exports.signup = (req, res) => {
  let token, userId;

  const newUser = {
    email: req.body.email,
    password: req.body.password,
    userName: req.body.userName,
  };

  const { valid, errors } = validateSignUp(newUser);
  if (!valid) return res.status(400).json(errors);

  db.doc(`/users/${newUser.userName}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({
          general: "This user name is already taken,please try another one.",
        });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;

      const userCredentials = {
        email: newUser.email,
        userName: newUser.userName,
        createdAt: new Date().toISOString(),
        userId,
      };

      return db.doc(`/users/${newUser.userName}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong,please try again." });
    });
};

//Login
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  console.log(user);

  const { valid, errors } = validateLogin(user);
  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-email" ||
        err.code === "auth/user-not-found"
      ) {
        return res
          .status(403)
          .json({ general: "Wrong credentials,please try again." });
      } else {
        res.status(500).json({ error: err.code });
      }
    });
};
