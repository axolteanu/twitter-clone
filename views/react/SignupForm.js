import React from 'react';
import { ModalForm } from './ModalForm';
import { TextInput } from './TextInput';
import { DobSelect } from './DobSelect';
import './SignupForm.css';

export function SignupForm(props){

  props.validateFuncsRef.current.name = validateName;
  props.validateFuncsRef.current.email = validateEmail;
  props.validateFuncsRef.current.password = validatePassword;
  props.validateFuncsRef.current.dob = validateDob;

  function validateName(){
    let errorMsg = '';
    if(!props.values['name'])
      errorMsg += 'Name field cannot be empty.';
    if(!props.values['name'] > 50)
      errorMsg += '\nName field cannot be longer than 50 characters.';
    return errorMsg;
  }

  function validatePassword(){
    let errorMsg = '';
    if(!props.values['password'])
      errorMsg += 'Password field cannot be empty.';
    if(!props.values['password'] > 50)
      errorMsg += '\nPassword field cannot be longer than 50 characters.';
    return errorMsg;
  }

  function validateEmail(){
    let errorMsg = '';
    if(!props.values['email'])
      errorMsg += 'Email field cannot be empty.';
    if(!props.values['email'] > 50)
      errorMsg += '\nEmail field cannot be longer than 50 characters.';
    return errorMsg;
  }

  function validateDob(){
    let errorMsg = '';
    if(!props.values['dobMonth'])
      errorMsg += "Month field cannot be empty.";
    if(!props.values['dobDay'])
      errorMsg += "\nDay field cannot be empty.";
    if(!props.values['dobYear'])
      errorMsg += "\nYear field cannot be empty.";
    return errorMsg;
  }

  return(
    <ModalForm 
      formRef={props.formRef} 
      formClassName="signup-modal-form"
      action="/signup" 
      title="Create your account" 
      submitValue="Sign up" 
      submitClassName="signup-modal-submit"
      onSubmit={props.onSubmit}>
      <div>
        <TextInput name="name" label="Name" type="text" value={props.values.name} onChange={props.onChange}/>
        <div className='error-output'>{props.errors.name}</div>
      </div>
      <div>
        <TextInput name="password" label="Password" type="password" value={props.values.password} onChange={props.onChange}/>
        <div className='error-output'>{props.errors.password}</div>
      </div>
      <div>
        <TextInput name="email" label="Email" type="text" value={props.values.email} onChange={props.onChange}/>
        <div className='error-output'>{props.errors.email}</div>
      </div>
      <div className="signup-dob-section">
        <h5>Date of birth</h5>
        <p>
          This will not be shown publicly. Confirm your own age, even if
          this account is for a business, a pet, or something else.
        </p>
        <div>
          <DobSelect dobMonth={props.values.dobMonth} dobDay={props.values.dobDay} dobYear={props.values.dobYear} onChange={props.onChange}/>
          <div className='error-output'>{props.errors.dob}</div>
        </div>
      </div>
    </ModalForm>
  );
}