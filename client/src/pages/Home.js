import '../App.css';

import React, { useState, useEffect } from 'react';

function Home() {

    const handleClick = () => {
        window.location = '/new'
    }

    return (
    <div className="App">
        Home
        <button onClick={handleClick}>get started</button>
    </div>
    );
}

export default Home;
