import React, { useRef, useState } from 'react';
import './WithValidation.css';

export function withValidation(WrappedForm){
  return function FormWithValidation(){

    const formRef = useRef();
    const validateFuncsRef = useRef({});
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    function onChange(e){
      setValues(prevValues => ({
        ...prevValues, 
        [e.target.name]: e.target.value
      }));
    }

    function onSubmit(e){
      e.preventDefault();
      if(validate())
        formRef.current.submit();
      else
        return false;
    }

    function validate(){
      let isValid = true;
      const fieldNames = Object.keys(validateFuncsRef.current);
      fieldNames.forEach(name => {
        const errorMsg = validateFuncsRef.current[name]();
        if(errorMsg)
          isValid = false;
        setErrors(prevErrors => ({
          ...prevErrors, 
          [name]: errorMsg
        }));
      })
      return isValid;
    }
    
    return(
      <WrappedForm 
        formRef={formRef}
        values={values}
        errors={errors}
        validateFuncsRef={validateFuncsRef} 
        onChange={onChange} 
        onSubmit={onSubmit}/>
    );
  }
}