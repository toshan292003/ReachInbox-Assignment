import {React,useState,useEffect} from "react";
import "./login.css";
import LongLogo from "../Images/longLogo.png";

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
                    <a href="https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=http://localhost:3000/home">
                        <button>Sign in with Google</button>
                    </a>
                </section>
                <section className="flex row center"><span>© 2023 Reachinbox. All rights reserved.</span></section>
            </div>
        </>
    )
}