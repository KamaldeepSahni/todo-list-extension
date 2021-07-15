import React, { useEffect, useState } from 'react';
import { OutlinedInput, Button, makeStyles } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

import { useAuthValue } from '../AuthProvider';
import { actionTypes } from '../Reducer';
import { apiBaseUrl } from '../constants';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '350px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  input: {
    height: '40px',
    width: '100%',
    color: '#fff',
    border: '1px solid #fff',
    marginBottom: '15px',
    '& input::placeholder': {
      opacity: 1,
    },
    '&:focused': {
      outlineColor: '#fff',
    },
    '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  button: {
    height: '40px',
    width: '100%',
    padding: '5px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#0062cc',
    '&:hover': {
      backgroundColor: '#0062cc',
      opacity: 0.75,
    },
    '&.MuiButton-contained.Mui-disabled': {
      color: '#fff',
      backgroundColor: '#0062cc',
      opacity: 0.5,
    },
  },
}));

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();

  const [{ user }, dispatch] = useAuthValue();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isInvalid = name === '' || email === '' || password === '';

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);

  const signupHandler = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${apiBaseUrl}/signup`,
        { name, email, password },
        config
      );

      if (data.user && data.token) {
        localStorage.setItem('authUser', JSON.stringify(data.user));
        localStorage.setItem('authToken', data.token);
        dispatch({
          type: actionTypes.SET_USER,
          user: data.user,
          token: data.token,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h1 style={{ textAlign: 'center', width: '100%', marginLeft: '-25px' }}>
          Sign Up
        </h1>
        <OutlinedInput
          onChange={({ target }) => setName(target.value)}
          type="text"
          value={name}
          placeholder="Name"
          className={classes.input}
          spellCheck={false}
        />
        <OutlinedInput
          onChange={({ target }) => setEmail(target.value)}
          type="email"
          value={email}
          placeholder="Email"
          className={classes.input}
          spellCheck={false}
        />
        <OutlinedInput
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          value={password}
          placeholder="Password"
          className={classes.input}
          spellCheck={false}
        />
        <Button
          variant="contained"
          onClick={signupHandler}
          className={classes.button}
          disabled={isInvalid}
        >
          Sign Up
        </Button>
        <small>
          Already have a account ?{' '}
          <Link to="/login" style={{ color: '#fff' }}>
            Login
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Signup;
