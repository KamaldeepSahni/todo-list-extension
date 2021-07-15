import React, { useState, useEffect } from 'react';
import { OutlinedInput, Button, makeStyles } from '@material-ui/core';
import { useRef } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15px',
  },
  input: {
    height: '40px',
    width: '60%',
    marginRight: '15px',
    color: '#fff',
    border: '1px solid #fff',
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
    marginRight: '10px',
    padding: '5px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#0062cc',
    '&:hover': {
      backgroundColor: '#0062cc',
      opacity: 0.75,
    },
  },
}));

const CreateTodoFrom = ({
  editLabel,
  editId,
  editCompleted,
  createNewTodo,
  updateTodo,
  setEditTodo,
}) => {
  const classes = useStyles();

  const [label, setLabel] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (editLabel) {
      setLabel(editLabel);
      inputRef.current.focus();
    }
  }, [editLabel]);

  return (
    <div className={classes.root}>
      <OutlinedInput
        onChange={({ target }) => setLabel(target.value)}
        value={label}
        placeholder="Enter a Todo"
        className={classes.input}
        spellCheck={false}
        inputRef={inputRef}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            if (label === '') return;
            if (editId) {
              updateTodo(editId, label, editCompleted);
              setLabel('');
              inputRef.current.blur();
              return setEditTodo({ id: null, label: '', completed: false });
            }
            createNewTodo(label);
            setLabel('');
            inputRef.current.blur();
          }
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          if (label === '') return;
          if (editId) {
            updateTodo(editId, label, editCompleted);
            setLabel('');
            return setEditTodo({ id: null, label: '', completed: false });
          }
          createNewTodo(label);
          setLabel('');
        }}
        className={classes.button}
      >
        Save
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setLabel('');
          editId && setEditTodo({ id: null, label: '', completed: false });
        }}
        className={classes.button}
      >
        Cancel
      </Button>
    </div>
  );
};

export default CreateTodoFrom;
