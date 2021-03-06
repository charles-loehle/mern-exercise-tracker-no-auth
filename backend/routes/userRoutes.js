const router = require('express').Router();
const User = require('../models/userModel');

// @desc    Get all the users
// @route   GET /users
router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// @desc    Get user by id
// @route   GET /users/:id
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// @desc    Add a new user
// @route   POST /users/add
router.route('/add').post((req, res) => {
  const { username } = req.body;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json('User added!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
