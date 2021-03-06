import React, { useState } from 'react';
import ReactDOMClient from 'react-dom/client';
import { LoginModal } from './LoginModal';
import { SignupModal } from './SignupModal';
import { ModalContext } from './Contexts';
import './Index.css';

const showModalType = {
  none: 'none',
  signup: 'signup',
  login: 'login'
}

function Index(){
  const [showModal, setShowModal] = useState(showModalType.none);

  function handleSignUpClick(){
    setShowModal(showModalType.signup);
  }

  function handleLogInClick(){
    setShowModal(showModalType.login);
  }

  function handleExitModalClick(){
    setShowModal(showModalType.none);
  }

  function renderWithModal(main, showModal){
    let modal = null;
    if(showModal === showModalType.signup)
      modal = <SignupModal/>;
    else if(showModal === showModalType.login)
      modal = <LoginModal/>;
    
    return (
      <React.Fragment>
        {main}
        <ModalContext.Provider value={{
          handleExitClick: handleExitModalClick
        }}>
          {modal}
        </ModalContext.Provider>
      </React.Fragment>
    );
  }

  const main = (
    <div id="main">
      <div id="img-section">
        <img src="images/big-bg.png"/>
        <img src="images/big-white-logo.svg" width="300" height="300"/>
      </div>
      <div id="menu-section">
        <img src="images/small-blue-logo.svg" width="45" height="57"/>
        <div>Happening now</div>
        <div>Join Twitter today.</div>
        <div>
          <button onClick={handleSignUpClick}>Sign up</button>
          <p>By signing up, you agree to the <a>Terms of Service</a> and&nbsp;
          <a>Privacy Policy</a>, including <a>Cookie Use</a>.</p>
        </div>
        <div>Already have an account?</div>
        <button onClick={handleLogInClick}>Log in</button>
      </div>
    </div>
  );

  if(showModal === showModalType.none)
    return main;
  else
    return renderWithModal(main, showModal);
}

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(<Index/>);