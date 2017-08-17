import React from 'react';


const CelebrityCard = (props) => {
  if(props.name) {
    return(
      <span>
        <h1>You matched with:</h1>
        <h2>{props.name}</h2>
        <a href={'http://'+props.picture}>{props.name}{"'s IMDB page"}</a>
        <h2> Match Accuracy: {props.confidence}%</h2>
      </span>
    );
  } else {
    return(<div>No celebrity matches</div>);
  }
}

export default CelebrityCard;
