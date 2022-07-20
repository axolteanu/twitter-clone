import React from 'react';
import { FormModal } from './FormModal';

export class LoginModal extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <FormModal action="/login" handleExitClick={this.props.handleExitClick}>
        <FormModal.Body>
          <div>Log in to your account</div>
        </FormModal.Body>
        <FormModal.SubmitInput>
          <input id="pup-submit-login" type="submit" form="pup-form" value="Log in"/>
        </FormModal.SubmitInput>
      </FormModal>
    );
  }
}