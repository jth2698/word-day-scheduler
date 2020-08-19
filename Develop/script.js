// target calendar container

var calContainer = $(".container");

// first create time blocks for each hour in the work day from 9 to 5

var workDayHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

for (i = 0; i < workDayHours.length; i++) {
    // set variables for all elements and apply starter attributes
    var timeBlock = $("<div></div>");
    timeBlock.attr("class", "row time-block");
    timeBlock.attr("past-hour", "false");
    timeBlock.attr("current-hour", "false");
    timeBlock.attr("future-hour", "false");
    var hourEl = $("<div></div>");
    hourEl.attr("class", "col col-md-1 hour");
    hourEl.text(workDayHours[i]);
    var descriptionEl = $("<textarea></textarea>");
    descriptionEl.attr("class", "col col-md-10 description");
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

console.log(document.body);