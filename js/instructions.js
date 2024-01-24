
var camera;

window.addEventListener("load", main)

function main() {

    camera = document.getElementById("js--camera");

    checkIfMoved(camera.getAttribute('position'));
}

function checkIfMoved(initPosition) {

    var newPos = camera.getAttribute('position');
    let stray = calcStray(initPosition, newPos);

    if (stray > 1.0) {
        deleteInstructions();
        return;
    }

    setTimeout(function() {
        checkIfMoved(structuredClone(initPosition));
    }, 1000);
}

function calcStray(oldPos, newPos) {

    let deltaX = oldPos.x - newPos.x;
    let deltaZ = oldPos.z - newPos.z;

    let stray = Math.sqrt(deltaX ** 2 + deltaZ ** 2);
    return stray;
}

function deleteInstructions() {
    
    let instructions = document.getElementsByClassName("js--movementInstructions");
    instructions[0].remove();
}