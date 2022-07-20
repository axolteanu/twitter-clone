import React from 'react';
import ReactDOM from 'react-dom';

const Body = ({ children }) => <React.Fragment>{children}</React.Fragment>;
const SubmitInput = ({ children }) => <React.Fragment>{children}</React.Fragment>;

export class FormModal extends React.Component{
  constructor(props){
    super(props);
    this.modalRoot = document.createElement('div');
    this.modalRoot.id = 'modal-root';
  }

  static Body = Body;
  static SubmitInput = SubmitInput;

  componentDidMount(){
    document.body.appendChild(this.modalRoot);
    document.body.style.overflowY = 'hidden';
  }

  componentWillUnmount(){
    document.body.removeChild(this.modalRoot);
    document.body.style.overflowY = 'initial';
  }

  render(){
    const view = (
      <div className="pup">
        <div id="pup-header">
          <svg id="exit-pup-img" width="36" height="36" fill="transparent" onClick={this.props.handleExitClick}>
            <circle cx="18" cy="18" r="17"/>
            <line x1="12" y1="12" x2="24" y2="24" stroke="black" strokeWidth="1.75"/>
            <line x1="24" y1="12" x2="12" y2="24" stroke="black" strokeWidth="1.75"/>
          </svg>
        </div>
        <form id="pup-form" action={this.props.action} method="post">
          {this.props.children.find(({ type }) => type === Body)}
        </form>
        <div id="pup-footer">
          {this.props.children.find(({ type }) => type === SubmitInput)}
        </div>
      </div>
    );
    return ReactDOM.createPortal(
      view,
      this.modalRoot
    );
  }
}