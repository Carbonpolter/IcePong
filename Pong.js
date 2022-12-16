let spieler1 = document.querySelector(".player1");
spieler1.style.top = "400px";

let spieler2 = document.querySelector(".player2");
spieler2.style.top = "400px";

let puck = document.querySelector(".puck");
puck.style.top = "100px";
puck.style.left = "100px";
puck.style.height = "40px";

let field = document.querySelector(".playground");

let viewportHeight = window.innerHeight;
let viewportWidth = window.innerWidth;

let score1 = 0;
let score2 = 0;

let display1 = document.querySelector(".display1");
let display2 = document.querySelector(".display2");

const DIR = {
  right: true,
  down: true,
};
const xc = 7;
const yc = 5;

let x = xc;
let y = yc;

let gameloop = false;

setTimeout(() => {
  function loop() {
    if (gameloop == true) {
      // Speed increase
      x = x + 0.005;
      y = y + 0.0035;

      // Puck direction
      if (DIR.right == true) {
        puck.style.left = parseInt(puck.style.left) + x + "px";
      }

      if (DIR.right == false) {
        puck.style.left = parseInt(puck.style.left) - x + "px";
      }

      if (DIR.down == true) {
        puck.style.top = parseInt(puck.style.top) + y + "px";
      }

      if (DIR.down == false) {
        puck.style.top = parseInt(puck.style.top) - y + "px";
      }

      // Puck boarder detection
      if (
        parseInt(puck.style.top) + parseInt(puck.style.height) >
        parseInt(viewportHeight)
      ) {
        DIR.down = false;
      }

      if (parseInt(puck.style.top) < 0) {
        DIR.down = true;
      }

      // Puck player detection
      let collision1 = getCollisions(spieler1, [puck]);
      for (let collision of collision1) {
        DIR.right = true;
      }

      let collision2 = getCollisions(spieler2, [puck]);
      for (let collision of collision2) {
        DIR.right = false;
      }

      // goal detection
      if (parseInt(puck.style.left) < 0) {
        puck.style.top = "100px";
        puck.style.left = "100px";
        DIR.right = true;
        DIR.down = true;
        x = xc;
        y = yc;
        score2 = score2 + 1;
        display2.textContent = score2;
      }

      if (
        parseInt(puck.style.left) + parseInt(puck.style.height) >
        parseInt(viewportWidth)
      ) {
        puck.style.top = "100px";
        puck.style.left = parseInt(viewportWidth) - 100 + "px";
        DIR.right = false;
        DIR.down = true;
        x = xc;
        y = yc;
        score1 = score1 + 1;
        display1.textContent = score1;
      }

      // Controls
      if (keyboard(87) && parseInt(spieler1.style.top) > 0) {
        spieler1.style.top = parseInt(spieler1.style.top) - 6 + "px";
      }
      if (
        keyboard(83) &&
        parseInt(spieler1.style.top) < parseInt(viewportHeight - 145)
      ) {
        spieler1.style.top = parseInt(spieler1.style.top) + 6 + "px";
      }
      if (keyboard(38) && parseInt(spieler2.style.top) > 0) {
        spieler2.style.top = parseInt(spieler2.style.top) - 6 + "px";
      }
      if (
        keyboard(40) &&
        parseInt(spieler2.style.top) < parseInt(viewportHeight - 145)
      ) {
        spieler2.style.top = parseInt(spieler2.style.top) + 6 + "px";
      }

      // End of game
      setTimeout(() => {
        if (score1 >= 3) {
          alert("Player 1 has won the game! Thank you for playing.");
          gameloop = false;
          score1 = 0;
          score2 = 0;
          display1.textContent = score1;
          display2.textContent = score2;
        }

        if (score2 >= 3) {
          alert("Player 2 has won the game! Thank you for playing.");
          gameloop = false;
          score1 = 0;
          score2 = 0;
          display1.textContent = score1;
          display2.textContent = score2;
        }
      }, "100");
    } else {
      // start/restart of the game
      alert("Press 'Ok' to start/restart the game.");
      alert("Player 1 uses the 'W' and 'S' keys.");
      alert("Player 2 uses the up and down arrow keys.");
      alert("The first player to score 3 goals wins. Let's get going!");
      gameloop = true;
    }

    window.requestAnimationFrame(loop);
  }

  window.requestAnimationFrame(loop);
}, "500");
