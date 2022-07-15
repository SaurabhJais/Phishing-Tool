import axios from "axios";
import React, { useEffect, useState } from "react"
import NavBar from "../components/navbar";
import Processing from "../components/processing";
import SideBar from "../components/sidebar";


function MyProfile() {
    let [userDetails, setUserDetails] = useState("");
    let [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        setIsProcessing(true);
        axios.get("/my-profile").then((res) => {
            setUserDetails(res.data)
            setIsProcessing(false);

        }).catch((err) => {
            alert(err)
            setIsProcessing(false)

        })
    }, [])

    return (
        isProcessing == true ? <Processing /> :
            <>
                <NavBar />
                <div id="mainContainer" className="container-fluid d-flex">

                    <SideBar />
                    <div id="second" style={{width: "75%"}}>
                        <h1 className="text-center py-5">My Profile</h1>
                        <div className="mx-auto border border-1 rounded-2 p-5" style={{width: "60%" }}>
                            <div className="d-flex justify-content-between">
                                <p className="fs-5"><b>Username : </b></p>
                                <p className="fs-5">{userDetails.username}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="fs-5"><b>Name : </b></p>
                                <p className="fs-5">{userDetails.name}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="fs-5"><b>Email : </b></p>
                                <p className="fs-5">{userDetails.mail}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="fs-5"><b>Email : </b></p>
                                <p className="fs-5">{userDetails.phone}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="fs-5"><b>User Id : </b></p>
                                <p className="fs-6">{userDetails._id}</p>
                            </div>


                        </div>
                    </div>
                </div>
            </>
    )

}


export default MyProfile;