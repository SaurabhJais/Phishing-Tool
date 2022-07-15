import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import "../css/auth.css"
import swal from "sweetalert";
import { useSelector } from "react-redux"


import axios from "axios"

function Signup() {
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
    let currLoginState = useSelector((state) => state.isLoggedIn);
    


    const signedUp = (e) => {
        e.preventDefault()

        axios.post("/signup", { name, mail, phone, password }).then((res) => {
            if(res.data.isSuccess == true){
                
                swal("Goood Job", "You have successfully Created an account. Now its time for login", "success")
                .then((value) => {
                  navigate("/login");
                });

            }else{
                swal("Ooops...", res.data, "warning")
            }
        })
    }

    if(currLoginState){
        navigate("/dashboard");
        return;
    }
    
    return (
        <>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form className="form2" onSubmit={signedUp}>
                <h3>Signup Here</h3>

                <label htmlFor="name">Name</label>
                <input name="name" onChange={e => setName(e.target.value)} type="text" placeholder="Email or Phone" id="username" />

                <label htmlFor="Email">Email</label>
                <input name="email" onChange={e => setMail(e.target.value)} type="text" placeholder="Email" id="username" />

                <label htmlFor="phone">phone</label>
                <input name="phone" onChange={e => setPhone(e.target.value)} type="text" placeholder="Phone" id="username" />

                <label htmlFor="password">Password</label>
                <input type="password" onChange={e => setPassword(e.target.value)} name="password" placeholder="Password" id="password" />

                <button type="submit" id="loginbutton">Sign Up</button>
                <button id="signupbutton">Not Have an Account ? <Link to={"/login"}><u>Login</u></Link></button>

            </form>

        </>
    )
}

export default Signup;