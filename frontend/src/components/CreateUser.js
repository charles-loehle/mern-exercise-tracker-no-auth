import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [username, setUsername] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username,
    };

    console.log(user);

    axios
      .post(`${process.env.REACT_APP_API}/users/add`, user)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));

    setUsername('');
  };

  return (
    <div>
      <h1>Create a New User</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
