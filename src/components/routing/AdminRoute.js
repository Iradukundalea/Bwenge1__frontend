import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  return <Outlet {...rest} render={(props) => (localStorage.getItem("role") === "admin" ? <Component {...props} /> : <Navigate to="/" />)} />;
};

export default AdminRoute;
