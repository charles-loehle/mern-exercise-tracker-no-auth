import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ExercisesList = (props) => {
  const [exercises, setExercises] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/').then((res) => {
      setExercises(res.data);
    });
  }, [exercises]);

  return (
    <div>
      <h1>Exercise List</h1>
    </div>
  );
};

export default ExercisesList;
