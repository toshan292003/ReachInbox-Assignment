import React from "react";
import "./emailcard.css"
export default function EmailCard(props){
    return (
        <>
            <div className="flex column emailcard" style={{borderTop:props.border}}>
                <h2>{props.fromEmail}</h2>
                <p>{props.subject}</p>
            </div>
        </>
    )
}