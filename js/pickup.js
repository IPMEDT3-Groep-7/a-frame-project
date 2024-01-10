window.onload = () => {
  const camera = document.getElementById('js--camera');
  const placeholders = document.getElementsByClassName('js--placeholder');

  let scene = document.getElementById('js--scene');
  let hold = null;

  function addListeners() {
    let pickups = document.getElementsByClassName('js--pickup');
    for (let i = 0; i < pickups.length; i++) {
      pickups[i].addEventListener('click', function(evt){
        if (hold == null) {
          let cloneObject = this.cloneNode(true);
          cloneObject.setAttribute('position', {x: "1", y:"-0.5", z: "-1"});
          cloneObject.setAttribute('id', "js--hold");
          camera.appendChild(cloneObject);
          hold = "box";
          this.remove();
        }
      });
    }
  }

  addListeners();

  for (let i = 0; i < placeholders.length; i++) {
    placeholders[i].addEventListener('click', function(evt){
      if (hold == "box"){
        var originalObject = document.getElementById('js--hold');
        var cloneObject = originalObject.cloneNode(true);
        cloneObject.setAttribute("position", {x: this.getAttribute('position').x, y:"1.1", z: this.getAttribute('position').z});
        cloneObject.setAttribute('id', "free");
        scene.appendChild(cloneObject);
        originalObject.parentNode.removeChild(originalObject);
        addListeners();
        hold = null;
      }
    });
  }
};
