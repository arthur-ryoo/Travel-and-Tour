import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  );

  const handleChange = (event) => {
    setUserInput({ [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userInput.password !== userInput.confirmPassword)
      return alert('Password confirmation must match password');
    let body = {
      email: userInput.email,
      password: userInput.password,
      name: userInput.name,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push('/login');
      } else {
        alert('Falied to sign up');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit}
      >
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={userInput.email}
          onChange={handleChange}
        />
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={userInput.name}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={userInput.password}
          onChange={handleChange}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={userInput.confirmPassword}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default RegisterPage;
