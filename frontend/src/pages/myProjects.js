import React, { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import instagram from "../images/instagram.PNG"
import facebook from "../images/facebook.PNG"
import NavBar from "../components/navbar";
import SideBar from "../components/sidebar";
import Processing from "../components/processing";

function MyProjects() {
    let [isProcessing, setIsProcessing] = useState(true);
    let [userProjects, setUserProjects] = useState([]);


    useEffect(() => {
        axios.get("/get-user-projects").then((res) => {
            if (res.data.isSuccess) {
                setUserProjects(res.data.projects)
                setIsProcessing(false)
            }
        }).catch((err) => {
            alert("err");
            setIsProcessing(true)
        })
    }, [])

    function copyUrl(e) {
        e.preventDefault()
        let url = e.target.value;
        navigator.clipboard.writeText(url).then(() => {
            alert("Url Copied to Clipboard")
        })
    }


    return (
        <>

            <NavBar />
            <div id="mainContainer" className="container-fluid d-flex">

                <SideBar />

                {
                    isProcessing == true ? <Processing /> :
                
                    userProjects.length > 0 ?

                        <div id="second">


                            <div className="container-fluid d-flex justify-content-center">
                                <div className="row m-3 d-flex justify-content-center ">
                                    {
                                        userProjects.map((k, key) => {
                                            return (
                                                <div key={key} className="border border-3 col-lg-5 p-3 m-3  rounded-3 ">
                                                    <Link className="text-decoration-none text-black" to={"/view?projectId=" + k.projectId}>

                                                        {
                                                            k.selectedItem == "facebook" ? <img className="img-fluid" src={facebook} /> : null
                                                        }
                                                        {
                                                            k.selectedItem == "instagram" ? <img className="img-fluid" src={instagram} /> : null
                                                        }
                                                        <p className="mt-3 fs-5 fw-bold"> {k.projectName}</p>
                                                        <div style={{ height: "50px", overflow: "hidden" }}>
                                                            <p style={{ textOverflow: "ellipsis", fontSize: "15px", }}>{k.projectDescription}...</p>
                                                        </div>
                                                        <p><b>Status : </b>{k.remainingEntries > 0 ? <span className="text-success">Active</span> : <span className="text-danger">Expired</span>}</p>
                                                        <p><b>Remaining Entries : </b>{k.remainingEntries > 0 ? k.remainingEntries + " of 10" : 0} </p>
                                                        <button value={k.url} onClick={copyUrl} className="bg-dark" style={{
                                                            fontFamily: "Roboto",
                                                            width: "100%",
                                                            border: "none",
                                                            padding: "20px",
                                                            fontWeight: "900",
                                                            letterSpacing: "3px",
                                                            fontSize: "18px",
                                                            marginTop: "10px",
                                                            color: "#ebe2e2",
                                                            borderRadius: "4px"
                                                        }}>Copy URL</button>
                                                    </Link>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <h1 className="mt-5 p-5 fw-bold">No user projects found</h1>
                }
            </div>
        </>
    )
}

export default MyProjects;