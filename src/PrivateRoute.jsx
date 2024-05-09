import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

export default function PrivateRoute() {
    const { currentUser } = useAuth()
    const location = useLocation()

    // Check if the current path is the auth path
    const isAuthPath = location.pathname === '/auth';

    if (currentUser ) {
        return isAuthPath ? <Navigate to="/" /> : <Outlet />
    }

    return currentUser ? <Outlet /> : <Navigate to="/auth" />
}
