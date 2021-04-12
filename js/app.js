'use strict';

//Shop Setup
// Within your javascript file (example: app.js), create separate JS object literals for each shop location that outputs the following to the sales.html file:

// Stores the min/max hourly customers, and the average cookies per customer, in object properties
// All stores go 6 am to 8 pm
// Uses a method of that object to generate a random number of customers per hour. Objects/Math/random
// Calculate and store the simulated amounts of cookies purchased for each hour at each location using average cookies purchased and the random number of customers generated
// Store the results for each location in a separate array… perhaps as a property of the object representing that location
// Display the values of each array as unordered lists in the browser
// Calculating the sum of these hourly totals; your output for each location should look like this:

// Seattle

// 6am: 16 cookies
// 7am: 20 cookies
// 8am: 35 cookies
// 9am: 48 cookies
// 10am: 56 cookies
// 11am: 77 cookies
// 12pm: 93 cookies
// 1pm: 144 cookies
// 2pm: 119 cookies
// 3pm: 84 cookies
// 4pm: 61 cookies
// 5pm: 23 cookies
// 6pm: 42 cookies
// 7pm: 57 cookies
// Total: 875 cookies

const shop1 = {
  city: 'Seattle',
  minCust = 23,
  maxCust = 65,
  avgCookie = 6.3,
}

const shop2 = {
  city: 'Tokyo',
  minCust = 3,
  maxCust = 24,
  avgCookie = 1.2,
}

const shop3 = {
  city: 'Dubai',
  minCust = 11,
  maxCust = 38,
  avgCookie = 3.7,
}

const shop4 = {
  city: 'Paris',
  minCust = 20,
  maxCust = 38,
  avgCookie = 2.3,
}

const shop1 = {
  city: 'Lima',
  minCust = 2,
  maxCust = 16,
  avgCookie = 4.6,
}


//Takes in the value of i from the daily traffic function and converts it into a string with the time in hours
function hourString(hour){

  let timeXM = '';
  let result = '';

  if (hour < 7){
    time = i + 6;
  }else{
    time = i - 6;
  }

  if (hour < 6){
    timeXM = 'am';
  }else{
    timeXM = 'pm';
  }

  result = timeNum+timeXM;
  return result;
}

//Takes in min, max, and avg values to compute how many cookies are sold that hour
//uses Math.floor to make sure we don't sell partials cookie bits because that seems wrong
function hourlyCookieCounter(min, max, avg){

  let cookieCount = 0;
  let customerCount = Math.floor(Math.random()*(max - min + 1) + min);
  let cookieCount = Math.floor(customerCount * avg);

  return cookieCount;

}


//Returns an array that should have one item for each hourly sale of cookies and the last one being the total.
//Will need to iterate through the returned array to get the final output we are looking for.
function dailyTraffic(min, max, avg){
  
  let hourlyArray = [];
  let cookieTotal = 0;

  //6am to 7pm, because the shop closes at 8 there is no 8pm sales which means 14 entries
  let operatingHours = 14;

  //Return an array of "6pm: 42 cookies" type entries
  for(let i = 0; i < operatingHours; i++){

    let theTime = hourString(i);
    let currentCookies = hourlyCookieCounter(min, max, avg);
    cookieTotal += currentCookies;

    let thisHour = '$(theTime): $(currentCookies) cookies';
    hourlyArray.push(thisHour);
  }
  
  // add in total as last item
  hourlyArray.push('Total: $(cookieTotal) cookies');

}