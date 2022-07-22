import React from 'react';
import { FormModal } from './FormModal';
import './LoginModal.css'

export class LoginModal extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <FormModal action="/login" submitValue="Log in" submitClass="login-modal-submit" handleExitClick={this.props.handleExitClick}>
        <div>Log in to your account</div>
      </FormModal>
    );
  }
}