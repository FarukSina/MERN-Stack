const router = require("express").Router();
let adminUser = require("../models/adminUser.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
require("dotenv").config();

// Post auth
router.route("/").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  adminUser.findOne({ email }).then((user) => {
    if (!user)
      return res.status(400).json({ msg: "User admin doesn't exists" });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ msg: "password doesnt match" });
      jwt.sign(
        { id: user.id },
        process.env.JWT_KEY,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// get by ID

router.route("/:id").get(auth, (req, res) => {
  adminUser
    .findById(req.params.id)
    .select("-password")
    .then((adminUser) => res.json(adminUser))
    .catch((err) => res.status(400).json("Error :" + err));
});

// delete by ID

router.route("/:id").delete(auth, (req, res) => {
  adminUser
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Admin User is succesfully deleted"))
    .catch((err) => res.status(400).json("Error :" + err));
});

// update by ID  - req.body ve req.params nedir be aq

router.route("/update/:id").post((req, res) => {
  adminUser
    .findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.email = req.body.email;
      exercise.password = Number(req.body.password);

      exercise
        .save()
        .then(() => res.json("Admin User updated!!!"))
        .catch((err) => res.status(400).json("Error :" + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;
