import './Classify.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Classify() {

  const [text, setText] = useState('');
  const [threshold, setThreshold] = useState(0.8);
  const [theResults, setTheResults] = useState([]);
  const [spinner, setSpinner] = useState(false);

  const handleInputChange = (event) => {
    setText(event.target.value)
  }

  const handleThresholdChange = (event) => {
    setThreshold(event.target.value)
  }

  const handleNewClick = () => {
    window.location = '/new'
  }

  const handleSubmit = (event) => {
      setSpinner(true);
      event.preventDefault();
      axios({
          method: 'post',
          //url: 'http://localhost:8000/api/',    //DEVELOPMENT
          url: window.location.origin+'/api/',  //PRODUCTION
          data: {
            text,
            threshold
          }
        })
      .then(function (response) {
          let output = [];
          output.push(text);
          for( var i = 0 ; i < response['data'].length ; i++){
            output.push(response['data'][i]['results'][0]['match'])
          }
          setTheResults([...theResults, output]);
          console.log(theResults);
          setText('');
          setSpinner(false);
      })
      .catch(function (error) {
          console.log(error);
          setSpinner(false);
      })
  }

  return (
    <div className="container">
        <div className="content">
          <form className="manualForm" onSubmit={handleSubmit}>
            <label for="text">Sentence</label>
            <textarea name="text" placeholder="test" required onChange={handleInputChange} value={text} id="text" rows='10' cols='50' />
            <label for="threshold">Confidence threshold</label>
            <input name="threshold" type="number" min="0" max="1" step="0.01" id="threshold" onChange={handleThresholdChange} value={threshold}/>
            <button className={spinner ? 'primaryButton submitted' : 'primaryButton'}>
              {
                spinner ?
                <span class="spinner"></span>
                : 'Classify'
              }
            </button>
          </form>
          <p className="pb20">
              <button className="linkButton" onClick={handleNewClick}>back to method</button>
          </p>
        </div>
      <div className="fullWidth">
      </div>
        {  
            theResults.length > 0 ?
            <div className="overflow">
              <table>
                  <thead>
                      <tr>
                          <th>Text</th>
                          <th>Identity Attack</th>
                          <th>Insult</th>
                          <th>Obscene</th>
                          <th>Severe Toxicity</th>
                          <th>Sexually Explicit</th>
                          <th>Threat</th>
                          <th>Toxicity</th>
                      </tr>
                  </thead>
                      {
                          theResults.map(
                            (item, index) => ( 
                                <tr>
                                  {
                                    item.map(
                                      (that, count) => ( 
                                          <td style={{color: that === true ? '#e74c3c' : '#000000', fontWeight: that === true ? '600' : '400' }}>
                                            {
                                              (that === true || that === false || that == null) ? JSON.stringify(that) : that
                                            }
                                          </td>
                                      )
                                  )
                                  }
                                </tr>
                            )
                        )
                      }
              </table>
            </div>
            : ''
        }
      </div>
    
  );
}

export default Classify;
