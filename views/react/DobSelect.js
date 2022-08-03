import React, { useEffect, useRef } from 'react';
import './DobSelect.css'

export function DobSelect(props){
  const monthSelect = useRef();
  const daySelect = useRef();
  const yearSelect = useRef();

  useEffect(() => {
    initMonthSelect();
    initDaySelect(31);
    initYearSelect(120);
  });

  function initMonthSelect(){
    let selectElem = monthSelect.current;
    addOption(selectElem, '', '');
    addOption(selectElem, 'January', 1);
    addOption(selectElem, 'February', 2);
    addOption(selectElem, 'March', 3);
    addOption(selectElem, 'April', 4);
    addOption(selectElem, 'May', 5);
    addOption(selectElem, 'June', 6);
    addOption(selectElem, 'July', 7);
    addOption(selectElem, 'August', 8);
    addOption(selectElem, 'September', 9);
    addOption(selectElem, 'October', 10);
    addOption(selectElem, 'November', 11);
    addOption(selectElem, 'December', 12);
  }

  function initDaySelect(nDays){
    let selectElem = daySelect.current;
    addOption(selectElem, '', '');
    for(let i = 1; i <= nDays; i++){
      addOption(selectElem, i);
    }
  }

  function initYearSelect(nYears){
    let year = (new Date()).getFullYear();
    let selectElem = yearSelect.current;
    addOption(selectElem, '', '');
    for(let i = 0; i <= nYears; i++, year--)
      addOption(selectElem, year);
  }

  function addOption(select, desc, value = desc){
    let optElem = document.createElement('option');
    optElem.innerHTML = desc;
    optElem.value = value;
    select.append(optElem);
  }

  function onChangeMonth(e){
    props.onChange(e);
    updateDays();
  }

  function onChangeYear(e){
    props.onChange(e);
    updateDays();
  }

  function updateDays(){
    let selectedDay = daySelect.current.value;
    let nDaysAvailable = getNumberOfDayInMonth(yearSelect.current.value, monthSelect.current.value)
    daySelect.current.innerHTML = '';
    initDaySelect(nDaysAvailable);
    if(selectedDay != ''){
      if(selectedDay > nDaysAvailable)
        daySelect.current.value = '';
      else
        daySelect.current.value = selectedDay;
    }
  }

  function getNumberOfDayInMonth(year, month){
    if(month === '')
      month = 0;
    if(year === '')
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
  
  return (
    <div className="dob-select-wrapper">
      <div>
        <select 
          ref={monthSelect} 
          name="dobMonth"
          value={props.dobMonth || ""}
          onFocus={onFocusSelect} 
          onBlur={onBlurSelect}
          onChange={onChangeMonth}></select>
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
          ref={yearSelect} 
          name="dobYear" 
          value={props.dobYear || ""}
          onFocus={onFocusSelect} 
          onBlur={onBlurSelect}
          onChange={onChangeYear}></select>
        <label>Year</label>
      </div>
    </div>
  );
}