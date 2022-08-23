import ReactDOM from 'react-dom/client';
import React, { useEffect, useRef, useState } from 'react';
import './Home.css';

function Home(props){
  
  const tweetForm = useRef();
  const tweetTextArea = useRef();
  const tweetTextDiv = useRef();
  const [tweet, setTweet] = useState('');
  const [tweetTxtDivVal, setTweetTextDivVal] = useState('');
  const initialTextAreaHeight = useRef();

  useEffect(() => {
    if(!initialTextAreaHeight)
      initialTextAreaHeight = tweetTextArea.current.clientHeight;
    let newTweetTxtDivVal = tweet; 
    if(tweet[tweet.length - 1] === '\n')
      newTweetTxtDivVal += '\n';
    setTweetTextDivVal(newTweetTxtDivVal);
    
  }, [tweet]);

  useEffect(() => {
    if(tweetTxtDivVal)
      tweetTextArea.current.style.height = tweetTextDiv.current.clientHeight + 'px';
    else
      tweetTextArea.current.style.height = 19 + 'px';
  }, [tweetTxtDivVal]);

  function onChange(e){
    setTweet(e.target.value);
  }
  
  function onSubmit(e){
    
  }

  return (
    <div id="main">
      <div>Home</div>
      <form ref={tweetForm} className="tweet-form" onSubmit={onSubmit}>
        <div className="ta-div">
          <textarea ref={tweetTextArea} className="ta" placeholder="What's happening?" rows="1" value={tweet} onChange={onChange}/>
          <div ref={tweetTextDiv} className="ta-sib">{tweetTxtDivVal}</div>
        </div>
        <div className="submit-div">
          <input type="submit" value="Tweet" disabled={tweet ? false : true}/>
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