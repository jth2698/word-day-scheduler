// pull current day and time from moment.js

var currentDayDate = moment().format("dddd MMMM Do YYYY");

// display current day and time in currentDay div

var currentDay = $("#currentDay");
currentDay.text(currentDayDate);

// target calendar container

var calContainer = $(".container");

// create workDayHours array to hold all hours in the work day from 9 to 5

var workDayHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

// iterate through wordDayHours and set default elements for each timeBlock / workDayHour

for (i = 0; i < workDayHours.length; i++) {

    // set html and class for timeBlocks
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

    // set html and text for hourEls (using array text)
    var hourEl = $("<div></div>");
    hourEl.attr("class", "col col-md-1 hour");
    hourEl.text(workDayHours[i]);

    // set <textareas> within each descriptionEL (immediately adjacent to hourEl)
    var descriptionEl = $("<textarea></textarea>");
    descriptionEl.attr("class", "col col-md-10 description");

    // also want to set hour data-attribute to descriptionEl for localStorage key
    descriptionEl.data("hour", dataTime);

    // create save buttons to be adjacent to each descriptionEl
    var saveBtn = $("<button ></button>");
    saveBtn.attr("class", "col col-md-1 saveBtn");

    // icon from font awesome will go within each saveBtn
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
    };
    if ($(this).data("hour") == currentHour) {
        $(this).addClass("present");
    };
    if ($(this).data("hour") > currentHour) {
        $(this).addClass("future");
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

// done!