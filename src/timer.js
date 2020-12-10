// Project dependencies are electron and dialogs

const Dialogs = require('dark-dialogs');
const dialogs = Dialogs();

function valueIsNaN(v) { return v !== v; } // Compares NaN values, because fuck javascript

function formatTime(string) {
    // Parses and lints user time input, looking for missing digits, non-numeric characters, and numbers greater than 59
    if (string.length !== 8) throw new Error(); // missing digit check
    else {
        array = string.split(":");

        for (let i = 0; i < array.length; i++) {
            if (array[i].charAt(0) === 0) {
                array[i] = array[i].substring(1);
            }
            if (valueIsNaN(parseInt(array[i]))) throw new Error(); // non-numeric value check
            else array[i] = parseInt(array[i]);

            if (array[i] > 59) throw new Error(); // Values greater than 59 check
        }

        return array;
    }
}

function moveHand (seconds) {
    // Applies a css transformation to hand DOM element, to create the clock effect
    secondsDegrees = (seconds / 60) * 360;
    document.getElementById('hand').style.transform = `rotate(${secondsDegrees}deg)`;
}

function formatTimeForSpan (timeArray) {
    // Formats the number array that the mathy bit uses to a user-friendly string for the clock interface
    let formattedString = "";

    for (let i = 0; i < timeArray.length; i++) {
        if (timeArray[i].toString().length === 1) {
            let paddedZero = "0" + timeArray[i];
            formattedString += paddedZero;
        } else {
            formattedString += timeArray[i];
        }
        formattedString += ":";
    }

    return formattedString.slice(0, -1);
}

function countDown (array) {
    // Subtracts a second from current time in timer and updates UI to reflect that
    if (array[2] !== 0) {
        array[2]--;
        document.getElementById('numbers').innerHTML = formatTimeForSpan(array);
        moveHand(array[2]);
        setTimeout(() => countDown(array), 1000); // Wooooo scary recursion
    } else if (array[1] !== 0) {
        array[1]--;
        array[2] = 59;
        document.getElementById('numbers').innerHTML = formatTimeForSpan(array);
        moveHand(array[2]);
        setTimeout(() => countDown(array), 1000); // MORE RECURSION!
    } else if (array[0] !== 0) {
        array[0]--;
        array[1] = 59;
        document.getElementById('numbers').innerHTML = formatTimeForSpan(array);
        moveHand(array[2]);
        setTimeout(() => countDown(array), 1000); // OMFG MUCH RECURSION
    } else {
        notification(); // displays desktop alert that the timer has expired, set notification function on line 86
    }
}

function getTime () {
    // Prompts the user to enter a time that then starts the event loop
    dialogs.prompt("Set timer in the format 'hh:mm:ss'", ok => {
        try {
            numberArray = formatTime(ok);
            document.getElementById('numbers').innerHTML = ok;
            setTimeout(() => countDown(numberArray), 1000);
        } catch {
            dialogs.alert("String must be 8 characters long, and all characters should be numbers or colons, and values shouldn't be greater than 59");
        }
    });
}

function notification () {
    // Uses Electron's built-in notification abilities to alert user that time is expired
    const notif = new Notification('Timer App', {
        body: 'Timer Expired'
    });
}

// Wrapper function to reset the clock, but really just reloads the app, clearing event loop
const reset = () => window.location.reload(); 