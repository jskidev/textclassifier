import '../App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Upload() {

  const [files, setFiles] = useState();

  const handleFileChange = (event) => {
    setFiles(event.target.files[0]);
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
    <div className="App">
      <form onSubmit={handleFormSubmit} enctype="multipart/form-data">
        <input type="file" name="dataFile" onChange={handleFileChange} required />
        <button>submit</button>
      </form>
    </div>
  );
}

export default Upload;
