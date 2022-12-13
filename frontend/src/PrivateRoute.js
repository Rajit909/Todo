import React from 'react';
import {Route, Navigate} from 'react-router-dom';


const PrivateRoute = ({appwrite, component: Component, auth, ...rest}) => (
  <Route {...rest} render={(props) => {
    return localStorage.getItem('auth_state') ? <Component {...props} auth = {auth} /> : <Navigate to='/signin' />}} />
);

export default PrivateRoute;