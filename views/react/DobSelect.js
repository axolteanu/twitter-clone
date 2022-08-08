import React, { useEffect, useMemo, useRef, useState } from 'react';
import './DobSelect.css'

export function DobSelect(props){
  const daySelect = useRef();
  const [nDays, setNDays] = useState(31);
  const nYears = 120;

  function getNumberOfDaysInMonth(year, month){
    if(!month)
      month = 0;
    if(!year)
      year = 0;
    return (new Date(year, month, 0)).getDate();
  }

  useEffect(() => {
    if(props.dobDay){
      let nDaysAvailable = getNumberOfDaysInMonth(props.dobYear, props.dobMonth);
      if(nDays != nDaysAvailable)
        setNDays(nDaysAvailable);
    }
  }, [props.dobMonth, props.dobYear]);

  useEffect(() => {
    if(props.dobDay > nDays){
      daySelect.current.value = '';
      daySelect.current.dispatchEvent(new Event('change', {bubbles:true}));
    }
  }, [nDays]);
  
  const monthOptions = useMemo(() => {
    return (
      <React.Fragment>
        <option value=""></option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </React.Fragment>
    );
  }, []);

  const dayOptions = useMemo(() => {
    let day = 1;
    return [<option key="0" value=""/>, ...[...Array(nDays)].map(() => {
      let option = <option key={day} value={day}>{day}</option>;
      day++;
      return option;
    })];
  }, [nDays]);

  const yearOptions = useMemo(() => {
    let year = (new Date()).getFullYear();
    return [<option key="0" value=""/>, ...[...Array(nYears)].map(() => {
      let option = <option key={year} value={year}>{year}</option>;
      year--;
      return option;
    })];
  }, []);

  function onFocusSelect(e){
    e.target.style.outline = '2px solid rgb(29,155,240)';
    e.target.parentElement.children[1].style.color = 'rgb(29,155,240)';
  }

  function onBlurSelect(e){
    e.target.style.outline = 'none';
    e.target.parentElement.children[1].style.color = 'rgb(72,72,72)';
  }

  return (
    <div className="dob-select-wrapper">
      <div>
        <select 
          name="dobMonth"
          value={props.dobMonth || ""}
          onFocus={onFocusSelect} 
          onBlur={onBlurSelect}
          onChange={props.onChange}>{monthOptions}</select>
        <label>Month</label>
      </div>
      <div>
        <select 
          ref={daySelect} 
          name="dobDay" 
          value={props.dobDay || ""}
          onFocus={onFocusSelect} 
          onBlur={onBlurSelect}
          onChange={props.onChange}>{dayOptions}</select>
        <label>Day</label>
      </div>
      <div>
        <select 
          name="dobYear" 
          value={props.dobYear || ""}
          onFocus={onFocusSelect} 
          onBlur={onBlurSelect}
          onChange={props.onChange}>{yearOptions}</select>
        <label>Year</label>
      </div>
    </div>
  );
}