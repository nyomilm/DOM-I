const title = document.getElementsByTagName("title")
title[0].textContent = 'Digital Timer'

function Timer(elem) {
    var time = 0;
    var interval;
    var offset;

    function update() {
        if (this.isOn) {
            time += delta();
        }
        var formattedTime = timeFormatter(time);
        console.log(formattedTime);
        elem.textContent = formattedTime;
    }

    function delta() {
        var now = Date.now();
        var timePassed = now - offset;
        offset = now;
        return timePassed;
    }

    function timeFormatter(timeInMilliseconds) {
        var time = new Date(timeInMilliseconds)
        var seconds = time.getSeconds().toString();
        var milliseconds = time.getMilliseconds().toString();

        if (seconds.length < 2) {
            seconds = '0' + seconds
        }
        if (seconds == 10) {
            watch.stop()
            return seconds;
        }
        if (milliseconds.length < 2) {
            milliseconds = '0' + milliseconds
        }
        return seconds + '.' + milliseconds;
    }

    this.isOn = false;

    this.start = function () {
        if (!this.isOn) {
            interval = setInterval(update.bind(this), 10);
            offset = Date.now();
            this.isOn = true;
        }
    };

    this.stop = function () {
        if (this.isOn) {
            clearInterval(interval);
            interval = null;
            this.isOn = false;
        }
    };

    this.reset = function () {
        if (!this.isOn) {
            time = 0;
            update();
        }
    };
}

