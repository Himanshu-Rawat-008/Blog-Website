import React from 'react';
import { useSelector } from 'react-redux';
import { REDUCERS } from '../redux/store';
import { Navigate, Outlet } from 'react-router-dom';


export default function OnlyAdminPrivateRoute() {
    const { currentUser } = useSelector(state => state[REDUCERS.user]);
    return currentUser && currentUser.isAdmin ? <Outlet/> : <Navigate to='/sign-in' />;
}
