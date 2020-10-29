import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import Profile from './pages/Profile';
import Bookmarks from './pages/Bookmarks';

function App() {
  return (
    <AuthProvider>
        <Router>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
          <Route exact path="/profile/:userId" component={Profile} />
          <Route exact path="/bookmarks" component={Bookmarks} />
        </Router>
    </AuthProvider>
  );
}

export default App;
