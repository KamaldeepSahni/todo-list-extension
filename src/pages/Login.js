import React, { useEffect, useState } from 'react';
import { OutlinedInput, Button, makeStyles, Snackbar } from '@material-ui/core';
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
  snackbar: {
    backgroundColor: '#f44336',
    color: '#fff',
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

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const [{ user }, dispatch] = useAuthValue();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isInvalid = email === '' || password === '';

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);

  const loginHandler = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${apiBaseUrl}/login`,
        { email, password },
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
    } catch (err) {
      setOpen(true);
      if (err.response && err.response.data) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Something went wrong! Please try again later.');
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setMessage('');
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h1 style={{ textAlign: 'center', width: '100%', marginLeft: '-25px' }}>
          Login
        </h1>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
          onClose={handleClose}
          message={message}
          ContentProps={{
            classes: {
              root: classes.snackbar,
            },
          }}
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
          onClick={loginHandler}
          className={classes.button}
          disabled={isInvalid}
        >
          Login
        </Button>
        <small>
          Don't have a account ?{' '}
          <Link to="/signup" style={{ color: '#fff' }}>
            Sign Up
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Login;
