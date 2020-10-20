import React, { useState } from 'react';
import axios from 'axios';
import Message from './Message';

const CreateUser = () => {
  const [username, setUsername] = useState('');

  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username,
    };

    axios
      .post(`${process.env.REACT_APP_API}/users/add`, user)
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

    setUsername('');
  };

  return (
    <div>
      <h1>Create a New User</h1>
      {message && <Message variant={variant}>{message}</Message>}
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
