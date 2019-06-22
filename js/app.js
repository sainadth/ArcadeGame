// Enemies our player must avoid
var Enemy = function(y, speed) {
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.x = 0;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
};

var Player = function(x, y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
};

Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  var v = (Math.random() * 4) + 1;
  this.x += v * dt * this.speed;
  if (this.x > 540) {
    this.x = 0;
  }
  // checks the collision occurance with the enemy bug
  if (player.x < this.x + 80 && player.x + 50 > this.x &&
    player.y < this.y + 30 && player.y + 50 > this.y) {
    setTimeout(collided, 10);
  }
};
var count = 0;

function collided() {
  count++;

  document.querySelector(".lives").innerHTML = 3 - count;

  if (count < 3) {
    player.x = 200;
    player.y = 400;
  } else {
    gameOver();
  }
}

/*
 *gameOver function results in a popup menu when the collision occurs between player and
 *the bug a swal function is used to create a popup menu
 *a button lay again is provided to reload the
 */
function gameOver() {
  swal({
      title: "Oops try again",
      type: "error",
      confirmButtonText: "Play Again"
    },
    function reload() {
      window.location.reload();
    })
}
Player.prototype.update = function() {

  if (this.y < 72) {
    gameWin();
  }
};

function gameWin() {
  swal({
      title: "Congratulations you win the game",
      type: "success",
      confirmButtonText: "Play Again"
    },
    function reload() {
      window.location.reload();
    })
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(200, 400);

var bug = [72, 154, 234];

var i = 0;
var key;

while (i <= bug.length) {
  var enem = new Enemy(bug[i - 1], 40 * i);
  i++;

  allEnemies.push(enem);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});


Player.prototype.handleInput = function(key) {
  if (key == 'left') {
    if (this.x - 100 > -1) {
      this.x -= 100;
    }
  }
  if (key == 'right') {
    if (this.x + 100 < 401) {
      this.x += 100;
    }
  }
  if (key == 'up') {
    if (this.y - 82 > -11) {
      this.y -= 82;
    }
  }
  if (key == 'down') {
    if (this.y + 82 < 401) {
      this.y += 82;
    }
  }
  player.update();
}
