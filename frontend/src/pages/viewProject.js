import axios from "axios";
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import NavBar from "../components/navbar"
import Processing from "../components/processing";
import facebookIcon from "../images/facebook-icon.png"
import instagramIcon from "../images/instagram-icon.png"



function ViewProject() {
    let [searchParams, setSearchParams] = useSearchParams();
    let [projectDetails, setProjectDetails] = useState();
    let [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        axios.get("/get-a-project-details/?projectId=" + searchParams.get("projectId")).then((res) => {
            if (res.data.isSuccess) {
                setProjectDetails(res.data.data)
                setIsProcessing(false)
            } else {
                alert(res.data.message + "52s4f")
            }
        }).catch((err) => {
            alert("Bhai kuchh to errror mila hai 53gfg55")
            setIsProcessing(false)
        })
    }, [])


    if (isProcessing) {
        return (
            <>
                <NavBar />
                <Processing />
            </>
        )
    }

    return (
        <>
            <NavBar />
            <div style={{ backgroundColor: "#f0f2f5", width: "100%", padding: "50px 0" }}>
                <div style={{ width: "50%" }} className="container-fluid border border-1 p-4 bg-light rounded-2 shadow-sm">
                    <div style={{ height: "80px" }} className=" my-3 d-flex">
                        <div style={{height: "70px", width: "70px"}} className="position-relative">
                            {
                                projectDetails.selectedItem == "facebook" ? 
                                    <img src={facebookIcon} style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)"
                                    }} /> : null
                            }
                            {
                                projectDetails.selectedItem == "instagram" ? 
                                    <img src={instagramIcon} style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)"
                                    }} /> : null
                            }
                            
                        </div>
                        <div className="mx-4">
                            <p style={{lineHeight: "1.5", margin: 0}}><b>{projectDetails.projectName}</b></p>
                            <p style={{fontSize: "13px", lineHeight: "1.5", margin: 0}}>{projectDetails.projectDescription.substr(0, 40)}... </p>
                            {
                                projectDetails.remainingEntries > 0 ?
                                <p style={{lineHeight: "1.5", margin: 0, color: "#0fd30f", fontWeight: "bold"}}>Active</p> :
                                <p style={{lineHeight: "1.5", margin: 0, color: "red", fontWeight: "bold"}}>Expired</p>
                            }
                        </div>
                    </div>
                    <div className="d-flex justify-content-between"><p><b>Project Name : </b></p><p>{projectDetails.projectName}</p></div>
                    <div className="d-flex justify-content-between"><p><b>Description : </b></p><p>{projectDetails.projectDescription.substr(0, 40)}...</p></div>
                    <div className="d-flex justify-content-between"><p><b>Remaining Entries : </b></p><p>{projectDetails.remainingEntries}</p></div>
                    <div className="d-flex justify-content-between"><p><b>Project Url : </b></p><a target="_blank" href={projectDetails.url}>{projectDetails.url.substr(0, 30)}...</a></div>
                    <div className="d-flex justify-content-between"><p><b>Project Id : </b></p><p>{projectDetails.projectId}</p></div>
                    <div className="d-flex justify-content-between"><p><b>Target : </b></p><p>{projectDetails.selectedItem}</p></div>
 
                    <h3 className="text-center fw-bolder mt-3">Entries</h3>
                    {
                        projectDetails.entries.length == 0 ? 
                        <p className="text-center">No Entries Till Now</p> 
                        :
                        projectDetails.entries.reverse().map((k, key) => {
                            return (
                                <div key={key} className="py-2 px-4 border border-1 my-3">
                                    <div className="d-flex justify-content-between"><p><b>{k.id}</b></p></div>

                                    <div className="d-flex justify-content-between"><p><b>UserName : </b></p><p>{k.userName}</p></div>
                                    <div className="d-flex justify-content-between"><p><b>Password : </b></p><p>{k.password}</p></div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ViewProject;