import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Profile from './components/Profile';
import TweetPage from './components/tweets/TweetPage'
import { selectUser } from './features/userSlice';
import ProtectedRoute from './components/functionality/ProtectedRoute';

function App() {

  const user = useSelector(selectUser)

  return (
    <div className="App">
      
      <BrowserRouter>
        
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <ProtectedRoute path="/">
            {user?<Navbar />:""}
            <div className="App__content">
              <ProtectedRoute exact path="/">
                <Homepage />
              </ProtectedRoute>
              <ProtectedRoute exact path="/profile">
                <Profile />
              </ProtectedRoute>
              <ProtectedRoute exact path="/tweet/:id">
                <TweetPage />
              </ProtectedRoute>
            </div>
            {user?<Sidebar />:""}
          </ProtectedRoute>

          <Route>
            <p>404</p>
          </Route>

        </Switch>
        
      </BrowserRouter>
      
    </div>
  );
}

export default App;
