import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginUser from "./pages/LoginUser";
import Users from "./pages/Users";

const RoutesPath = () => {
    return (
        <>
        <Router>
            <Routes>
                <Route path="/" exact element={<LoginUser/>}/>
                <Route path="/users" exact element={<Users/>}/>
                <Route path='/login' exact element={<LoginUser/>}/>
            </Routes>
        </Router>
        </>
    )
}

export default RoutesPath;