import { useState } from 'react';
import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { useAuthValue } from '../AuthProvider';

const useTodos = () => {
  const [{ token }] = useAuthValue();

  const [todos, setTodos] = useState([]);

  const updateTodos = newTodos => {
    setTodos(newTodos);
  };

  const addTodo = async label => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${apiBaseUrl}/todos`,
        { label },
        config
      );

      if (data.todo) {
        updateTodos([...todos, data.todo]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodo = async (id, label, completed) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${apiBaseUrl}/todos/${id}`,
        { label, completed },
        config
      );

      if (data.updatedTodo) {
        updateTodos(
          todos.map(todo =>
            todo._id === data.updatedTodo._id ? data.updatedTodo : todo
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async id => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(`${apiBaseUrl}/todos/${id}`, config);

      if (data.message === 'Todo removed') {
        const newTodos = [...todos];
        updateTodos(newTodos.filter(todo => todo._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return [todos, updateTodos, addTodo, updateTodo, deleteTodo];
};

export default useTodos;
