import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../utils/auth';

export default ({component: Component, userData, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            auth.isLoggedIn() ?
                <Component {...props} userData={userData} />
            : <Redirect to='/login' />
        )} />
    );
};