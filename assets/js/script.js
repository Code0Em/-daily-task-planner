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
        // Gets today's date, using Dayjs (for use in forLoop below).
        const today = dayjs()

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

        // Sets text of 'hour blocks' (9am to 5pm), and adds id tags to all the 'task fields'.
        for (j = 0; j < 9; j++) {
            // Sets the calendar start time to 9am, using Dayjs' set() method.
            const startTime = today.set('h', 9)
            // Adds the index (j) to the above time (so the hour increases on each iteration), using Dayjs' add() method.
            const nextTime = startTime.add(j, 'h')
            // Sets the text of each 'hour block', by targeting each index (j) on each iteration and setting it the nextTime variable. Formats to 9am, using Dayjs' format() method.
            $(".hour").eq(j).text(nextTime.format("h A"));
            // Adds an id to each 'task field'. Sets it to "hour" plus the number of the hour (e.g. 9am = hour9).
            $(".task").eq(j).attr('id', `hour${nextTime.format("H")}`);

            // TASK 3: Sets colour of 'task fields' to match the current time.
            // Checks if the 'hour block' (i.e. nextTime variable) is before the current time using Dayjs' isBefore method.
            before = nextTime.isBefore(today);
            // Calculates the difference in hours between the 'hour block' and the current time, using Dayjs' diff method.
            nowDiff = nextTime.diff(today, "h");
            // If the 'hour block' is before the current time, runs this codeblock.
            if (before == true) {
                // Adds the class of past (which adds CSS) to the 'task field'.
                $(".task").eq(j).addClass("past");
                // If the difference between the 'hour block' and the current time is zero (i.e. the same hour), runs this codeblock.
            } else if (nowDiff == 0) {
                // Adds the class of present.
                $(".task").eq(j).addClass("present");
                // If the 'hour block' is after the current time, runs this codeblock.
            } else if (before !== true) {
                // Adds the class of future.
                $(".task").eq(j).addClass("future");
            }
        }
        // TASK 5: Calls the function to check for any stored tasks and displays them.
        checkSavedTasks();
    }

    // TASK 5: Checks for any stored tasks in the browser.
    function checkSavedTasks() {
        for (j = 0; j < 9; j++) {
            // Sets the keyName as "hour" plus 9 plus the index (j). So on first iteration this would be "hour9" (i.e. 9+0) (n.b. keypairs are named as "hour9: task", so this would return any '9am task' etc).
            let keyName = "hour" + (9 + j);
            // Sets the id name as above. So on first iteration this would be "#hour9" (i.e. the 'task field' with the id of #hour9 etc).
            let idName = "#hour" + (9 + j);
            // If there's a task with this keyName (i.e. it isn't null), run this codeblock.
            if (localStorage.getItem(`${keyName}`) !== null) {
                // Get the task from the browser.
                const savedTasks = JSON.parse(localStorage.getItem(`${keyName}`));
                // Displays the task in the correct 'task field' (i.e. sets the value of the 'task field' with the matching id tag)
                $(`${idName}`).val(savedTasks);
            }
        }
    }

    // **FUNCTION CALLS AND EVENT LISTENERS**
    // TASK 2: Calls the function to display calendar.
    createCal();

    // TASK 4: Listens for a click event on the save buttons (using event delegation) and calls function.   
    $(".container").on("click", '.saveBtn', function (e) {
        // Prevents the default behaviour (i.e. reloading the page).
        e.preventDefault();
        // Gets the 'task field' adjacent to the button that was clicked (i.e. the sibling element that's before the button).
        const getTask = this.previousSibling;
        // Gets what the user's inputted into the 'task field' (i.e. the value of input element).
        const userTask = getTask.value;
        // Validates the 'task field' by checking it's not empty (i.e. if the length of the value is zero, run this codeblock).
        if (getTask.value.length == 0) {
            // Gets us out of the function (i.e. returns nothing).
            return;
            // If the 'task field' isn't emplty, run this codeblock:
        } else {
            // Save the task to the broswer, setting the key name to match the id of the 'task field' (e.g. for task inputted into 'task field' adjacent to 9am 'hour block', task will be saved with key name "hour9").
            localStorage.setItem(`${getTask.id}`, JSON.stringify(userTask));
        }
    });

    // TASK 6: Listens for a click event on the clear button (by tagetting its index) and calls function.
    $("button").eq(0).on("click", function () {
        // Clears the existing tasks from the browser, using clear method.
        localStorage.clear();
        // No longer displays the stored tasks on the page (i.e. sets the value of all 'task fields' to an empty string).
        $("input").val("");
    });

    // KEEP ALL OTHER CODE ABOVE THIS (FROM .READY)
})