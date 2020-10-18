import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditExercise = ({ match }) => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [users, setUsers] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // 1. get single exercise by id
    axios
      // GET /exercises/:id
      .get(`${process.env.REACT_APP_API}/exercises/${match.params.id}`)
      .then((response) => {
        const { username, description, duration, date } = response.data;
        setUsername(username);
        setDescription(description);
        setDuration(duration);
        setDate(new Date(date));
      })
      .catch((error) => console.log(error));

    // 2. get all users to populate user dropdown
    axios
      // GET /users
      .get(`${process.env.REACT_APP_API}/users`)
      .then((response) => {
        if (response.data.length > 0) {
          setUsers(response.data.map((user) => user.username));
        }
      })
      .catch((error) => console.log(error));
  }, []);

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
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Edit an Exercise</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            {users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>

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
    </div>
  );
};

export default EditExercise;
