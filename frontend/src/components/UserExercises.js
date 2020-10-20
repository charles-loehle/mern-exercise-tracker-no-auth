import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Exercise from './Exercise';

const UserExercises = ({ match }) => {
  const [users, setUser] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      // GET /users/:id
      .get(`${process.env.REACT_APP_API}/users/${match.params.id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));

    axios
      // GET  /exercises/myexercises/:id
      .get(
        `${process.env.REACT_APP_API}/exercises/myexercises/${match.params.id}`
      )
      .then((res) => {
        setExercises(res.data);
      })
      .catch((error) => console.log(error));
  }, [match.params.id]);

  const deleteExercise = (id) => {
    // axios
    //   .delete(`${process.env.REACT_APP_API}/exercises/${id}`)
    //   .then((res) => console.log(res))
    //   .catch((error) => console.log(error));

    // setExercises(exercises.filter((el) => el._id !== id));
    console.log('test');
  };

  return (
    <div>
      <h1>{users.username}'s Exercises</h1>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((curr) => {
            return (
              <Exercise
                exercise={curr}
                deleteExercise={deleteExercise}
                key={curr._id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserExercises;
