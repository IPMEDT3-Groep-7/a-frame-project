AFRAME.registerComponent('hourglass', 
{
  init: function () 
    {
        this.el.addEventListener('click', function () 
        {
            triggerTimer(this);
        });
    }
});


var helpText;
var panelText;

var initTime;
var startTime;
var timerPaused;
var lastPauseTime;
var kitchenTimerInterval;
var potatoesTime;

window.addEventListener("load", timerInit)

function timerInit() {

    console.log("hello");

    helpText = document.getElementsByClassName('helpText');
    panelText = document.getElementsByClassName('panelText');

    potatoesTime = 1000 * 60 * 1;
};

function triggerTimer(timerObject) {

    rotateHourglass(timerObject);
    
    if (timerPaused === undefined) {
        timerPaused = true;
        initTime = new Date().getTime();
        lastPauseTime = initTime;
        startTime = initTime;
    }

    timerPaused = !timerPaused;

    if (timerPaused) {
        lastPauseTime = new Date().getTime();
        clearInterval(kitchenTimerInterval);
    } else {
        blinkBurningIcon(0);
        startTime += new Date().getTime() - lastPauseTime;
        kitchenTimerInterval = setInterval(kitchenTimer, 1000);
    }
};

function kitchenTimer() {
        
    currentTime = new Date().getTime();

    secsToFinish = Math.round((startTime - currentTime + potatoesTime) / 1000);

    let secsToFinishAsString = secsToFinish % 60;
    if (secsToFinishAsString < 10) {
        secsToFinishAsString = "0" + secsToFinishAsString;
    }
    let minutesToFinishAsString = Math.floor(secsToFinish / 60);
    if (minutesToFinishAsString < 10) {
        minutesToFinishAsString = "0" + minutesToFinishAsString;
    }
    let newTimeAsString = minutesToFinishAsString + ":" + secsToFinishAsString;

    showProgress(secsToFinish, newTimeAsString);

    if (secsToFinish < 1) {
        alertFoodDone();
    }
};

function alertFoodDone() {

    clearInterval(kitchenTimerInterval);
    blinkTimer(true);
    var audio = new Audio('./assets/sound/alarm.mp3');
    audio.play();
}

function showProgress(secsToFinish, newTimeAsString) {

    let lengthProgressBar = 1 - (secsToFinish / (potatoesTime / 1000));
    let locationProgressBar = 0.1 + 0.8 * lengthProgressBar
    let progressColor = "rgb(" + Math.round(255 * (1 - lengthProgressBar)) + ", " + Math.round(255 * lengthProgressBar) + ", 0)"

    console.log(progressColor);

    panelText[2].setAttribute('line', 'end', locationProgressBar + " -0.1 0.001");
    panelText[2].setAttribute('line', 'color', progressColor);
    panelText[3].setAttribute('text', 'value', 'Potatoes ready in ' + newTimeAsString);
}

function blinkBurningIcon(numBars) {

    numBars = numBars % 4;
    panelText[1].setAttribute('text', 'value', ")".repeat(numBars));

    if (!timerPaused) {
        setTimeout(() => {
            blinkBurningIcon(numBars + 1);
        }, 500);
    }
}

function blinkTimer(blinkOn) {

    if (blinkOn) {
        panelText[3].setAttribute('text', 'value', 'Potatoes ready in 00:00');
    } else {
        panelText[3].setAttribute('text', 'value', 'Potatoes ready in');
    }

    setTimeout(() => {
        blinkTimer(!blinkOn);
    }, 500);
}

function rotateHourglass(hourglass) {

    if (timerPaused === undefined) {
        helpText[0].setAttribute('text', 'value', "Click again\nto pause")
    } else {
        helpText[0].setAttribute('text', 'value', "")
    }

    let rotation = hourglass.getAttribute('rotation').x;

    rotation = (rotation + 180) % 360;

    let newAnimation = "property: rotation; to: " + rotation + " 0 0; loop: false; dur: 500; easing: linear"
    hourglass.setAttribute('animation', newAnimation);
};