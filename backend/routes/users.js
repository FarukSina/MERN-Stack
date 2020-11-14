const router = require("express").Router();
let User = require("../models/user.model");
const auth = require("../middleware/auth");
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(auth, (req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });
  console.log("newUser", newUser);

  newUser
    .save()
    .then(() => res.json("User succesfully added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
