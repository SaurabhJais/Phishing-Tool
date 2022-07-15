import React from "react";
import logo from "../images/logo.png"
import {useNavigate, Link} from "react-router-dom"

function NavBar() {
    let navigate = useNavigate();

    function handleLogout(){
        document.cookie = "token= "
        window.location = "/"
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg  bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white fw-bolder" to="/"><img src={logo} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li onClick={handleLogout} className="nav-item" style={{cursor: "pointer"}}>
                                <a className=" text-white nav-link fw-bolder">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

; export default NavBar