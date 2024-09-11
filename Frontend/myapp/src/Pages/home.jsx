import { React, useState, useEffect } from "react";
import "./home.css";

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
import { useRef } from "react";

// Importing Components
import "../components/emailcard.css";
import "../components/threads.css";
import "../components/deletemodel.css";
import "../components/misc.css";

export default function Home() {

    //Defining Important States and Hooks
    const [searchParams, setSearchParams] = useSearchParams();
    const tok = searchParams.get("token")
    const [data, setData] = useState([]);
    const [numEmails, setNumEmails] = useState(0);
    const [selectedEmails, setSelectedEmails] = useState(0);
    const [newReplies, setNewReplies] = useState(0);
    const [deletePopup, setdeletePopup] = useState(false);
    const [searchQuery, setsearchQuery] = useState(null);

    const scrollDiv = useRef(null);

    const handleScroll = (e) => {
        if (scrollDiv.current) {
            scrollDiv.current.scrollTop += e.deltaY * 0.5;
        }
    };

    const updateSearchQuery = (e)=>{
        setsearchQuery(e.target.value);
        console.log(searchQuery);
    }

    //Function to format email dates
    function formatEmailDate(timestamp) {
        const date = new Date(timestamp);

        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        return formattedDate;
    }
    //Function to convert time stamp to Email Date + time
    function convertTimestamp(timestamp) {
        const date = new Date(timestamp);

        const day = date.getUTCDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getUTCFullYear();

        let hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${day} ${month} ${year} : ${hours}:${formattedMinutes}${ampm}`;
    }
    //Function to truncate email subjects
    function truncateString(str, n) {
        if (str.length > n) {
            return str.substring(0, n) + '...';
        }
        return str;
    }


    // Function to fetch data from API using auth token 
    const fetchEmailData = async () => {
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
            setNumEmails(result.data.length)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchEmailData();
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    useEffect(() => {
        console.log(numEmails)
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
        misc_back:"#101010",
        datebox: "#151515",
        boxshadow: "0px 5px 20px rgba(255,255,255,0.1)",
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
                datebox: "#CCCCCC",
                misc_back:"#DDDDDD",
                boxshadow: "0px 5px 20px rgba(0,0,0,0.1)",
                secondary_back: "#FFFFFF",
                nav_back: "transparent",
                logo: LogoB,
                left: "40px",
                Icons: [homeB, magB, sendB, moreB, inboxB, statisticsB]
            }));
        }
    }

    //State and Function to handle click of an email and update thread variables
    const [threadID, setThreadID] = useState("");
    const [threadDetails, setThreadDetails] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const clickEmailBox = (index, ID) => {
        setSelectedIndex(index);
        console.log(selectedIndex);
        setSelectedEmails(1);
        setThreadID(ID);
        getThreadDetails();
    };

    const getThreadDetails = async () => {
        try {
            const response = await fetch(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadID}`, {
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
            setThreadDetails(result)
            console.log(result)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'd') {
            if (selectedIndex != null) {
                openDeleteModel();
            }
            console.log("Key pressed.")
            console.log(selectedIndex)
        }
    };

    const openDeleteModel = () => {
        setdeletePopup(true);
    }
    const cancelDelete = () => {
        setdeletePopup(false);
    }

    const deleteSelectedEmail = async () => {
        try {
            const response = await fetch(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${data.data[selectedIndex].threadId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tok}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        fetchEmailData();
        setSelectedIndex(null);
        setSelectedEmails(0);
        setdeletePopup(false);
    }

    const resetAPI = async () => {
        try {
            const response = await fetch(`https://hiring.reachinbox.xyz/api/v1/onebox/reset`, {
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
            console.log(result.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        fetchEmailData();
        setThreadDetails(null);
        setSelectedIndex(null);
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
                    <section className="body">

                        {/* Start of Left Side Inbox Section */}
                        <section className="bodyitem flex column" style={{ borderRight: ColorTheme.border }}>
                            <h1>All Inbox&#40;s&#41;</h1>
                            <button style={{ border: ColorTheme.border, backgroundColor: ColorTheme.misc_back ,color:ColorTheme.textcolor}} onClick={resetAPI}>&#8634;</button>
                            <p>
                                <b>{selectedEmails}/{numEmails}</b><span style={{ color: ColorTheme.secondarytextcolor }}>  Inboxes Selected</span>
                            </p>
                            <div className="search">
                                <input type="text" style={{ backgroundColor: ColorTheme.secondary_back, border: ColorTheme.border, color: ColorTheme.textcolor }} onChange={updateSearchQuery} placeholder="Search" />
                            </div>
                            <div className="flex row center between">
                                <p className="flex center row"><span style={{ backgroundColor: ColorTheme.misc_back }}>{newReplies}</span><b>New Replies</b></p>
                                <select style={{ color: ColorTheme.textcolor }}>
                                    <option value="" style={{ backgroundColor: ColorTheme.primary_back }}>Newest</option>
                                    <option style={{ backgroundColor: ColorTheme.primary_back }}>Oldest</option>
                                    <option style={{ backgroundColor: ColorTheme.primary_back }}>Sort by Size</option>
                                    <option style={{ backgroundColor: ColorTheme.primary_back }}>Alphabetical</option>
                                </select>
                            </div>
                            <div className="flex column center" style={{ gap: "0px" }}>
                                {Array.isArray(data.data) && data.data.length > 0 ? (
                                    data.data.map((user, index) => (
                                        <div className="flex column emailcard" style={{ borderTop: ColorTheme.border, borderLeft: selectedIndex === index ? '5px solid #4285f4' : '5px solid transparent' }} key={index} onClick={() => clickEmailBox(index, user.threadId)}>
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

                        {/* Start of Middle Inbox Section for Displaying Thread Details */}
                        <section className="bodyitem flex column" style={{ borderRight: ColorTheme.border }}>
                            {selectedIndex !== null ?
                                <>
                                    <section className="flex row between threadnav" style={{ borderBottom: ColorTheme.border }}>
                                        <div>
                                            <h3>{data.data[selectedIndex].fromName}</h3>
                                            <span style={{ color: ColorTheme.secondarytextcolor }}>{data.data[selectedIndex].fromEmail}</span>
                                        </div>
                                        <div>

                                        </div>
                                    </section>
                                    <section className="flex column center threadbox" onWheel={handleScroll} ref={scrollDiv}>
                                        {threadDetails !== null ?
                                            <>
                                                {Array.isArray(threadDetails.data) && threadDetails.data.length > 0 ? (
                                                    threadDetails.data.map((user, index) => (
                                                        <>
                                                            <div className="flex center row threadDate">
                                                                <b style={{ backgroundColor: ColorTheme.datebox }}></b>
                                                                <span style={{ backgroundColor: ColorTheme.datebox }}>
                                                                    {formatEmailDate(user.createdAt)}
                                                                </span>
                                                            </div>
                                                            <div className="flex column threadBody" style={{ backgroundColor: ColorTheme.nav_back, border: ColorTheme.border, boxShadow: ColorTheme.boxshadow }}>
                                                                <b style={{ color: ColorTheme.secondarytextcolor }}>{convertTimestamp(user.createdAt)}</b>
                                                                <h4>{user.fromName}</h4>
                                                                <span style={{ color: ColorTheme.secondarytextcolor }}>from : {user.fromEmail}</span>
                                                                <span style={{ color: ColorTheme.secondarytextcolor }}>to : {user.toEmail}</span>
                                                                <div dangerouslySetInnerHTML={{ __html: user.body }} />
                                                            </div>
                                                        </>
                                                    ))
                                                ) : (
                                                    <p>No data available</p>
                                                )}
                                            </>
                                            : null
                                        }
                                        <div>
                                            <button onClick={openDeleteModel}>Delete</button>
                                            <button>Reply</button>
                                        </div>
                                    </section>
                                </>
                                : null
                            }
                        </section>
                        {/* End of Middle Inbox Section for Displaying Thread Details */}

                        {/* Start of Last Inbox Section for displaying Company Details */}
                        <section className="bodyitem flex column">
                            {
                                selectedIndex !== null ?
                                    <>
                                        <div className="flex column">
                                            <h2 style={{backgroundColor:ColorTheme.misc_back}}>Lead Details</h2>
                                            <ul className="flex column">
                                                <li>
                                                    <span style={{ color: ColorTheme.textcolor }}>Name</span>
                                                    <span style={{ color: ColorTheme.secondarytextcolor }}>{data.data[selectedIndex].fromName}</span>
                                                </li>
                                                <li>
                                                    <span style={{ color: ColorTheme.textcolor }}>Contact No</span>
                                                    <span style={{ color: ColorTheme.secondarytextcolor }}>+91 9062827869</span>
                                                </li>
                                                <li>
                                                    <span style={{ color: ColorTheme.textcolor }}>Email ID</span>
                                                    <span style={{ color: ColorTheme.secondarytextcolor }}>{data.data[selectedIndex].fromEmail}</span>
                                                </li>
                                                <li>
                                                    <span style={{ color: ColorTheme.textcolor }}>Linkedin</span>
                                                    <span style={{ color: ColorTheme.secondarytextcolor }}>linkedin.com/in/timvadde/</span>
                                                </li>
                                                <li>
                                                    <span style={{ color: ColorTheme.textcolor }}>Company Name</span>
                                                    <span style={{ color: ColorTheme.secondarytextcolor }}>Reachinbox</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="flex column">
                                            <h2 style={{backgroundColor:ColorTheme.misc_back}}>Activities</h2>
                                            <p>Campaign Name</p>
                                            <p style={{color:ColorTheme.secondarytextcolor}}>3 Steps | 5 Days in Sequence</p>
                                            <ul className="flex column">
                                                <hr style={{backgroundColor:ColorTheme.misc_back}} />
                                                <li className="flex row">
                                                    <section className="flex row center" style={{border:ColorTheme.border,backgroundColor:ColorTheme.misc_back}}><img src={ColorTheme.Icons[2]}/></section>
                                                    <section className="flex column">
                                                        <span style={{color:ColorTheme.textcolor}}>Step 1 : Email</span>
                                                        <span style={{color:ColorTheme.secondarytextcolor}}>Sent 3rd, Feb</span>
                                                    </section>
                                                </li>
                                                <li className="flex row">
                                                    <section className="flex row center" style={{border:ColorTheme.border,backgroundColor:ColorTheme.misc_back}}><img src={ColorTheme.Icons[2]}/></section>
                                                    <section className="flex column">
                                                        <span style={{color:ColorTheme.textcolor}}>Step 2 : Email</span>
                                                        <span style={{color:ColorTheme.secondarytextcolor}}>Opened 5th, Feb</span>
                                                    </section>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                    : (<></>)
                            }

                        </section>
                        {/* Start of Last Inbox Section for displaying Company Details */}

                    </section>
                </div>
            </div>
            {/* Start of Delete Popup */}
            {deletePopup == true ?
                <>
                    <div className="deletemodel flex column center">
                        <section>
                            <h1>Are you sure?</h1>
                            <p>Your Selected Email will be deleted</p>
                            <div>
                                <button onClick={cancelDelete}>Cancel</button>
                                <button onClick={deleteSelectedEmail}>Delete</button>
                            </div>
                        </section>
                    </div>
                </>
                :
                (<></>)
            }
            {/* End of Delete Popup */}
        </>
    )
}