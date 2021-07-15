import React, { useEffect } from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  useEffect(() => {
    document.addEventListener('contextmenu', e => e.preventDefault());
  }, []);

  return (
    <Router>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/" component={Home} />
    </Router>
  );
};

export default App;
