import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './components/landing.jsx';
import CelebrityCard from './components/celebrity.jsx';

import $ from 'jquery'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      stage: 'landing',
      celebName: '',
      celebLink: '',
      confidence: ''
    };
    this.capture = this.capture.bind(this);
  }
  getBinary(base64Image) {
    var binaryImg = atob(base64Image);
    var length = binaryImg.length;
    var ab = new ArrayBuffer(length);
    var ua = new Uint8Array(ab);
    for (var i = 0; i < length; i++) {
      ua[i] = binaryImg.charCodeAt(i);
    }
    return ab;
  }

  capture(screenShot) {
    var binary = this.getBinary(screenShot.slice(27))
    console.log(binary)
    $.ajax({
      url: '/dopple',
      data: binary,
      processData: false,
      contentType: "multipart/form-data",
      type: "POST",
      success: (data) => {
        console.log(data)
        this.setState({
          celebName: data.CelebrityFaces[0].Name,
          celebLink: data.CelebrityFaces[0].Urls[0],
          confidence: data.CelebrityFaces[0].MatchConfidence
        });
      }
    });
  }


  render() {

    // Conditional rendering based on stage of the app
    let element = '';
    if (this.state.stage === 'landing') {
      element = <Landing capture={this.capture} />;
    }

    return (
      <div>
        {element}
        <CelebrityCard name={this.state.celebName} picture={this.state.celebLink} confidence={this.state.confidence}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
