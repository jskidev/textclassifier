import '../App.css';

import React, { useState, useEffect } from 'react';

function New() {

    const handleSingleClick = () => {
        window.location = '/classify'
    }
    const handleMultipleClick = () => {
        window.location = '/upload'
    }
    return (
        <div className="App">
        <button onClick={handleSingleClick}>Single</button>
        <button onClick={handleMultipleClick}>Multiple</button>
        </div>
    );
}

export default New;
