import '../App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Upload() {

  const [files, setFiles] = useState();

  const handleFileChange = (event) => {
    setFiles(event.target.files[0]);
  }

  const handleNewClick = () => {
    window.location = '/new'
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    var formData = new FormData();
    formData.append('dataFile', files);
    axios.post(
      //'http://localhost:8000/api/multi',    //DEVELOPMENT
      window.location.origin+'/api/multi',  //PRODUCTION
      formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
  })
    .then(function (response) {
        console.log(response['data']);
    })
    .catch(function (error) {
        console.log(error['response']['data']['message']);
    })
  }

  return (
    <div className="container">
      <div className="content">
        {
          /* 
          WORK IN PROGRESS
          <form className="manualForm" onSubmit={handleFormSubmit} enctype="multipart/form-data">
            <input type="file" name="dataFile" onChange={handleFileChange} required accept=".csv" />
            <button className="primaryButton">Upload</button>
          </form>
          */
        }
        <h2>Work In Progress</h2>
        <p className="pb20">
            <button className="linkButton" onClick={handleNewClick}>back to method</button>
        </p>
      </div>
    </div>
  );
}

export default Upload;
