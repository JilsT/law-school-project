import React from "react";

import Button from "../components/button";

import './home.css';

const Home = () => {
    return (<>
        <div className="home">
            <div className="home-page">
                <div className="background">
                    <div className="description">
                        <h1>Unlock your legal potential with our internship opportunities.</h1>
                        <p className="p-content">
                            If you're a law school student, gaining practical experience through internships can be critical for launching your legal career. Our website is dedicated to helping you find the best internship opportunities available.
                        </p>
                        <Button href='/internships'>Check Out Internships!</Button>
                        <Button href="/auth">Any Queries?</Button>
                    </div>
                    <div className="background-image">
                        <img className="bg-image" src="students.png" alt="bg.png"/>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
};

export default Home;