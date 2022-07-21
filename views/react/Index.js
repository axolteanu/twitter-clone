import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { LoginModal } from './LoginModal';
import { SignupModal } from './SignupModal';
import './Index.css';

const showModalType = {
  none: 'none',
  signup: 'signup',
  login: 'login'
}

class Index extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showModal: showModalType.none
    }
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.handleLogInClick = this.handleLogInClick.bind(this);
    this.handleExitModalClick = this.handleExitModalClick.bind(this);
  }
  
  handleSignUpClick(){
    this.setState({
      showModal: showModalType.signup
    });
  }

  handleLogInClick(){
    this.setState({
      showModal: showModalType.login
    });
  }

  handleExitModalClick(){
    this.setState({
      showModal: showModalType.none
    });
  }

  renderWithModal(main, showModal){
    let modal = null;
    if(showModal === showModalType.signup)
      modal = <SignupModal handleExitClick={this.handleExitModalClick}/>;
    else if(showModal === showModalType.login)
      modal = <LoginModal handleExitClick={this.handleExitModalClick}/>;
    
    return (
      <React.Fragment>
        {main}
        {modal}
      </React.Fragment>
    );
  }

  render() {
    const main = (
      <div id="loc">
        <div id="img-div">
          <img src="images/big-bg.png"/>
          <img src="images/big-white-logo.svg" width="300" height="300"/>
        </div>
        <div id="form-div">
          <img src="images/small-blue-logo.svg" width="45" height="57"/>
          <div id="header-1">Happening now</div>
          <div id="header-2">Join Twitter today.</div>
          <div>
            <button onClick={this.handleSignUpClick}>Sign up</button>
            <p>By signing up, you agree to the <a>Terms of Service</a> and&nbsp;
            <a>Privacy Policy</a>, including <a>Cookie Use</a>.</p>
          </div>
          <div id="header-3">Already have an account?</div>
          <button onClick={this.handleLogInClick}>Log in</button>
        </div>
      </div>
    );

    const showModal = this.state.showModal;
    if(showModal === showModalType.none)
      return main;
    else
      return this.renderWithModal(main, showModal)
  }
}

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(<Index/>);