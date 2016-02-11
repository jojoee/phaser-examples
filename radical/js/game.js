// the game itself
var game;
// the ship we are controlling
var ship;
// the group with all barriers, which will be used for collision detection
var barrierGroup;
// ship horizontal speed, can be modified to change gameplay
var shipHorizontalSpeed = 400;
// barrier vertical speed, can be modified to change gameplay
var barrierSpeed = 150;
// delay from one barrier and another. This isn't meant to be a time measurement but a pixel measurement.
// that is, a new barrier will be created once the old barrier travelled for 150 pixels
var barrierDelay = 150;
// this is a speed multiplier, useful to make the ship move to the left or to the right. Will assume -1 or +1 values
var speedMult;
// function to be executed once the window finishes to load
window.onload = function() {
  // creation of a 320x480 game
  game = new Phaser.Game(320, 480, Phaser.AUTO, "");
  // creation of a state called PlayGame, which is the only state
  game.state.add("PlayGame", playGame);
  // starting playGame state
  game.state.start("PlayGame");
}
var playGame = function(game) {};
playGame.prototype = {
  // preloading images
  preload: function() {
    // image ship
    game.load.image("ship", "assets/ship.png");
    // horizontal barrier
    game.load.image("barrier", "assets/barrier.png");
    // vertical wall
    game.load.image("verticalbarrier", "assets/verticalbarrier.png");
  },
  // creation of the game
  create: function() {
    // first we create the group which will contain all obstacles and we add it to the game
    barrierGroup = game.add.group();
    // starting the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // adding the ship sprite, horizontally centered near the bottom of the canvas
    ship = game.add.sprite(game.width / 2, game.height - 40, "ship");
    // setting the anchor point in the middle of the ship
    ship.anchor.set(0.5);
    // enabling the ship to be part of the physics simulation
    game.physics.enable(ship, Phaser.Physics.ARCADE);
    // don't let the ship rotate
    ship.body.allowRotation = false;
    // when a click/touch is detected, call moveShip function
    game.input.onDown.add(moveShip);
    // when a click touch is released, call stopShip function
    game.input.onUp.add(stopShip);
    // this function will place barriers and is the core of the game
    placeBarriers();
  },
  update: function() {
    // this will make the ship leave the stage to the left and enter from the right
    if (ship.x < 0) {
      ship.x = game.width;
    }
    // this will make the ship leave the stage to the right and enter from the left
    if (ship.x > game.width) {
      ship.x = 0;
    }
    // checking for collision between the ship and the barrier group
    game.physics.arcade.collide(ship, barrierGroup, function() {
      // if there's a collision, restart the game
      game.state.start("PlayGame");
    });
  }
}
// function to move the ship
function moveShip(e) {
  // checking if we touched/clicked on the left half of the canvas or on the right half
  if (e.position.x < game.width / 2) {
    // left, 
    speedMult = -1;
  } else {
    // right
    speedMult = 1;
  }
  // setting ship body horizontal velocity according to shipHorizontalSpeed and speedMult.
  // the ship will move to the left or to the right 
  ship.body.velocity.x = shipHorizontalSpeed * speedMult;
}
// function to stop the ship
function stopShip() {
  // setting ship body horizontal velocity to zero. The ship will stop
  ship.body.velocity.x = 0;
}
// placeBarriers function will create the whole maze
function placeBarriers() {
  // ther's a 1/10 probability we WON'T place vertical barriers, allowing ths ship to wrap around the canvas
  if (game.rnd.between(0, 9) > 0) {
    placeVertical = true;
  } else {
    placeVertical = false;
  }
  // posiiton of the hole in the horizontal barrier.
  // it's not an actual hole, just a space between two horizontal barriers
  var position = game.rnd.between(0, 4);
  // creation of a new barrier. Arguments: the barrier itself, the position of the hole, the horizontal registration point (1 = rightmost pixel)
  // and a flag to know if we have to create vertical barriers. This is the LEFT barrier
  var barrier = new Barrier(game, position, 1, placeVertical);
  // adding the newly created barrier to the game              
  game.add.existing(barrier);
  // adding the newly created barrier to barrierGroup
  barrierGroup.add(barrier);
  // and this is the RIGHT barrier, with registration point to zero (leftmost pixel)
  barrier = new Barrier(game, position + 1, 0, placeVertical);
  // adding the newly created barrier to the game                    
  game.add.existing(barrier);
  // adding the newly created barrier to barrierGroup
  barrierGroup.add(barrier);
}
// this is the horizontal barrier class
Barrier = function(game, position, anchor, placeVertical) {
  // first we place the sprite. Look at the arguments with x and y positions:
  // x = position * ((game.width - 40 [twice the width of vertical barriers]) / 5 [number of possible holes]) + 20 [width of vertical barrier]
  // y = outside the top of the canvas, -barrierDelay - 40 [twice the width of vertical barriers]
  Phaser.Sprite.call(this, game, position * ((game.width - 40) / 5) + 20, -barrierDelay - 40, "barrier");
  // enabling physics on the barrier
  game.physics.enable(this, Phaser.Physics.ARCADE);
  // setting the anchor point
  this.anchor.set(anchor, 0);
  // here we just set createNew flag to true to left barriers.
  // a barrier with createNew flag will create new horizontal barriers.
  if (anchor == 1) {
    this.createNew = true;
  } else {
    this.createNew = false;
  }
  // together with horizontal bar, we add a vertical bar, if placeVertical is true
  // then we add it to the game and to barrierGroup
  if (placeVertical) {
    var vertical = new Vertical(game, anchor);
    game.add.existing(vertical);
    barrierGroup.add(vertical);
  }
  // setting barrier vertical speed
  this.body.velocity.y = barrierSpeed;
};
Barrier.prototype = Object.create(Phaser.Sprite.prototype);
Barrier.prototype.constructor = Barrier;
// things to do at each frame
Barrier.prototype.update = function() {
  // if the barrier leaves the stage to the bottom...
  if (this.y > game.height) {
    // ... then destroy it
    this.destroy();
  }
  // if the barrier is about to enter the stage and has createNew flag...
  if (this.createNew && this.y >= -40) {
    // remove the flag
    this.createNew = false;
    // place new barriers
    placeBarriers();
  }
};
// this is the vertical barrier class
// side can be 0 (left) or 1 (right)
Vertical = function(game, side) {
  // adding vertical barrier sprite. The coordinates follow the same concept of the barrier
  Phaser.Sprite.call(this, game, game.width * side, -barrierDelay - 40, "verticalbarrier");
  // enabling physics on the barrier
  game.physics.enable(this, Phaser.Physics.ARCADE);
  // setting the anchor point
  this.anchor.set(side, 0);
  // barrierDelay + 20 [horizontal barrier height]
  this.height = barrierDelay + 20;
  // setting barrier vertical speed   
  this.body.velocity.y = barrierSpeed;
};
Vertical.prototype = Object.create(Phaser.Sprite.prototype);
Vertical.prototype.constructor = Barrier;
Vertical.prototype.update = function() {
  // if the barrier leaves the stage to the bottom...
  if (this.y > game.height) {
    // ... then destroy it
    this.destroy();
  }
};