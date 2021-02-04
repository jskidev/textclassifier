import '../App.css';

import React, { useState, useEffect } from 'react';

function New() {

    const handleSingleClick = () => {
        window.location = '/classify'
    }
    const handleMultipleClick = () => {
        window.location = '/upload'
    }
    const handleHomeClick = () => {
        window.location = '/'
    }

    return (
        <div className="startContainer">
            <div className="startContent">
                <h2 className="pb20">How many sentences do you want to classify?</h2>
                <button className="primaryButton buttonLeft" onClick={handleSingleClick}>Single</button>
                <button className="primaryButton buttonRight" onClick={handleMultipleClick}>Multiple</button>
                <p className="pb20">
                    <button className="linkButton" onClick={handleHomeClick}>back to home</button>
                </p>
            </div>
        </div>
    );
}

export default New;
