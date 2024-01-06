// **JAVASCRIPT TASKS**
// TASK 1: Create a function which displays today’s date at the top of the page.

// TASK 2: Create a function which displays the calendar (i.e. blocks for each hour of the working day; each with an input field and save button) (n.b. assumes working day is 9.00-17.00).

// TASK 3: Use if/else statements (within above function) to change the colour of the input field depending on whether it’s in the past, present or future.

// TASK 4: Create a function which stores the user’s task to the browser when they select the save button.

// TASK 5: Create a function which checks for any stored tasks in the browser and (if there are any) displays these in the correct input field (i.e. the field they were originally inputted to).

// TASK 6: Create a function which clears any stored tasks in the browser and (if there are any) removes these from the page when the user selects the clear button.

// **FUNCTIONS**
// Runs all other code as soon as DOM is safe to manipulate.
$(document).ready(function () {

    // TASK 1: Displays today's date in the header element, using setInterval method.
    setInterval(function () {
        // Gets today's date, using Dayjs.
        const today = dayjs();
        // Sets text of p element (with id of currentDay) to today's date, using Dayjs' format method.
        $("#currentDay").text(today.format("dddd DD MMMM YYYY (hh:mm:ss a)"));
        // Calls this function to be run every second.
    }, 1000);

    // TASK 2: Creates the calendar.
    function createCal() {
        // Creates the rows for 9am to 5pm (i.e. nine section elements).
        for (i = 0; i < 9; i++) {
            // Creates one row on each iteration (i.e. creates a section element). Gives it a class of row (which adds CSS) and appends it to the section element (with the class of container).
            $(".container").append("<section class=row>");
        }

        // Creates the 'hour blocks' (i.e. creates article elements). Gives them a class of col-2 (for sizing, using Bootstrap's grid system) and appends each one to the corresponding section element (with a class of row).
        $(".row").append("<article class=col-2>");
        // Adds a class of hour to the above article elements (which adds CSS).
        $(".col-2").addClass("hour");

        // Creates field for user to input their task (i.e. creates input elements). Gives them a class of col-8 (for sizing), type of text and name of task. Appends each one to the corresponding section element (with a class of row).
        $(".row").append("<input class=col-8 type=text name=task>");
        // Adds a class of task to the above input elements (which adds CSS).
        $(".col-8").addClass("task");

        // Creates button for user to save their task (i.e. creates button element). Sets the text as floppy-disk emoji. Gives them a class of col-2 (for sizing) and appends each one to the corresponding section element (with a class of row).
        $(".row").append("<button class=col-2>&#128190;</button>");
        // Filters out the clear button (i.e. only targets buttons with col-2 class).
        const saveBtns = $("button").filter(".col-2");
        // Adds a class of saveBtn to the above button elements (which adds CSS).
        saveBtns.addClass("saveBtn");
    }

    // **FUNCTION CALLS AND EVENT LISTENERS**
    // TASK 2: Calls the function to display calendar.
    createCal();

    // KEEP ALL OTHER CODE ABOVE THIS (FROM .READY)
})