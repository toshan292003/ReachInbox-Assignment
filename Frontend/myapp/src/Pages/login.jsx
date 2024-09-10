import {React,useState,useEffect} from "react";
import "./login.css";
import LongLogo from "../Images/longLogo.png";
import googleLogo from "../Images/google.png";

export default function Login(){
    useEffect(() => {
        console.log('Component rendered or updated.');
    },
    []
    );
    return(
        <>
            <div className="login flex column center">
                <section className="flex row center">
                    <img src={LongLogo} alt="" />
                </section>
                <section>
                    <div>
                        <h2>Create a new account</h2>
                        <a href="https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=http://localhost:3000/home">
                            <img src={googleLogo} alt="" />
                            <button>Sign up with Google</button>
                        </a>
                        <button className="loginbutton">Create an Account</button>
                        <p>Already have an account? <span>Sign in</span></p>
                    </div>
                </section>
                <section className="flex row center"><span>© 2023 Reachinbox. All rights reserved.</span></section>
            </div>
        </>
    )
}