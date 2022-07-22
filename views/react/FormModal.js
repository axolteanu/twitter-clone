import React from 'react';
import ReactDOM from 'react-dom';
import './FormModal.css';

export class FormModal extends React.Component{
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
    document.body.removeChild(this.modalRoot);
    document.body.style.overflowY = 'initial';
  }

  render(){
    const view = (
      <div className="modal">
        <div id="modal-header">
          <svg id="modal-exit-img" width="36" height="36" fill="transparent" onClick={this.props.handleExitClick}>
            <circle cx="18" cy="18" r="17"/>
            <line x1="12" y1="12" x2="24" y2="24" stroke="black" strokeWidth="1.75"/>
            <line x1="24" y1="12" x2="12" y2="24" stroke="black" strokeWidth="1.75"/>
          </svg>
        </div>
        <form id="modal-form" action={this.props.action} method="post">
          {this.props.children}
        </form>
        <div id="modal-footer">
        <input id={this.props.submitId} className={`modal-submit ${this.props.submitClass}`} type="submit" form="modal-form" value={this.props.submitValue}/>
        </div>
      </div>
    );
    return ReactDOM.createPortal(
      view,
      this.modalRoot
    );
  }
}