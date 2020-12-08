const Dialogs = require('dialogs');
const dialogs = Dialogs();

function valueIsNaN(v) { return v !== v; }

function formatTime(string) {
    if (string.length !== 8) throw new Error();
    else {
        array = string.split(":");
        for (let i = 0; i < array.length; i++) {
            if (array[i].charAt(0) === 0) {
                array[i] = array[i].substring(1);
            }
            if (valueIsNaN(parseInt(array[i]))) throw new Error();
            else array[i] = parseInt(array[i]);

            if (array[i] > 59) throw new Error();
        }

        return array;
    }
}

function moveHand (seconds) {
    secondsDegrees = (seconds / 60) * 360;
    document.getElementById('hand').style.transform = `rotate(${secondsDegrees}deg)`;
}

function formatTimeForSpan (timeArray) {
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
    if (array[2] !== 0) {
        array[2]--;
        document.getElementById('numbers').innerHTML = formatTimeForSpan(array);
        moveHand(array[2]);
        setTimeout(() => countDown(array), 1000);
    } else if (array[1] !== 0) {
        array[1]--;
        array[2] = 59;
        document.getElementById('numbers').innerHTML = formatTimeForSpan(array);
        moveHand(array[2]);
        setTimeout(() => countDown(array), 1000);
    } else if (array[0] !== 0) {
        array[0]--;
        array[1] = 59;
        document.getElementById('numbers').innerHTML = formatTimeForSpan(array);
        moveHand(array[2]);
        setTimeout(() => countDown(array), 1000);
    } else {
        notification();
    }
}

function getTime () {
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
    const notif = new Notification('Timer App', {
        body: 'Timer Expired'
    });
}

const reset = () => window.location.reload();