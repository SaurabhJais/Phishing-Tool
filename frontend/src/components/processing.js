import {Component} from "react"
import img from "../images/loading.gif"

function Processing () {
    return (
        <div style={{height: "100vh", width: "100vw", position: "relative", background: "#000000cc"}}>
            <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            <img className="position-absolute top-50" style={{left: "50%", transform: "translate(-50%, -50%)"}} src={img} />
        </div>
        </div>
    )
}

export default Processing;