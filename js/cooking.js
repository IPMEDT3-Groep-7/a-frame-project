// window.onload = () => {
//   const pickups = document.getElementsByClassName("js--pickup");
//   const heat = document.getElementsByClassName("js--heat");
//   const stoves = document.getElementsByClassName("js--stove")

//   for (let i = 0; i < heat.length; i++) {
//     for (let j = 0; j < pickups.length; j++) {
//       heat[i].addEventListener('click', function(evt) {
//         if (pickups[j].dataset.stove == "Stove1" && heat[i].getAttribute('id') == "js--stove1") {
//           pickups[j].dataset.heat = "Heat1";
//         }
//         console.log(pickups[j].dataset.heat);
//       });
//     }
//   }
// }