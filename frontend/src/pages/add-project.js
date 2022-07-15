import React, { useState } from "react";
import NavBar from "../components/navbar";
import { Link, useNavigate } from "react-router-dom";
import fb from "../images/facebook.PNG"
import insta from "../images/instagram.PNG"
import "../css/dashboard.scss"
import axios from "axios"
import Processing from "../components/processing";
import swal from "sweetalert";
import SideBar from "../components/sidebar";


function AddProject() {
    let [projectDescription, setProjectDescription] = useState("");
    let [projectName, setProjectName] = useState("");
    let [selectedItem, updateSelectItem] = useState("");
    let [isProcessing, setIsProcessing] = useState(false);
    let navigate = useNavigate();


    function selectElement(item) {
        let itemElement = document.getElementById(item);
        let prev_selectedElement = document.getElementById(selectedItem);
        if (selectedItem == "") {
            updateSelectItem(item);
            itemElement.style.backgroundColor = "rgba(126, 190, 226, 0.493)";
            itemElement.style.borderColor = "rgba(17, 137, 206, 0.904)"
            return;
        }
        if (selectedItem == item) {
            updateSelectItem(item);
            return;
        }
        if (selectElement != item) {
            prev_selectedElement.style.backgroundColor = "";
            prev_selectedElement.style.borderColor = "";
            itemElement.style.backgroundColor = "rgba(126, 190, 226, 0.493)";
            itemElement.style.borderColor = "rgba(17, 137, 206, 0.904)"
            updateSelectItem(item);
        }
    }

    function handleSubmit() {
        setIsProcessing(true);
        setTimeout(() => {
            axios.post("/createProject", { selectedItem, projectName, projectDescription }).then((res) => {
                setIsProcessing(false);
                swal("Goood Job", "You have successfully Created a Project.", "success")
                    .then((value) => {
                        navigate("/view?projectId=" + res.data.projectId);
                    });
            }).catch((err) => {
                alert("Got Some error");
                setIsProcessing(false);
            })
        }, 1000)
    }


    return (
        <>
            <NavBar />
            <div id="mainContainer" className="container-fluid d-flex">

                <SideBar />

                {
                    isProcessing == true ?
                        <Processing /> :

                        <div id="second" className="m-lg-5 mt-3 px-4 w-50 ">
                            <h1>Create New Project</h1>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Project name</label>
                                <input type="text" onChange={(e) => setProjectName(e.target.value)} name="projectname" className="form-control" id="exampleFormControlInput1" placeholder="My phishing project" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description (Optional)</label>
                                <textarea className="form-control" onChange={(e) => setProjectDescription(e.target.value)} name="projectdescription" id="exampleFormControlTextarea1" placeholder="About your project" rows="3"></textarea>
                            </div>
                            <h4 className="text-center">Choose Website</h4>

                            <div className="container-fluid">
                                <div id="modal_site_images_container" className="row p-4">
                                    <div onClick={() => selectElement("facebook")} id="facebook" className="col-md-4 p-3 my-4 rounded-3">
                                        <img className="img-thumbnail" src={fb} />
                                        <p className="text-center mt-2">Facebook</p>
                                    </div>
                                    <div onClick={() => selectElement("instagram")} id="instagram" className="col-md-4 p-3 my-4 ms-auto rounded-3">
                                        <img className="img-thumbnail" src={insta} />
                                        <p className="text-center mt-2">Instagram</p>
                                    </div>
                                </div>
                                <br />
                            </div>

                            <button onClick={() => handleSubmit()} className="btn btn-primary py-2 mx-4 float-lg-end w-50">Create Project</button>
                        </div>
                }
            </div>
        </>
    )
}

export default AddProject;