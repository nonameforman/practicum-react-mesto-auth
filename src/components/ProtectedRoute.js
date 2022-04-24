import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props}) => {
    return (
        <Route path={props.path} exact>
            {
                () => props.loggedIn === true ? <Component {...props} /> : <Redirect to="./sign-in" />
            }
        </Route>
    );
}

export default ProtectedRoute;
