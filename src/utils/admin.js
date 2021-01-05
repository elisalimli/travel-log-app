const admin = require("firebase-admin");
const firebase = require("firebase");
const serviceAccount = require("../utils/serviceAccount");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

module.exports = { admin, db, firebase };
