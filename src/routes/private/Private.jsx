import React from 'react'
import { useValue } from "../../context/AppProvider"
import { Outlet, Navigate } from "react-router-dom"
import AdminContainer from "../admin-container/AdminContainer"

const Private = () => {
    const [state] = useValue()
    console.log(state);
  return !state.auth.token ? <Navigate to="/auth/login" /> : <AdminContainer/>
}

export default Private