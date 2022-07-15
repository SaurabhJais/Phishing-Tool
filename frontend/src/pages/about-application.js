import axios from "axios";
import React, { useEffect, useState } from "react"
import NavBar from "../components/navbar";
import Processing from "../components/processing";
import SideBar from "../components/sidebar";


function AboutApplication() {


    return (
        <>
            <NavBar />
            <div id="mainContainer" className="container-fluid d-flex">

                <SideBar />
                <div id="second">
                    <h1 className="text-center py-5">Technologies Used</h1>
                    <div className="mx-auto border border-1 rounded-2 p-5" style={{ width: "80%" }}>
                        <div className="d-flex justify-content-between">
                            <p className="fs-6"><b>Frontend Techs : </b></p>
                            <p className="fs-6">React.js, Javascript, HTML, CSS</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="fs-6"><b>Libraries : </b></p>
                            <p className="fs-6">Axios, Redux, sweetalert, Bootstrap, SCSS</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="fs-6"><b>Backend Techs : </b></p>
                            <p className="fs-6">Node.js</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="fs-6"><b>Libraries : </b></p>
                            <p className="fs-6">cors, jsonwebtoken, bcrypt, body-parser, cookie-parser</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="fs-6"><b>Database Techs : </b></p>
                            <p className="fs-6">MongoDb Atlas, MongoDb Atlas</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="fs-6"><b>Tools : </b></p>
                            <p className="fs-6">VS code, Postman</p>
                        </div>


                    </div>
                </div>

            </div>
        </>
    )

}


export default AboutApplication;