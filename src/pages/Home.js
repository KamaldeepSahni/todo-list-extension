import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import axios from 'axios';
import './Home.css';

import { useAuthValue } from '../AuthProvider';
import { actionTypes } from '../Reducer';
import { apiBaseUrl } from '../constants';
import useTodos from '../hooks/useTodos';
import CreateTodoForm from '../components/CreateTodoFrom';

const Home = () => {
  const history = useHistory();
  const [{ user, token }, dispatch] = useAuthValue();

  const [todos, updateTodos, addTodo, updateTodo, deleteTodo] = useTodos();

  const [currentTodo, setCurrentTodo] = useState({
    _id: null,
    label: '',
    completed: false,
  });

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user, history]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(`${apiBaseUrl}/todos`, config);

        if (data.todos) {
          updateTodos(data.todos);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const addURLToList = () => {
    // eslint-disable-next-line no-undef
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
      addTodo(tabs[0].url);
    });
  };

  const logoutHandler = () => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    dispatch({ type: actionTypes.RESET_USER });
  };

  return (
    <div className="App">
      <div className="todo-container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '0 5%',
          }}
        >
          <h1>Your Todos</h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              onClick={addURLToList}
              className="btn"
              style={{ marginRight: '10px' }}
            >
              Current Url
            </Button>
            <Button variant="contained" onClick={logoutHandler} className="btn">
              Logout
            </Button>
          </div>
        </div>
        <hr />
        <CreateTodoForm
          createNewTodo={addTodo}
          updateTodo={updateTodo}
          editLabel={currentTodo.label}
          editId={currentTodo._id}
          editCompleted={currentTodo.completed}
          setEditTodo={setCurrentTodo}
        />
        {todos.length === 0 && (
          <p style={{ textAlign: 'center', fontSize: '20px' }}>
            Add a new Todo!
          </p>
        )}
        {todos &&
          todos.length > 0 &&
          todos.map(todo => (
            <div className="todo" key={todo._id}>
              {/^https?:\/\//.test(todo.label) ||
              todo.label.startsWith('localhost') ? (
                <a
                  href={todo.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={todo.completed ? 'complete' : undefined}
                >
                  {todo.label}
                </a>
              ) : (
                <p className={todo.completed ? 'complete' : undefined}>
                  {todo.label}
                </p>
              )}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  onClick={() =>
                    updateTodo(todo._id, todo.label, !todo.completed)
                  }
                  title="Complete"
                >
                  <i
                    className="fas fa-check"
                    style={{ color: 'green', fontSize: '20px' }}
                  ></i>
                </span>
                <span onClick={() => setCurrentTodo(todo)} title="Edit">
                  <i
                    class="fas fa-pencil-alt"
                    style={{ color: 'white', fontSize: '20px' }}
                  ></i>
                </span>
                <span onClick={() => deleteTodo(todo._id)} title="Delete">
                  <i
                    className="fas fa-trash"
                    style={{ color: 'red', fontSize: '20px' }}
                  ></i>
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
