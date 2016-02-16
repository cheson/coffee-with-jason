'use strict';

function findNumDaysInMonth(month, year) {
		switch(month)
		{
			case 0:
			case 2:
			case 4:
			case 6:
			case 7:
			case 9:
			case 11:
				return 31;
			case 3:
			case 5:
			case 8:
			case 10:
				return 30;
			case 1:
				var isLeap = new Date(year,1,29).getDate() === 29;
				if (isLeap) {return 29;}
				else {return 28;}
		}
}

function findNumWeeks(numDaysInMonth, dayOfWeek) {
	var numDaysInFirstWeek = 6 - dayOfWeek + 1;
	return 1 + Math.ceil((numDaysInMonth - numDaysInFirstWeek)/7);
}

function monthToString(monthNumber) {
	var months = [];
	months[0] = "January";
	months[1] = "February";
	months[2] = "March";
	months[3] = "April";
	months[4] = "May";
	months[5] = "June";
	months[6] = "July";
	months[7] = "August";
	months[8] = "September";
	months[9] = "October";
	months[10] = "November";
	months[11] = "December";
	return months[monthNumber];
}

function numDaysInPrevMonth(month, year) {
	return new Date(year, month, 0).getDate();
}

function generateHTMLCalendar(dayOfWeek, numDaysInMonth, numWeeks, month, year) {
	var calendarHTML = "<table><tr style='text-align:center; font-weight: bold;'><td class='prev'>&lt;</td><td colspan='5'>"+monthToString(month)+" "+year+" </td><td class='next'>&gt;</td></tr>";
	calendarHTML += "<tr style='text-align:center; font-weight: bold;'><td>Sun</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Thur</td><td>Fri</td><td>Sat</td></tr>";

	//set first week
	calendarHTML += "<tr style='text-align:center'>";
	var prevMonth = numDaysInPrevMonth(month, year);
	for (var i = dayOfWeek; i > 0; i--) {
		calendarHTML += "<td style='color:lightgrey'>" + (prevMonth-i+1) + "</td>";
	}
	var numDaysInFirstWeek = 6 - dayOfWeek + 1;
	for (i = 1; i <= numDaysInFirstWeek; i++) {
		calendarHTML += "<td class='active'>" + i + "</td>";
	}
	calendarHTML += "</tr>";

	var dayCounter = numDaysInFirstWeek + 1;
	var nextMonthDayCounter = 1;

	//set remaining weeks
	for (i = 0; i < numWeeks-1; i++) {
		calendarHTML += "<tr style='text-align:center'>";
		for (var j = 0; j < 7; j++) {
			if (dayCounter > numDaysInMonth) {
				calendarHTML += "<td style='color:lightgrey'>" + nextMonthDayCounter + "</td>";
				nextMonthDayCounter++;
			} else {
				calendarHTML += "<td class='active'>" + dayCounter + "</td>";
				dayCounter++;
			}
		}
		calendarHTML += "</tr>";
	}
	calendarHTML += "</table>";

	return calendarHTML;
}

function prev() {
	alert("prev!");
}

function next() {
	alert("next!");
}

// function DatePicker(id, fn) {
function DatePicker(id, fn) {

	this.id = id;
	this.callback = fn;

	this.render = function(date) {

		var firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
		var firstDayOfMonth = firstOfMonth.getDay();
		var dayOfMonth = date.getDate(); //1-31
		var dayOfWeek = date.getDay();	//0-6
		var month = date.getMonth();	//0-11
		var year = date.getFullYear();	//####
		var numDaysInMonth = findNumDaysInMonth(month, year);
		var numWeeks = findNumWeeks(numDaysInMonth, firstDayOfMonth);

		var calendarHTML = generateHTMLCalendar(firstDayOfMonth, numDaysInMonth, numWeeks, month, year, fn);
		document.getElementById(id).innerHTML = calendarHTML;

		var container = document.getElementById(id);
		var activeCells = container.getElementsByClassName('active');

		var self = this;
		
		for (var i = 0; i < activeCells.length; i++) {
			activeCells[i].addEventListener("click", function(event) {
				var newDate = new Date(year, month , event.target.innerText);
				self.callback(self.id, newDate);
			});
		}

		var prev = container.getElementsByClassName('prev');
		prev[0].addEventListener("click", function(event) {
				var newDate = new Date(date);
				newDate.setDate(0);
				self.render(newDate);
		});

		var next = container.getElementsByClassName('next');
		next[0].addEventListener("click", function(event) {
				var newDate = new Date(date);
				newDate.setDate(32);
				self.render(newDate);
		});
	};

}
