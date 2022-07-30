import React, { useRef } from 'react';
import { FormModal } from './FormModal';
import { TextInput } from './TextInput';
import { DobSelect } from './DobSelect';
import './SignupModal.css';
import { ValidatableField } from './ValidatableField';

export function SignupModal(){

  const nameInputRef = useRef();
  const pwInputRef = useRef();
  const emailInputRef = useRef();
  const selectedMonthRef = useRef();
  const selectedDayRef = useRef();
  const selectedYearRef = useRef();

  const nameValidations = [
    () => {
      if(!nameInputRef.current.value)
        return 'Name field cannot be empty.';
    }, 
    () => {
      if(nameInputRef.current.value.length > 50)
        return 'Name field cannot be longer than 50 characters.';
    }
  ]

  const pwValidations = [
    () => {
      if(!pwInputRef.current.value)
        return 'Password field cannot be empty.';
    }, 
    () => {
      if(pwInputRef.current.value.length > 50)
        return 'Password field cannot be longer than 50 characters.';
    }
  ]

  const emailValidations = [
    () => {
      if(!emailInputRef.current.value)
        return 'Email field cannot be empty.';
    }, 
    () => {
      if(emailInputRef.current.value.length > 50)
        return 'Email field cannot be longer than 50 characters.';
    }
  ]

  const dobValidations = [
    () => {
      if(!selectedMonthRef.current.value)
        return 'Month field cannot be empty.';
    },
    () => {
      if(!selectedDayRef.current.value)
        return 'Day field cannot be empty.';
    },
    () => {
      if(!selectedYearRef.current.value)
        return 'Year field cannot be empty.';
    }
  ]

  return(
    <FormModal action="/signup" submitValue="Sign up" formClass="signup-modal-form" submitClass="signup-modal-submit">
      <div className="form-title">Create your account</div>
      <ValidatableField validations={nameValidations}>
        <TextInput inputRef={nameInputRef} name="name" label="Name" type="text"/>
      </ValidatableField>
      <ValidatableField validations={pwValidations}>
        <TextInput inputRef={pwInputRef} name="password" label="Password" type="password"/>
      </ValidatableField>
      <ValidatableField validations={emailValidations}>
        <TextInput inputRef={emailInputRef} name="email" label="Email" type="text"/>
      </ValidatableField>
      <div className="signup-dob-section">
        <h5>Date of birth</h5>
        <p>
          This will not be shown publicly. Confirm your own age, even if
          this account is for a business, a pet, or something else.
        </p>
        <ValidatableField validations={dobValidations}>
          <DobSelect selectedMonthRef={selectedMonthRef} selectedDayRef={selectedDayRef} selectedYearRef={selectedYearRef}/>
        </ValidatableField>
      </div>
    </FormModal>
  );
}