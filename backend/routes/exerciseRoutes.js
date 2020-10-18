const router = require('express').Router();
const Exercise = require('../models/exerciseModel');

// @desc    Get all the exercises
// @route   GET /exercises
router.route('/').get((req, res) => {
  Exercise.find()
    .populate('user', 'username')
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// @desc    Get user's exercises
// @route   GET /exercises/myexercises/:id
router.route('/myexercises/:id').get((req, res) => {
  Exercise.find({ user: req.params.id })
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// @desc    Add a new exercise
// @route   POST /exercises/add
router.route('/add').post((req, res) => {
  const { user, username, description } = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    user,
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json('Exercise added!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// @desc    Get a single exercise by id
// @route   GET /exercises/:id
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// @desc    Delete a single exercise by id
// @route   DELETE /exercises/:id
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// @desc    Update an exercise
// @route   POST /exercises/update/:id
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json('Exercise updated'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
