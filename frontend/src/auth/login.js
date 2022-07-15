import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import "../css/auth.css"
import axios from "axios"
import swal from "sweetalert"
import { useSelector, useDispatch } from "react-redux"
import { changeLoginState } from "../redux/actions/actions"
import Processing from "../components/processing";

function Login() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    let dispatch = useDispatch();
    let [isProcessing, setIsProcessing] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true)
        axios.post("/login", { mail, password }).then((res) => {
            if (res.data.isSuccess) {
                localStorage.setItem("jwt", res.data.token);
                dispatch(changeLoginState(true))
                setIsProcessing(false)
                navigate("/dashboard")
            } else {
                setIsProcessing(false)
                swal("Oops", res.data.message, "error")
            }
        }).catch((err) => {
            setIsProcessing(false);
            swal("Oops", "Got some error", "error")
        })
    }


    let currLoginState = useSelector((state) => state.isLoggedIn);
    if (currLoginState) {
        navigate("/dashboard");
        return null
    }

    return (
        isProcessing ? <Processing /> :
            <>
                <div className="border border-2 bg-dark text-white p-4 m-5 float-end shadow-lg" style={{width: "max-content"}}>
                    <p className="text-white">Don't want to <b>Sign Up</b> ? </p>
                    <p className="text-white">Use these credentials</p>
                    <p className="text-white"><b>email: </b> recruiter@company.com</p>
                    <p className="text-white"><b>Password : </b>great_project</p>
                </div>
                <div className="background">
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>
                <form className="form1" onSubmit={loginSubmit}>
                    <h3>Login Here</h3>

                    <label htmlFor="username">Email</label>
                    <input name="mail" onChange={e => setMail(e.target.value)} type="text" placeholder="Enter your Email" id="username" />

                    <label htmlFor="password">Password</label>
                    <input name="password" onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter Password" id="password" />

                    <button type="submit" id="loginbutton">Log In</button>
                    <button id="signupbutton">Not Have an Account ? <Link to={"/signup"}><u>Sign Up</u></Link></button>

                </form>
            </>
    )
}

export default Login