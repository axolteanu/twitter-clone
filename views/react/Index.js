import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { IndexModal } from './IndexModal';

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
    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleExitModalClick = this.handleExitModalClick.bind(this);
  }
  
  handleSignUpClick(){
    this.setState({
      showModal: showModalType.signup
    })
  }

  handleSignInClick(){
    this.setState({
      showModal: showModalType.login
    })
  }

  handleExitModalClick(){
    this.setState({
      showModal: showModalType.none
    });
  }

  render() {
    const loc = (
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
          <button onClick={this.handleSignInClick}>Log in</button>
        </div>
      </div>
    );

    const showModal = this.state.showModal;
    if(showModal === showModalType.none)
      return loc;
    else{
      let modal = null;
      if(showModal === showModalType.signup){
        modal = (
          <IndexModal handleExitClick={this.handleExitModalClick} type={showModal}>
            <div id="step-1">
              <div>Create your account</div>
              <div className="dynamic-text-input">
                <input name="name" />
                <label>Name</label>
              </div>
              <div className="dynamic-text-input">
                <input name="password" type="password" />
                <label>Password</label>
              </div>
              <div className="dynamic-text-input">
                <input name="email" />
                <label>Email</label>
              </div>
              <div id="dob-section">
                <h5>Date of birth</h5>
                <p>
                  This will not be shown publicly. Confirm your own age, even if
                  this account is for a business, a pet, or something else.
                </p>
                <div id="dob-select">
                  <div className="dynamic-select">
                    <select id="month-select" name="dob-month" required></select>
                    <label>Month</label>
                  </div>
                  <div className="dynamic-select">
                    <select id="day-select" name="dob-day" required></select>
                    <label>Day</label>
                  </div>
                  <div className="dynamic-select">
                    <select id="year-select" name="dob-year" required></select>
                    <label>Year</label>
                  </div>
                </div>
              </div>
            </div>
          </IndexModal>
        );
      }else if(showModal === showModalType.login){
        modal = (
          <IndexModal handleExitClick={this.handleExitModalClick} type={showModal}>
            <div>Log in to your account</div>
          </IndexModal>
        );
      }
      
      return (
        <React.Fragment>
          {loc}
          {modal}
        </React.Fragment>
      );
    }
  }
}

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(<Index/>);