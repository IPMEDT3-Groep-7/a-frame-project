window.onload = () => {
  const camera = document.getElementById('js--camera');
  const placeholders = document.getElementsByClassName('js--placeholder');
  const objectInfo = document.getElementById("js--objectInfo");

  var pickupSound = new Audio("./assets/sound/pickup.mp3");
  var putdownSound = new Audio("./assets/sound/putdown.mp3");

  let scene = document.getElementById('js--scene');
  let hold = null;

  function addListeners() {
    let pickups = document.getElementsByClassName('js--pickup');
    for (let i = 0; i < pickups.length; i++) {
      pickups[i].addEventListener('click', function(evt){
        if (hold == null) {
          let cloneObject = this.cloneNode(true);

          
          console.log(this.classList[1]);
          setObjectInfo(this.classList[1]);

          cloneObject.setAttribute('position', {x: ".5", y:"-0.5", z: "-1.5"});
          cloneObject.setAttribute('id', "js--hold")
          camera.appendChild(cloneObject);
          pickupSound.play();
          hold = "box";
          this.remove();
        }
      });
    }
  }

  function setObjectInfo(info) {

    objectInfo.setAttribute('text', 'value', info);
    animateObjectInfo();
  }

  function animateObjectInfo() {

    objectInfo.removeAttribute('animation__position');
    objectInfo.removeAttribute('animation__fade');

    objectInfo.setAttribute('animation__position', {
      property: 'position',
      from: "0 0.02 -0.5",
      to: "0 0.03 -0.5",
      dur: 1000,
      easing: 'easeOutQuad'
    });

    // optimize deze code twan!

    objectInfo.setAttribute('animation__fade', {
      property: 'text.opacity',
      from: "0",
      to: "1",
      dur: 1000,
      easing: 'easeInQuad',
    });
  
    setTimeout(() => {
      objectInfo.setAttribute('animation__fade', {
        property: 'text.opacity',
        from: "1",
        to: "0",
        dur: 1000,
        easing: 'easeOutQuad',
      });
    }, 1000);
  }

  addListeners();

  for (let i = 0; i < placeholders.length; i++) {
    placeholders[i].addEventListener('click', function(evt){
      if (hold == "box"){
        var originalObject = document.getElementById('js--hold');
        var cloneObject = originalObject.cloneNode(true);
        cloneObject.setAttribute("position", {x: this.getAttribute('position').x, y:"1.14", z: this.getAttribute('position').z});
        cloneObject.setAttribute('id', "free");
        if (placeholders[i].getAttribute('id') == "js--stove1") {
          cloneObject.dataset.stove = "Stove1";
        } else if (placeholders[i].getAttribute('id') == "js--stove2") {
          cloneObject.dataset.stove = "Stove2";
        } else if (placeholders[i].getAttribute('id') == "js--stove3") {
          cloneObject.dataset.stove = "Stove3";
        } else if (placeholders[i].getAttribute('id') == "js--water") {
          cloneObject.dataset.water = "Water";
        }
        console.log(cloneObject.dataset.stove);
        console.log(cloneObject.dataset.water);
        scene.appendChild(cloneObject);
        originalObject.parentNode.removeChild(originalObject);
        addListeners();
        hold = null;
        putdownSound.play();
      }
    });
  }
};
