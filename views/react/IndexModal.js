import React from 'react';
import ReactDOM from 'react-dom';

export class IndexModal extends React.Component{
  constructor(props){
    super(props);
    this.modalRoot = document.createElement('div');
    this.modalRoot.id = 'modal-root';
  }

  componentDidMount(){
    document.body.appendChild(this.modalRoot);
    document.body.style.overflowY = 'hidden';
  }

  componentWillUnmount(){
    document.body.style.overflowY = 'initial';
    document.body.removeChild(this.modalRoot);
  }

  render(){
    let submitId;
    let submitVal;
    if(this.props.type === 'signup'){
      submitId = 'pup-footer-signup'
      submitVal = 'Sign up';
    }else if(this.props.type === 'login'){
      submitId = 'pup-footer-login'
      submitVal = 'Log in';
    }

    const view = (
      <div className="pup">
        <div id="pup-header">
          <svg id="exit-pup-img" width="36" height="36" fill="transparent" onClick={this.props.handleExitClick}>
            <circle cx="18" cy="18" r="17"/>
            <line x1="12" y1="12" x2="24" y2="24" stroke="black" strokeWidth="1.75"/>
            <line x1="24" y1="12" x2="12" y2="24" stroke="black" strokeWidth="1.75"/>
          </svg>
        </div>
        <form id="pup-form" action="/signup" method="post">
          {this.props.children}
        </form>
        <div id="pup-footer">
        <input id={submitId} type="submit" form="pup-form" value={submitVal}/>
        </div>
      </div>
    );
    return ReactDOM.createPortal(
      view,
      this.modalRoot
    );
  }
}