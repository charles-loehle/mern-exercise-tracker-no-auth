import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateExercise = () => {
  const [username, setUsername] = useState('');
  // const [user, setUser] = useState('');
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [userObj, setUserObj] = useState({});

  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // GET  /users
    // all users to populate the dropdown menu
    axios.get(`${process.env.REACT_APP_API}/users`).then((response) => {
      //console.log(response.data);
      if (response.data.length > 0) {
        setUsers(response.data.map((user) => user.username));
        setUserObj(response.data);
      }
    });
  }, [username]);

  const submitHandler = (e) => {
    e.preventDefault();

    const exercise = {
      user: userId._id,
      description,
      duration,
      date,
    };
    console.log(exercise);
    // POST  /exercises/add
    // Add a new exercise
    axios
      .post(`${process.env.REACT_APP_API}/exercises/add`, exercise)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  const getUser = (e) => {
    // show username on dropdown
    setUsername(e.target.value);

    // get user object of selected user
    setUserId(userObj.find((x) => (x.username === e.target.value ? x : '')));
  };

  return (
    <div>
      <h1>Create an Exercise Log</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={getUser}
          >
            <option value="select">Select a Username</option>
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
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExercise;
