import React from 'react';
import './Tweet.css';

export function Tweet(props){

  let date = new Date(props.postTime);
  let formattedDate = `${date.toLocaleDateString('en-us', {month:"short", day:"numeric"})}, 
    ${date.toLocaleTimeString('en-ca', { hour: '2-digit', minute: '2-digit', hour12: false })}`;

  return(
    <div className="tweet">
      <span className="tweet-author">{props.authorName}</span><span className="tweet-datetime"> · {formattedDate}</span>
      <br/>
      {props.content}
    </div>
  );
}