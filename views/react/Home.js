import ReactDOM from 'react-dom/client';
import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import { Tweet } from './Tweet';

function Home(props){
  
  const tweetForm = useRef();
  const tweetTextArea = useRef();
  const tweetTextDiv = useRef();
  const [tweet, setTweet] = useState('');
  const [tweetList, setTweetList] = useState([]);
  const [tweetTxtDivVal, setTweetTextDivVal] = useState('');
  const initialTextAreaHeight = useRef();
  const userMenu = useRef();

  useEffect(() => {
    if(!tweet)
      updateTweetList();
    if(!initialTextAreaHeight.current)
      initialTextAreaHeight.current = tweetTextArea.current.clientHeight;
    let newTweetTxtDivVal = tweet; 
    if(tweet[tweet.length - 1] === '\n')
      newTweetTxtDivVal += '\n';
    setTweetTextDivVal(newTweetTxtDivVal);
  }, [tweet]);

  useEffect(() => {
    if(tweetTxtDivVal)
      tweetTextArea.current.style.height = tweetTextDiv.current.clientHeight + 'px';
    else
      tweetTextArea.current.style.height = initialTextAreaHeight.current + 'px';
  }, [tweetTxtDivVal]);

  useEffect(() => {
    addScrollEvent();
    positionUserMenu();
    const interval = window.setInterval(updateTweetList, 3000);
    return () => clearInterval(interval);
  }, []);

  function positionUserMenu(){
    let elem = userMenu.current;
    elem.style.top = (document.documentElement.clientHeight + document.documentElement.scrollTop - elem.offsetHeight) + 'px';
    elem.style.left = (0 - elem.offsetWidth) + 'px';
  }

  function addScrollEvent(){
    document.addEventListener('scroll', () => {
      positionUserMenu();
    })
  }

  function updateTweetList(){
    fetch('/tweets', {
      method: 'GET'
    })
    .then(response => {return response.json()})
    .then(data => setTweetList(data));
  }

  function onChange(e){
    setTweet(e.target.value);
  }
  
  function onSubmit(e){
    e.preventDefault();
    const data = new URLSearchParams();
    data.append('userEmail', props.userEmail);
    data.append('content', tweet);
    fetch(e.target.action, {
      method: 'POST',
      body: data
    })
    .then(setTweet(''));
  }

  function onClickLogout(e){
    e.preventDefault();
    fetch('/logout', {
      method: 'POST'
    })
    .then(res => {
      if(res.redirected)
        window.location.href = res.url;
    });
  }

  return (
    <React.Fragment>
      <div id="main">
        <div>Home</div>
        <form ref={tweetForm} className="tweet-form" action="/tweet" onSubmit={onSubmit}>
          <div className="ta-div">
            <textarea ref={tweetTextArea} className="ta" placeholder="What's happening?" rows="1" value={tweet} onChange={onChange}/>
            <div ref={tweetTextDiv} className="ta-sib">{tweetTxtDivVal}</div>
          </div>
          <div className="submit-div">
            <input type="submit" value="Tweet" disabled={tweet ? false : true}/>
          </div>
        </form>
        <div id="tweet-list">
          {tweetList.map((t, i) => 
          <Tweet 
            key={i} 
            content={t.content} 
            authorName={t.authorName} 
            postTime={t.postTime}/>)}
        </div>
        <div ref={userMenu} className="user-menu">
          <div>
            <div><strong>{authData.userName}</strong></div>
            <div>{authData.userEmail}</div>
          </div>
          <button  onClick={onClickLogout}>Logout</button>
        </div>
      </div>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home userEmail={authData.userEmail} />);