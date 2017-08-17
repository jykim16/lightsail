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

  capture(cam) {
    const imageSrc = JSON.stringify(cam.getScreenshot());
    $.get('/dopple', {image: imageSrc}, (data) => {
      this.setState({
        celebName: data.CelebrityFaces[0].Name,
        celebLink: data.CelebrityFaces[0].Urls[0],
        confidence: data.CelebrityFaces[0].MatchConfidence
      });
      console.log(data)
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
