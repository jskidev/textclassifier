import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [text, setText] = useState('');
  const [threshold, setThreshold] = useState(0.8);
  const [files, setFiles] = useState();

  const handleInputChange = (event) => {
    setText(event.target.value)
  }

  const handleThresholdChange = (event) => {
    setThreshold(event.target.value)
  }

  const handleFileChange = (event) => {
    setFiles(event.target.files[0]);
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      axios({
          method: 'post',
          //url: 'http://localhost:8000/api/',    //DEVELOPMENT
          url: window.location.origin+'/api/new',  //PRODUCTION
          data: {
            text,
            threshold
          }
        })
      .then(function (response) {
          console.log(response);
          setText('');
      })
      .catch(function (error) {
          console.log(error);
      })
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
      <form onSubmit={handleSubmit}>
        <label for="text">Text</label>
        <input name="text" type="text" placeholder="test" required onChange={handleInputChange} value={text} id="text" />
        <label for="threshold">Confidence threshold</label>
        <input name="threshold" type="number" min="0" max="1" step="0.01" id="threshold" onChange={handleThresholdChange} value={threshold}/>
        <button>submit</button>
      </form>
      <form onSubmit={handleFormSubmit} enctype="multipart/form-data">
        <input type="file" name="dataFile" onChange={handleFileChange} required />
        <button>submit</button>
      </form>
    </div>
  );
}

export default App;
