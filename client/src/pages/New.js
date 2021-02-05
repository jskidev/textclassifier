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
                <h2>Select classification method</h2>
                <h4 className="pb20">Do you want to classify single sentences, or upload a csv to classify in bulk?</h4>
                <button className="primaryButton buttonLeft" onClick={handleSingleClick}>Single</button>
                <button className="primaryButton buttonRight" onClick={handleMultipleClick}>Upload</button>
                <p className="pb20">
                    <button className="linkButton" onClick={handleHomeClick}>back to home</button>
                </p>
            </div>
        </div>
    );
}

export default New;
