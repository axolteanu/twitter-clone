import React from 'react';
import './DobSelect.css'

export class DobSelect extends React.Component{
  constructor(props){
    super(props);
    this.dobSelect = React.createRef();
    this.monthSelect = React.createRef();
    this.daySelect = React.createRef();
    this.yearSelect = React.createRef();
  }

  componentDidMount(){
    let selectDivs = this.dobSelect.current.getElementsByTagName('div');
    for(let i = 0; i < selectDivs.length; i++){
      selectDivs[i].children[0].addEventListener('focusin', e => {
        e.target.style.outline = '2px solid rgb(29,155,240)';
        e.target.parentElement.children[1].style.color = 'rgb(29,155,240)';
      });
      selectDivs[i].children[0].addEventListener('focusout', e => {
        e.target.style.outline = 'none';
        e.target.parentElement.children[1].style.color = 'rgb(72,72,72)';
      });
    }

    this.initMonths();
    this.initDays();
    this.initYears();
  }

  // Months
  initMonths(){
    let selectElem = this.monthSelect.current;
    this.addOption(selectElem, 'January', 1);
    this.addOption(selectElem, 'February', 2);
    this.addOption(selectElem, 'March', 3);
    this.addOption(selectElem, 'April', 4);
    this.addOption(selectElem, 'May', 5);
    this.addOption(selectElem, 'June', 6);
    this.addOption(selectElem, 'July', 7);
    this.addOption(selectElem, 'August', 8);
    this.addOption(selectElem, 'September', 9);
    this.addOption(selectElem, 'October', 10);
    this.addOption(selectElem, 'November', 11);
    this.addOption(selectElem, 'December', 12);
    selectElem.addEventListener('change', (e) => {
      this.keepOrResetDays(e.target.value, this.yearSelect.current.value);
    });
  }

  // Days
  initDays(year = -1, month = -1){
    let selectElem = this.daySelect.current;
    if(year < 0)
      year = (new Date()).getFullYear();
    if(month < 0)
      month = (new Date()).getMonth() + 1;
    let nDays = this.getNumberOfDays(year, month);
    for(let i = 1; i <= nDays; i++){
      this.addOption(selectElem, i);
    }
  }

  // Years
  initYears(){
    let nYears = 120;
    let year = (new Date()).getFullYear();
    let selectElem = this.yearSelect.current;
    for(let i = 0; i <= nYears; i++, year--)
      this.addOption(selectElem, year);
    selectElem.addEventListener('change', (e) => {
      this.keepOrResetDays(this.monthSelect.current.value, e.target.value);
    });
  }

  addOption(select, desc, value = desc){
    let optElem = document.createElement('option');
    optElem.innerHTML = desc;
    optElem.value = value;
    select.append(optElem);
  }

  getNumberOfDays(year, month){
    return (new Date(year, month, 0)).getDate();
  }

  keepOrResetDays(month, year){
    if(month < 0){
      month = (new Date()).getMonth() + 1;
    }
    if(year < 0){
      year = (new Date()).getFullYear();
    }
    let nDays = this.getNumberOfDays(year, month);
    let daySelectElem = this.daySelect.current;
    daySelectElem.innerHTML = '';
    this.initDays(year, month);

    // TODO: Reinit day-select but keep selection if valid
  }

  render(){
    return (
      <div ref={this.dobSelect} className="dob-select">
        <div>
          <select ref={this.monthSelect} name="dob-month" required></select>
          <label>Month</label>
        </div>
        <div>
          <select ref={this.daySelect} name="dob-day" required></select>
          <label>Day</label>
        </div>
        <div>
          <select ref={this.yearSelect} name="dob-year" required></select>
          <label>Year</label>
        </div>
      </div>
    );
  }
}