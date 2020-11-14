const router = require("express").Router();
let adminUser = require("../models/adminUser.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.route("/").get((req, res) => {
  adminUser
    .find()
    .then((adminUsers) => res.json(adminUsers))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // Simple validation
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  adminUser.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User admin already exists" });

    const newAdminUser = new adminUser({
      username,
      email,
      password,
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newAdminUser.password, salt, (err, hash) => {
        if (err) throw err;
        newAdminUser.password = hash;
        newAdminUser
          .save()
          .then((user) => {
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
          })
          .catch((err) => res.status(400).json("Error: " + err));
      });
    });
  });
});

// get by ID

router.route("/:id").get((req, res) => {
  adminUser
    .findById(req.params.id)
    .then((adminUser) => res.json(adminUser))
    .catch((err) => res.status(400).json("Error :" + err));
});

// delete by ID

router.route("/:id").delete((req, res) => {
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
