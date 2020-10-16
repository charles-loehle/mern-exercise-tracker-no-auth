const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    // mongoose assigns createdAt and updatedAt fields to your schema, the type assigned is Date.
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
