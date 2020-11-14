const router = require("express").Router();
let Exercise = require("../models/exercise.model");
const auth = require("../middleware/auth");
router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(auth, (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise is successfully saved"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// get by ID

router.route("/:id").get( (req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error :" + err));
});

// delete by ID

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("The Exercise is succesfully deleted"))
    .catch((err) => res.status(400).json("Error :" + err));
});

// update by ID  - req.body ve req.params nedir be aq

router.route("/update/:id").post( (req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("exercise updated!!!"))
        .catch((err) => res.status(400).json("Error :" + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;
