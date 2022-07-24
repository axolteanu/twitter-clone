import ReactDOM from 'react-dom/client';
import React from 'react';

function Home(props){
  return (
    <div>
      <h1>Home</h1>
      <p id="hello">Hello, {props.username}!</p>
      <form action="/logout" method="post">
        <input type="submit" value="Logout"/>
      </form>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home username={authData.username} />);