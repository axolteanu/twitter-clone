import React, { useEffect, useRef } from 'react';
import './DobSelect.css'

export function DobSelect(props){
  const daySelect = useRef();

  // Update days if month or year changes
  useEffect(() => {
    let selectedDay = props.dobDay;
    let nDaysAvailable = getNumberOfDaysInMonth(props.dobYear, props.dobMonth);
    updateDayOptions(nDaysAvailable);
    if(selectedDay != ''){
      if(selectedDay > nDaysAvailable){
        daySelect.current.value = '';
        daySelect.current.dispatchEvent(new Event('change', {bubbles:true}));
      }else
        daySelect.current.value = selectedDay;
    }
  }, [props.dobMonth, props.dobYear]);

  function updateDayOptions(nDays){
    daySelect.current.innerHTML = '';
    let selectElem = daySelect.current;
    addOption(selectElem, '', '');
    for(let i = 1; i <= nDays; i++){
      addOption(selectElem, i);
    }
  }

  function addOption(select, desc, value = desc){
    let optElem = document.createElement('option');
    optElem.innerHTML = desc;
    optElem.value = value;
    select.append(optElem);
  }

  function getNumberOfDaysInMonth(year, month){
    if(!month)
      month = 0;
    if(!year)
      year = 0;
    return (new Date(year, month, 0)).getDate();
  }

  function onFocusSelect(e){
    e.target.style.outline = '2px solid rgb(29,155,240)';
    e.target.parentElement.children[1].style.color = 'rgb(29,155,240)';
  }

  function onBlurSelect(e){
    e.target.style.outline = 'none';
    e.target.parentElement.children[1].style.color = 'rgb(72,72,72)';
  }
  
  const monthOptions = (
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

  const year = (new Date()).getFullYear();
  const nYears = 120;
  const yearOptions = [...Array(nYears)].map((e,i) => <option value={year - i}>{year - i}</option>);

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
          onChange={props.onChange}></select>
        <label>Day</label>
      </div>
      <div>
        <select 
          name="dobYear" 
          value={props.dobYear || ""}
          onFocus={onFocusSelect} 
          onBlur={onBlurSelect}
          onChange={props.onChange}>
            <option value=""></option>
            {yearOptions}
        </select>
        <label>Year</label>
      </div>
    </div>
  );
}