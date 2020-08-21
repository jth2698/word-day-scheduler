// pull current day and time from moment.js

var currentDayDate = moment().format("dddd MMMM Do YYYY");

// display current day and time in currentDay div

var currentDay = $("#currentDay");
currentDay.text(currentDayDate);

// target calendar container

var calContainer = $(".container");

// create workDayHours array to hold all hours in the work day from 9 to 5

var workDayHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"]; //don't forget to take out test hours!

// iterate through wordDayHours and set default elements for each timeBlock / workDayHour

for (i = 0; i < workDayHours.length; i++) {

    // set variables for all elements and apply starter attributes

    var timeBlock = $("<div></div>");
    timeBlock.attr("class", "row time-block");

    // for 9AM, we want data-hour to display 09 but want full numbers (10, 11, etc.) for all remaining hours
    var dataTime = "";
    if (i + 9 < 10) {
        dataTime = "0" + (i + 9);
    } else {
        dataTime = (i + 9).toString();
    }
    // continue with timeBlock element using applicable dataTime for hour attribute
    timeBlock.data("hour", dataTime);
    console.log(timeBlock.data("hour"));

    var hourEl = $("<div></div>");
    hourEl.attr("class", "col col-md-1 hour");
    hourEl.text(workDayHours[i]);

    var descriptionEl = $("<textarea></textarea>");
    descriptionEl.attr("class", "col col-md-10 description");
    // also want to set hour data-attribute to descriptionEl for locakStorage key
    descriptionEl.data("hour", dataTime);

    var saveBtn = $("<button ></button>");
    saveBtn.attr("class", "col col-md-1 saveBtn");

    var saveIcon = $("<i></i>");
    saveIcon.attr("class", "fas fa-save");

    // append saveIcon to saveBtn for each time block
    saveBtn.append(saveIcon);

    // append timeBlock elements to timeBlock for each workDayHours iteration
    timeBlock.append(hourEl, descriptionEl, saveBtn);

    // append each timeBlock to calContainer
    calContainer.append(timeBlock);
}

// pull current time from moment.js

var currentHour = moment().format("HH");

// target all timeBlocks and for each, apply .past, .present, or .future class depending on relative data-hour position to currentHour

var allTimeBlocks = $(".time-block");

allTimeBlocks.each(function() {
    if ($(this).data("hour") < currentHour) {
        $(this).addClass("past");
    } else if ($(this).data("hour") > currentHour) {
        $(this).addClass("future");
    } else {
        $(this).addClass("present");
    }
});

// populate any descriptionEls with data from localStorage

var allDescriptionEls = $(".description");

allDescriptionEls.each(function() {
    var descriptionElValue = $(this).data("hour");
    var description = localStorage.getItem(descriptionElValue);
    $(this).val(description);
})

// target all descriptionEls and save input value to localStorage on saveBtn click to populate under function above

var allSaveBtns = $(".saveBtn");

allSaveBtns.on("click", function(event) {
    event.preventDefault();
    var saveDescriptionEl = $(this).prev();
    var saveDescriptionElVal = saveDescriptionEl.val();
    if (saveDescriptionElVal != null) {
        localStorage.setItem(saveDescriptionEl.data("hour"), saveDescriptionElVal);
    }
});