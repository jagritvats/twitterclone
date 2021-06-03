import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Profile from './components/pages/Profile';
import TweetPage from './components/tweets/TweetPage'
import { login, logout, selectUser } from './features/userSlice';
import ProtectedRoute from './components/functionality/ProtectedRoute';

import CircularProgress from '@material-ui/core/CircularProgress';

import {auth} from './app/config/firebase'

function App() {

  const user = useSelector(selectUser)

  const dispatch = useDispatch()

  useEffect(()=>{
    const unsub = auth.onAuthStateChanged((user)=>{
      if(user){
        if(user.displayName){
          // login
          dispatch(login({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          }))
        }else{
          // register action dispatched there itself
        }
      }else{
        dispatch(logout())
      }
      console.log(user)
      // dispatch(authLoaded())
    })
    return () => unsub()
  }
  ,[])

  return (
    <div className="App">
      {
        user.dataStatus === 'loading' ? <CircularProgress />
        :
        <BrowserRouter>
        
          <Switch>
          <Route exact path="/login">
            {user.user?<Redirect to="/"/>:<Login />}
          </Route>

          <Route exact path="/register">
          {user.user?<Redirect to="/"/>:<Register />}
          </Route>

          <ProtectedRoute path="/">
            {user.user?<Navbar />:""}
            <div className="App__content">
              <ProtectedRoute exact path="/">
                <Homepage />
              </ProtectedRoute>
              <ProtectedRoute exact path="/profile">
                <Profile />
              </ProtectedRoute>
              <ProtectedRoute exact path="/profile/:id">
                <Profile other={true}/>
              </ProtectedRoute>
              <ProtectedRoute exact path="/tweet/:id">
                <TweetPage />
              </ProtectedRoute>
            </div>
            {user.user?<Sidebar />:""}
          </ProtectedRoute>

          <Route>
            <p>404</p>
          </Route>

        </Switch>
        
        </BrowserRouter>
      
      }
      

    </div>
  );
}

export default App;
