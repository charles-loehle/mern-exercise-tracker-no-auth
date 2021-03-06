const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const { connection } = mongoose;
connection.on('error', () => {
  console.error.bind(console, 'connection error:');
  process.exit(1);
});
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const exerciseRouter = require('./routes/exerciseRoutes');
const userRouter = require('./routes/userRoutes');

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
