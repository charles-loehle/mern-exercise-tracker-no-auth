import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Message from './Message';
import { Link } from 'react-router-dom';

const EditExercise = ({ match }) => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState([]);
  const [exercise, setExercise] = useState([]);

  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());

  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');

  useEffect(() => {
    // 2. get single exercise by id
    axios
      // GET /exercises/:id
      .get(`${process.env.REACT_APP_API}/exercises/${match.params.id}`)
      .then((response) => {
        const { username, description, duration, date } = response.data;
        setExercise(response.data);
        setUsername(username);
        setDescription(description);
        setDuration(duration);
        setDate(new Date(date));
      })
      .catch((error) => console.log(error));
  }, [match.params.id]);

  const submitHandler = (e) => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date,
    };

    axios
      .post(
        `${process.env.REACT_APP_API}/exercises/update/${match.params.id}`,
        exercise
      )
      .then((res) => {
        console.log(res.data);
        setMessage(res.data);
        setVariant('success');
        setTimeout(() => {
          setMessage('');
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
        setMessage('Something went wrong, please try again');
        setVariant('danger');
        setTimeout(() => {
          setMessage('');
        }, 4000);
      });
  };

  const getUsername = () => {
    axios
      .get(`${process.env.REACT_APP_API}/users/${exercise.user}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));

    return user.username;
  };

  return (
    <div>
      <h1>Edit {getUsername()}'s Exercise</h1>
      {message && <Message variant={variant}>{message}</Message>}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Duration (in minutes) </label>
          <input
            type="text"
            required
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={setDate} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
      <Link to={`/user/${user._id}`}>Back</Link>
    </div>
  );
};

export default EditExercise;
