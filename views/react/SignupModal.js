import React from 'react';
import { FormModal } from './FormModal';
import { TextInput } from './TextInput';
import { DobSelect } from './DobSelect';
import './SignupModal.css';

export class SignupModal extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <FormModal action="/signup" submitValue="Sign up" submitId="signup-submit-signup" handleExitClick={this.props.handleExitClick}>
        <div>Create your account</div>
        <TextInput name="name" label="Name" type="text"/>
        <TextInput name="password" label="Password" type="password"/>
        <TextInput name="email" label="Email" type="text"/>
        <div id="signup-dob-section">
          <h5>Date of birth</h5>
          <p>
            This will not be shown publicly. Confirm your own age, even if
            this account is for a business, a pet, or something else.
          </p>
          <DobSelect/>
        </div>
      </FormModal>
    );
  }
}