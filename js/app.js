'use strict';

//========================Global Variables==============================
//Operating Hours Array
let hoursArray = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

//Setup of the known cities
let seattle = new Shop('Seattle', 23, 65, 6.3);
let tokyo = new Shop('Tokyo', 3, 24, 1.2);
let dubai = new Shop('Dubai', 11, 38, 3.7);
let paris = new Shop('Paris', 20, 38, 2.3);
let lima = new Shop('Lima', 2, 16, 4.6);

//Set up array to help with totals calculation in tablesLastRow and table building
let cityArray = [seattle, tokyo, dubai, paris, lima];

//Event Handler
const formElem = document.getElementById('newCityForm');
formElem.addEventListener('submit', handleSubmit);

//Setting up the information required for the various render functions
//Add things to tableElem, which is attached to "theSales" id
const tableHere = document.getElementById('theSales');
const tableStart = document.createElement('table');
tableHere.appendChild(tableStart);

//========================Constructor and Methods==============================
//City Constructor
function Shop (name, minCust, maxCust, avgCookie) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookie = avgCookie;
}

//Takes in shop object to compute how many cookies are sold that hour
//uses Math.floor to make sure we don't sell partials cookie bits because that seems wrong
Shop.prototype.hourlyCookieCounter = function(){

  let customerCount = Math.floor(Math.random()*(this.maxCust - this.minCust + 1) + this.minCust);
  let cookieCount = Math.floor(customerCount * this.avgCookie);

  return cookieCount;
}

//Gives the shop an array that is random values within given range defined by shop attributes
Shop.prototype.dailyTraffic = function(){
  
  let hourlyArray = [];
  let cookieTotal = 0;

  //Return an array just cookie numbers
  for(let i = 0; i < hoursArray.length; i++){
    let currentCookies = this.hourlyCookieCounter();
    hourlyArray.push(currentCookies);
    cookieTotal += currentCookies;
  }
  
  // add in total as last item
  hourlyArray.push(cookieTotal);
  this.hourlyArray = hourlyArray;
}

//render function to add in a shop's info and create sales array in the shops
Shop.prototype.render = function(){

  //Create the hourly sales array
  this.dailyTraffic();

  //Set up the table row
  const tableRow = document.createElement('tr');
  tableStart.appendChild(tableRow);

  //Add column to that which is the city name
  const shopName = document.createElement('td');
  shopName.textContent = this.name;
  tableRow.appendChild(shopName);

  //add columns to that for every item in the shop's hourlyArray
  for (let i = 0; i < this.hourlyArray.length; i++){
    const theHourSales = document.createElement('td');
    theHourSales.textContent = this.hourlyArray[i];
    tableRow.appendChild(theHourSales);
  }
}

//========================Functions==============================
//So this function is a little large
function handleSubmit(event) {
  //Telling the form not to add the info to our url which is default behavior for some reason
  event.preventDefault();

  //example of how to target the info coming in, this is just proof of life check
  console.log(event.target.maxCustIn.value);

  //cityName, minCustIn, maxCustIn, avgCustIn
  //Store those values locally in this function to push it to the constructor
  let name = event.target.cityName.value;
  let minCust = event.target.minCustIn.value;
  let maxCust = event.target.maxCustIn.value;
  let avgCustBuy = event.target.avgCustBuyIn.value;

  //Call the constructor
  let newCity = new Shop(name, minCust, maxCust, avgCustBuy);

  //Put the new object in the city array
  cityArray.push(newCity);

  //Wipe out the table
  tableWipe();

  //Rebuild it
  createTable();

  //Clear out the form
  event.target.reset();
}

//Function to setup top row, with a blank space, a space for each hour, then a space for daily location total
function tableFirstRow(){

  //Setup Table Header
  const tableHeader = document.createElement('thead');
  tableStart.appendChild(tableHeader);

  //Set up the table row
  const tableRow = document.createElement('tr');
  tableHeader.appendChild(tableRow);

  //One blank space
  const blank1 = document.createElement('th');
  blank1.textContent = '';
  tableRow.appendChild(blank1);

  //Add an element for each hour of operation
  for(let i = 0; i < hoursArray.length; i++){
    const tableHeaderElem = document.createElement('th');
    tableHeaderElem.textContent = hoursArray[i];
    tableRow.appendChild(tableHeaderElem);
  }

  //Add element for Daily Location Total
  const headerEnd = document.createElement('th');
  headerEnd.textContent = 'Daily Location Total';
  tableRow.appendChild(headerEnd);

}

//function to sum together hourly totals and setup bottom row 
function tableLastRow(){

  //Setup Table Footer
  const tableFooter = document.createElement('tfoot');
  tableStart.appendChild(tableFooter);

  //Set up the table row
  const tableRow = document.createElement('tr');
  tableFooter.appendChild(tableRow);

  //One blank space
  const totals = document.createElement('td');
  totals.textContent = 'Totals';
  tableRow.appendChild(totals);

  //Add an element for each hour of operation, hoursArray.length + 1 because we need to also get the daily total which is an extra space and I don't want to try and pull the hourlyArray which has the total at the end because hoursArray is global and the others are scoped only in the shop objects
  for(let i = 0; i < hoursArray.length + 1; i++){

    let sum = 0;
    const tableFooterInfo = document.createElement('td');

    for (let j =0; j < cityArray.length; j++){
      //console.log(cityArray[j].hourlyArray[i]);
      sum += cityArray[j].hourlyArray[i];
    }

    tableFooterInfo.textContent = sum;
    tableRow.appendChild(tableFooterInfo);

  }

}

//Just runs the above functions, this time though looping through city array for non header/footer elements
function createTable(){

  tableFirstRow();

  for (let i = 0; i < cityArray.length; i++){
    cityArray[i].render();
  }

  tableLastRow();
}

//Used a stackoverflow question as a guide here
function tableWipe() {
  while (tableStart.firstChild) {
      tableStart.removeChild(tableStart.firstChild);
  }
}


//========================Calling the Functions==============================

//Add a loop here to render each item in the city array
createTable();