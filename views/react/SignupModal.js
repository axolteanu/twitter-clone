import React from 'react';
import { FormModal } from './FormModal';
import { TextInput } from './TextInput';
import { DobSelectInput } from './DobSelectInput';

export class SignupModal extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <FormModal action="/signup" handleExitClick={this.props.handleExitClick}>
        <FormModal.Body>
          <div>Create your account</div>
          <TextInput name="name" label="Name" type="text"/>
          <TextInput name="password" label="Password" type="password"/>
          <TextInput name="email" label="Email" type="text"/>
          <div id="dob-section">
            <h5>Date of birth</h5>
            <p>
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>
            <DobSelectInput/>
          </div>
        </FormModal.Body>
        <FormModal.SubmitInput>
          <input id="pup-submit-signup" type="submit" form="pup-form" value="Sign up"/>
        </FormModal.SubmitInput>
      </FormModal>
    );
  }
}