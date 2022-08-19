import ReactDOM from 'react-dom/client';
import React, { useEffect } from 'react';
import './Home.css';

function Home(props){
  
  useEffect(() => {
    let ta = document.getElementById('ta');
    let taSib = document.getElementById('ta-sib');
    if(!ta.value)
    taSib.style.height = ta.clientHeight + 'px';
  });

  function onChange(e){
    let taSib = document.getElementById('ta-sib');
    let taText = e.target.value;
    if(taText)
    taSib.style.height = 'initial';
    if(taText[taText.length - 1] === '\n')
      taText += '\n'
    taSib.innerHTML = taText;
    if(taSib.innerHTML)
      ta.style.height = taSib.clientHeight + 'px';
  }
  
  return (
    <div id="main">
      <div>Home</div>
        <form id="tweet-form">
          <div id="ta-div">
            <textarea id="ta" placeholder="What's happening?" rows="1" onChange={onChange}/>
            <div id="ta-sib"></div>
          </div>
          <div id="submit-div">
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