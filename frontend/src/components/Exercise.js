import React from 'react';
import { Link } from 'react-router-dom';

const Exercise = ({
  deleteExercise,
  exercise: { user, description, duration, date, _id },
}) => {
  return (
    <tr>
      {user.username && <td>{user.username}</td>}
      <td>{description}</td>
      <td>{duration}</td>
      <td>{date.substring(0, 10)}</td>
      <td>
        <Link className="btn btn-info mr-1" to={`/edit/${_id}`}>
          edit
        </Link>
        {user.username && (
          <Link className="btn btn-info mr-1" to={`/user/${user._id}`}>
            user
          </Link>
        )}
        <button
          onClick={() => deleteExercise(_id)}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Exercise;
