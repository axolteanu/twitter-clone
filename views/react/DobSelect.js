import React, { useEffect, useRef } from 'react';
import './DobSelect.css'

export function DobSelect(){
  const dobSelectWrapper = useRef();
  const monthSelect = useRef();
  const daySelect = useRef();
  const yearSelect = useRef();

  useEffect(() => {
    let selectWrappers = dobSelectWrapper.current.getElementsByTagName('div');
    for(let i = 0; i < selectWrappers.length; i++){
      selectWrappers[i].children[0].addEventListener('focusin', e => {
        e.target.style.outline = '2px solid rgb(29,155,240)';
        e.target.parentElement.children[1].style.color = 'rgb(29,155,240)';
      });
      selectWrappers[i].children[0].addEventListener('focusout', e => {
        e.target.style.outline = 'none';
        e.target.parentElement.children[1].style.color = 'rgb(72,72,72)';
      });
    }

    initMonths();
    initDays();
    initYears();
  });

  // Months
  function initMonths(){
    let selectElem = monthSelect.current;
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
    selectElem.addEventListener('change', (e) => {
      keepOrResetDays(e.target.value, yearSelect.current.value);
    });
  }

  // Days
  function initDays(year = -1, month = -1){
    let selectElem = daySelect.current;
    if(year < 0)
      year = (new Date()).getFullYear();
    if(month < 0)
      month = (new Date()).getMonth() + 1;
    let nDays = getNumberOfDays(year, month);
    for(let i = 1; i <= nDays; i++){
      addOption(selectElem, i);
    }
  }

  // Years
  function initYears(){
    let nYears = 120;
    let year = (new Date()).getFullYear();
    let selectElem = yearSelect.current;
    for(let i = 0; i <= nYears; i++, year--)
      addOption(selectElem, year);
    selectElem.addEventListener('change', (e) => {
      keepOrResetDays(monthSelect.current.value, e.target.value);
    });
  }

  function addOption(select, desc, value = desc){
    let optElem = document.createElement('option');
    optElem.innerHTML = desc;
    optElem.value = value;
    select.append(optElem);
  }

  function getNumberOfDays(year, month){
    return (new Date(year, month, 0)).getDate();
  }

  function keepOrResetDays(month, year){
    if(month < 0){
      month = (new Date()).getMonth() + 1;
    }
    if(year < 0){
      year = (new Date()).getFullYear();
    }
    let nDays = getNumberOfDays(year, month);
    let daySelectElem = daySelect.current;
    daySelectElem.innerHTML = '';
    initDays(year, month);

    // TODO: Reinit day-select but keep selection if valid
  }

  return (
    <div ref={dobSelectWrapper} className="dob-select-wrapper">
      <div>
        <select ref={monthSelect} name="dob-month" required></select>
        <label>Month</label>
      </div>
      <div>
        <select ref={daySelect} name="dob-day" required></select>
        <label>Day</label>
      </div>
      <div>
        <select ref={yearSelect} name="dob-year" required></select>
        <label>Year</label>
      </div>
    </div>
  );
}