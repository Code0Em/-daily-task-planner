// **JAVASCRIPT TASKS**
// TASK 1: Create a function which displays today’s date at the top of the page.

// TASK 2: Create a function which displays the calendar (i.e. blocks for each hour of the working day; each with an input field and save button).

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

    // KEEP ALL OTHER CODE ABOVE THIS (FROM .READY)
})