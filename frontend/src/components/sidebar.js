import React from "react";
import { Link } from "react-router-dom";
import dashboard from "../images/dashboard.png"
import myProjects from "../images/myProjects.png"
import add from "../images/add.png"
import allPasswords from "../images/allPasswords.png"
import myProfile from "../images/myProfile.png"
import aboutApplication from "../images/aboutApplication.png"
import logout from "../images/logout.png"
import "../css/media-query.css"




function SideBar() {
    function handleLogout(){
        document.cookie = "token= "
        window.location = "/"
    }
    return (
        <div id="first">
            <ul id="sidebarLinkMain" className="list-unstyled">
                <Link to="/dashboard">
                    <li>
                        <img src={dashboard} style={{ paddingRight: "10px"}} />
                        <p className="d-inline text-center p-0 m-0">DashBoard</p>
                    </li>
                </Link>
                <Link to="/my-projects">
                    <li>
                        <img src={myProjects} style={{ paddingRight: "10px", height: "30px", width: "40px" }} />
                        <p className="d-inline text-center p-0 m-0">My Projects</p>
                    </li>
                </Link>
                <Link to="/add-project">
                    <li>
                        <img src={add} style={{ paddingRight: "10px" }} />
                        <p className="d-inline text-center p-0 m-0">Add Project</p>
                    </li>
                </Link>

                <Link to="/all-passwords">
                    <li>
                        <img src={allPasswords} style={{ paddingRight: "10px", height: "30px", width: "40px" }} />
                        <p className="d-inline text-center p-0 m-0">All Passwords</p>
                    </li>
                </Link>
                <Link to="/my-profile">
                    <li>
                        <img src={myProfile} style={{ paddingRight: "10px" }} />
                        <p className="d-inline text-center p-0 m-0">My Profile</p>
                    </li>
                </Link>
                <Link to="/about-application">
                    <li>
                        <img src={aboutApplication} style={{ paddingRight: "10px", height: "30px", width: "40px" }} />
                        <p className="d-inline text-center p-0 m-0">About Project</p>
                    </li>
                </Link>
                <a href="/">
                    <li onClick={handleLogout}>
                        <img src={logout} style={{ paddingRight: "10px", height: "30px", width: "40px" }} />
                        <p className="d-inline text-center p-0 m-0">Logout</p>
                    </li>
                </a>
            </ul>
        </div>
    )
}

export default SideBar;