import { React, useState, useEffect } from "react";
import "./home.css";
import "../components/emailcard.css";
import { useLocation, useSearchParams } from 'react-router-dom';

/*Importing All Images*/
import LogoB from "../Images/reachinbox_ai_logoB.jpg";
import Logo from "../Images/reachinbox_ai_logo.jpeg";
import homeB from "../Images/home.png";
import inboxB from "../Images/inbox.png";
import magB from "../Images/magnifying-glass.png";
import moreB from "../Images/more.png";
import sendB from "../Images/send.png";
import statisticsB from "../Images/statistics.png";
import homeW from "../Images/homeW.png";
import inboxW from "../Images/inboxW.png";
import magW from "../Images/magnifying-glassW.png";
import moreW from "../Images/moreW.png";
import sendW from "../Images/sendW.png";
import statisticsW from "../Images/statisticsW.png";

import sun from "../Images/sun.png"
import moon from "../Images/night.png"

// Importing Components

export default function Home() {

    const [searchParams, setSearchParams] = useSearchParams();
    const tok = searchParams.get("token")
    const [data, setData] = useState([]);


    //Function to format email dates
    function formatEmailDate(timestamp) {
        const date = new Date(timestamp);
        console.log(timestamp)

        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        console.log(formattedDate)
        return formattedDate;
    }
    //Function to truncate email subjects
    function truncateString(str, n) {
        if (str.length > n) {
            return str.substring(0, n) + '...';
        }
        return str;
    }


    const sampleData = {
        "status": 200,
        "data": [
            {
                "id": 97728,
                "fromName": "Shaw Adley",
                "fromEmail": "shaw@getmemeetings.com",
                "toName": "",
                "toEmail": "mitrajit2022@gmail.com",
                "cc": [],
                "bcc": [],
                "threadId": 65177,
                "messageId": "<68Jt4CxTIm6sYi@getmemeetings.com>",
                "inReplyTo": "<6woWrxD3kzMjZq@gmail.com>",
                "references": "<6woWrxD3kzMjZq@gmail.com>",
                "subject": "Shaw - following up on our meeting last week... | 7ZG2ZTV 6KG634E",
                "body": "<p>Hi Mitrajit,</p><p>Just wondering if you&rsquo;re still interested.</p><p>Regards,<br/>Shaw Adley</p><p>6KG634E practicecowboy</p>",
                "isRead": true,
                "folder": "INBOX",
                "uid": 594,
                "sentAt": "2022-02-02T16:19:48.000Z",
                "archivedAt": null,
                "deletedAt": null,
                "createdAt": "2024-09-09T16:19:48.000Z",
                "updatedAt": "2024-09-09T16:19:48.000Z"
            },
            {
                "id": 97729,
                "fromName": "Shaw Adley",
                "fromEmail": "shaw@getmemeetings.com",
                "toName": "",
                "toEmail": "mitrajit2022@gmail.com",
                "cc": [],
                "bcc": [],
                "threadId": 65178,
                "messageId": "<68Jt4CxTIm6sYi@getmemeetings.com>",
                "inReplyTo": "<6woWrxD3kzMjZq@gmail.com>",
                "references": "<6woWrxD3kzMjZq@gmail.com>",
                "subject": "Test mail",
                "body": "<p>Test mail</p>",
                "isRead": true,
                "folder": "INBOX",
                "uid": 594,
                "sentAt": "2022-02-03T16:19:48.000Z",
                "archivedAt": null,
                "deletedAt": null,
                "createdAt": "2024-09-09T16:19:48.000Z",
                "updatedAt": "2024-09-09T16:19:48.000Z"
            }
        ]
    }

    // Function to fetch data from API using auth token 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://hiring.reachinbox.xyz/api/v1/onebox/list', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tok}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        GetRandColor();
    }, []);

    useEffect(() => {
        console.log('Data updated:', data);
    }, [data]);

    const [ProfColor, setProfColor] = useState("#152632");
    //Get Random Color function for User Profile
    const GetRandColor = () => {
        let color = "#"
        for (let i = 0; i < 3; i++) {
            color = color + Math.floor(Math.random() * 51);
        }
        setProfColor(color);
    }

    //State Variable for Light Mode and Dark Mode CSS
    const defaultColorMode = {
        theme: "dark",
        textcolor: "#FFFFFF",
        secondarytextcolor: "#888888",
        primary_back: "#000000",
        secondary_back: "#202020",
        nav_back: "#101010",
        border: "1px solid #303030",
        left: "5px",
        logo: Logo,
        Icons: [homeW, magW, sendW, moreW, inboxW, statisticsW]
    }
    const [ColorTheme, setColorTheme] = useState(defaultColorMode);

    //Updation of Color Mode CSS Variables
    const changetheme = () => {
        GetRandColor();
        if (ColorTheme.theme == "light") {
            setColorTheme(defaultColorMode);
        }
        else if (ColorTheme.theme == "dark") {
            setColorTheme((prevState) => ({
                ...prevState,
                theme: "light",
                textcolor: "#303030",
                secondarytextcolor: "#606060",
                primary_back: "#FFFFFF",
                border: "1px solid #AAAAAA",
                secondary_back: "#FFFFFF",
                nav_back: "#FFFFFF",
                logo: LogoB,
                left: "40px",
                Icons: [homeB, magB, sendB, moreB, inboxB, statisticsB]
            }));
        }
    }

    return (
        <>
            <div className="home flex row center">
                {/* Start of Left Navbar */}
                <div className="navbar flex column" style={{ backgroundColor: ColorTheme.nav_back, color: ColorTheme.textcolor, borderRight: ColorTheme.border }}>
                    <section className="navbar-item1">
                        <div className="flex row center">
                            <img src={ColorTheme.logo} alt="" />
                        </div>
                    </section>
                    <section className="navbar-item2 flex column center">
                        {
                            ColorTheme.Icons.map((image, i) => (
                                <div className="flex center">
                                    <img src={image} />
                                </div>
                            ))
                        }
                    </section>
                    <section className="navbar-item3">
                        <div className="flex row center" style={{ backgroundColor: ProfColor }}>
                            TS
                        </div>
                    </section>
                </div>
                {/* End of Left Navbar */}


                {/* Start of Remaining Frame */}
                <div className="mainframe flex column" style={{ backgroundColor: ColorTheme.primary_back, color: ColorTheme.textcolor }}>
                    {/* Start of Secondary (Top) Navbar */}
                    <section className="subnav flex row" style={{ backgroundColor: ColorTheme.nav_back, borderBottom: ColorTheme.border }}>
                        <div>
                            <h3>Onebox</h3>
                        </div>
                        <div className="flex row">
                            <section className="flex row" onClick={changetheme} style={{ border: ColorTheme.border }}>
                                <span style={{ left: ColorTheme.left }}></span>
                                <img src={moon} alt="" />
                                <img src={sun} alt="" />
                            </section>
                            <select style={{ color: ColorTheme.textcolor }}>
                                <option value="" style={{ backgroundColor: ColorTheme.primary_back }}>Toshan's Workspace</option>
                                <option style={{ backgroundColor: ColorTheme.primary_back }}>Toshan's Workspace</option>
                                <option style={{ backgroundColor: ColorTheme.primary_back }}>Toshan's Workspace</option>
                                <option style={{ backgroundColor: ColorTheme.primary_back }}>Toshan's Workspace</option>
                                <option style={{ backgroundColor: ColorTheme.primary_back }}>Toshan's Workspace</option>
                            </select>
                        </div>
                    </section>

                    {/* End of Secondary Navbar */}

                    {/* Start of Inbox page main Body */}
                    <section className="body flex row">

                        {/* Start of Left Side Inbox Section */}
                        <section className="bodyitem flex column" style={{ borderRight: ColorTheme.border }}>
                            <h1>All Inbox&#40;s&#41;</h1>
                            <p>
                                <b>25/25</b><span style={{ color: ColorTheme.secondarytextcolor }}>  Inboxes Selected</span>
                            </p>
                            <div className="search">
                                <input type="text" style={{ backgroundColor: ColorTheme.secondary_back, border: ColorTheme.border, color: ColorTheme.textcolor }} placeholder="Search" />
                            </div>
                            <div className="flex row center between">
                                <p className="flex center row"><span style={{ backgroundColor: ColorTheme.nav_back }}>26</span><b>New Replies</b></p>
                                <select style={{ color: ColorTheme.textcolor }}>
                                    <option value="" style={{ backgroundColor: ColorTheme.primary_back }}>Newest</option>
                                    <option style={{ backgroundColor: ColorTheme.primary_back }}>Oldest</option>
                                    <option style={{ backgroundColor: ColorTheme.primary_back }}>Sort by Size</option>
                                    <option style={{ backgroundColor: ColorTheme.primary_back }}>Alphabetical</option>
                                </select>
                            </div>
                            <div className="flex column center" style={{gap:"0px"}}>
                                {/* {data === null && (
                                        <p>The object is null!</p>
                                    )}
                                    {data.map((user, index) => (
                                        <li key={index} className="flex column">
                                            <h1></h1>
                                            <p></p>
                                        </li>
                                    ))} */}
                                {Array.isArray(sampleData.data) && sampleData.data.length > 0 ? (
                                    sampleData.data.map((user, index) => (
                                        <div className="flex column emailcard" style={{ borderTop: ColorTheme.border }} key={index}>
                                            <span style={{ color: ColorTheme.secondarytextcolor }}>{formatEmailDate(user.createdAt)}</span>
                                            <h2>{truncateString(user.fromEmail, 15)}</h2>
                                            <p>{truncateString(user.subject, 30)}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No data available</p>
                                )}
                            </div>
                        </section>
                        {/* End of Left Side Inbox Section */}

                        <section className="bodyitem flex column" style={{ borderRight: ColorTheme.border }}>

                        </section>
                        <section className="bodyitem flex column">

                        </section>
                    </section>
                </div>
            </div >
        </>
    )
}