let dynamicSelects = document.getElementsByClassName('dynamic-select');
for(let i = 0; i < dynamicSelects.length; i++){
  dynamicSelects[i].children[0].addEventListener('focusin', (e) => {
    e.target.style.outline = '2px solid rgb(29,155,240)';
    e.target.parentElement.children[1].style.color = 'rgb(29,155,240)';
  });
  dynamicSelects[i].children[0].addEventListener('focusout', (e) => {
    e.target.style.outline = 'none';
    e.target.parentElement.children[1].style.color = 'rgb(72,72,72)';
  });
}

initMonths();
initDays();
initYears();

// Months
function initMonths(){
  let selectElem = document.getElementById('month-select');
  //addOption(selectElem, '', -1)
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
    keepOrResetDays(e.target.value, document.getElementById('year-select').value);
  });
}

// Days
function initDays(year = -1, month = -1){
  let selectElem = document.getElementById('day-select');
  if(year < 0){
    year = (new Date()).getFullYear();
  }
  if(month < 0){
    month = (new Date()).getMonth() + 1;
  }
  let nDays = getNumberOfDays(year, month);
  //addOption(selectElem, '', -1);
  for(let i = 1; i <= nDays; i++){
    addOption(selectElem, i);
  }
}

// Years
function initYears(){
  let nYears = 120;
  let year = (new Date()).getFullYear();
  let selectElem = document.getElementById('year-select');
  //addOption(selectElem, '', -1);
  for(let i = 0; i <= nYears; i++, year--){
    addOption(selectElem, year);
  }
  selectElem.addEventListener('change', (e) => {
    keepOrResetDays(document.getElementById('month-select').value, e.target.value);
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
  console.log(`${month}, ${year}`);
  if(month < 0){
    month = (new Date()).getMonth() + 1;
  }
  if(year < 0){
    year = (new Date()).getFullYear();
  }
  console.log(`${month}, ${year}`);
  let nDays = getNumberOfDays(year, month);
  console.log(`nDays, ${nDays}`);
  let daySelectElem = document.getElementById('day-select');
  daySelectElem.innerHTML = '';
  initDays(year, month);

  // TODO: Reinit day-select but keep selection if valid
}
/*document.getElementById('link').addEventListener('click', function(event) {
  event.preventDefault(); 
  window.history.pushState({},"", event.target.href);
});*/