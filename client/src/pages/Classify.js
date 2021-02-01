import '../App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Classify() {

  const [text, setText] = useState('');
  const [threshold, setThreshold] = useState(0.8);
  const [theResults, setTheResults] = useState([]);

  const handleInputChange = (event) => {
    setText(event.target.value)
  }

  const handleThresholdChange = (event) => {
    setThreshold(event.target.value)
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      axios({
          method: 'post',
          url: 'http://localhost:8000/api/',    //DEVELOPMENT
          //url: window.location.origin+'/api/',  //PRODUCTION
          data: {
            text,
            threshold
          }
        })
      .then(function (response) {
          console.log(response['data']);
          let output = [];
          output.push(text);
          for( var i = 0 ; i < response['data'].length ; i++){
            output.push(response['data'][i]['results'][0]['match'])
          }
          console.log(output);
          setTheResults([...theResults, output]);
          console.log(theResults);
          setText('');
      })
      .catch(function (error) {
          console.log(error);
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
      <div>
      {  
                theResults.length > 0 ? 
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
                                            <td>
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
                : ''
            }
      </div>
    </div>
  );
}

export default Classify;
