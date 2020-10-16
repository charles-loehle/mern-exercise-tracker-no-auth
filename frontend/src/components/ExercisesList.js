import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Exercise from './Exercise';

const ExercisesList = (props) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/exercises/`)
      .then((res) => {
        setExercises(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteExercise = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API}/exercises/${id}`)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

    setExercises(exercises.filter((el) => el._id !== id));
  };

  return (
    <div>
      <h1>Exercise List</h1>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
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

export default ExercisesList;
