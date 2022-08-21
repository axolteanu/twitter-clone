import ReactDOM from 'react-dom/client';
import React, { useEffect, useRef, useState } from 'react';
import './Home.css';

function Home(props){
  
  const tweetForm = useRef();
  const tweetTextArea = useRef();
  const tweetTextDiv = useRef();
  const [tweet, setTweet] = useState('');

  useEffect(() => {
    if(tweet)
      tweetTextDiv.current.style.height = 'initial';
    else
      tweetTextDiv.current.style.height = tweetTextArea.current.clientHeight + 'px';
    
    let txtDivVal = tweet; 
    if(tweet[tweet.length - 1] === '\n')
      txtDivVal += '\n';
    tweetTextDiv.current.innerHTML = txtDivVal;

    if(tweetTextDiv.current.innerHTML)
    tweetTextArea.current.style.height = tweetTextDiv.current.clientHeight + 'px';
  });

  function onChange(e){
    setTweet(e.target.value);
  }
  
  return (
    <div id="main">
      <div>Home</div>
      <form ref={tweetForm} className="tweet-form">
        <div className="ta-div">
          <textarea ref={tweetTextArea} className="ta" placeholder="What's happening?" rows="1" value={tweet} onChange={onChange}/>
          <div ref={tweetTextDiv} className="ta-sib"></div>
        </div>
        <div className="submit-div">
          <input type="submit" value="Tweet"/>
        </div>
      </form>
      {/*}
      <p id="hello">Hello, {props.username}!</p>
      <form action="/logout" method="post">
        <input type="submit" value="Logout"/>
      </form>
      {*/}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home username={authData.username} />);