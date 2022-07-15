import { React, useEffect } from "react";
import { Route, Routes } from "react-router-dom"
import Login from "./auth/login"
import Signup from "./auth/signup";
import DashBoard from "./pages/dashboard";
import { useDispatch } from "react-redux"
import {changeLoginState, addUserDetails} from "./redux/actions/actions"
import axios from "axios"
import jwt_decode from "jwt-decode"
import ViewProject from "./pages/viewProject"
import MyProjects from "./pages/myProjects"
import AddProject from "./pages/add-project"
import AllPasswords from "./pages/all-passwords";
import MyProfile from "./pages/myProfile";
import AboutApplication from "./pages/about-application";
import "./css/media-query.css"

function Home() {

    let dispatch = useDispatch();

    useEffect(() => {
        let cookieString = document.cookie;
        cookieString = cookieString.split(";")
        let cookies = new Map();
        for(let x of cookieString){
            let temp = x.split("=");
            cookies.set(temp[0], temp[1])
        }

        let jwt = cookies.get("token");

        if(jwt){
            axios.post("/verify-token", {token: jwt}).then((res) => {
                if(res.data == true){
                    dispatch(changeLoginState(true));
                    dispatch(addUserDetails(jwt_decode(jwt)))
                }else{
                    dispatch(changeLoginState(false));
                }
            }).catch((err) => {
                throw err;
            })
        }else{
            dispatch(changeLoginState(false));
        }
    }, [])

    
  
    return (
        <Routes>
            <Route path="/" element={<DashBoard />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/dashboard" element={<DashBoard />}></Route>
            <Route path="/view" element={<ViewProject />} ></Route>
            <Route path="/my-projects" element = {<MyProjects />}> </Route>
            <Route path="/add-project" element = {<AddProject />}> </Route>
            <Route path="/all-passwords" element = {<AllPasswords />}> </Route>
            <Route path="/my-profile" element = {<MyProfile />}> </Route>
            <Route path="/about-application" element = {<AboutApplication />}> </Route>


        </Routes>
    )
}



export default Home;