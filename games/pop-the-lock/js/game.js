// the game itself
var game;
// a selection of colors to be randomly picked and set as background color
var bgColors = [0x62bd18, 0xff5300, 0xd21034, 0xff475c, 0x8f16b2, 0x588c7e, 0x8c4646];
// lock rotatiokn speed
var rotationSpeed = 3;
// maximum angle difference allowed between the ball and the ball
var maxAngleDifference = 10;

window.onload = function () {
  // creation of the game
  game = new Phaser.Game(640, 960, Phaser.AUTO, "");
  // creation of the main (and only) game state
  game.state.add("PlayGame", playGame);
  // starting "PlayGame" game state
  game.state.start("PlayGame");
}

var playGame = function (game) {};
playGame.prototype = {
  preload: function () {
    // preloading the images we are going to use
    // the ball
    game.load.image("ball", "assets/ball.png");
    // the rotating bar
    game.load.image("bar", "assets/bar.png");
    // the ring
    game.load.image("ring", "assets/ring.png");
  },
  create: function () {
    // center the game horizontally 
    game.scale.pageAlignHorizontally = true;
    // center the game vertically
    game.scale.pageAlignVertically = true;
    // setting the scale mode to cover the largest part of the screen possible while showing the entire game
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // picking a random item in bgColors array
    var tintColor = game.rnd.pick(bgColors);
    // setting the document background color to tint color
    document.body.style.background = "#" + tintColor.toString(16);
    // setting the game background color to tint color
    game.stage.backgroundColor = tintColor;
    // placing the ring in the center of the canvas
    var ring = game.add.sprite(game.width / 2, game.height / 2, "ring");
    // setting ring anchor point to its middle
    ring.anchor.set(0.5);
    // setting it to half/transparent
    ring.alpha = 0.5;
    // placing the ball, no matter where as we will change its position later
    this.ball = game.add.sprite(0, 0, "ball");
    // setting ball anchor point to its middle
    this.ball.anchor.set(0.5);
    // let's put a fake start angle just to let next method placeBall work properly
    this.ball.ballAngle = -90;
    // this function will place the ball in a random spot around the ring
    this.placeBall();
    // placing the bar in the middle of the canvas
    this.bar = game.add.sprite(game.width / 2, game.height / 2, "bar");
    // setting bar anchor point
    this.bar.anchor.set(0, 0.5);
    // rotating bar to make it vertical
    this.bar.angle = -90;
    // crossingBall property is used to check if the bar is crossing the ball.
    // the game does not allow the bar to cross the ball, so it will be game over
    this.bar.crossingBall = false;
    // setting bar rotation direction
    this.bar.rotationDirection = 0;
    // waiting for a game input then call startMoving function
    game.input.onDown.add(this.startMoving, this);
  },
  placeBall: function () {
    //  we want to move the ball by at least 40 degrees
    do {
      var newAngle = game.rnd.angle();
    } while (angleDifference(newAngle, this.ball.ballAngle) < 40)
    // setting ballAngle property accordingly
    this.ball.ballAngle = newAngle;
    // placing the ball accordingly thanks to trigonometry
    this.ball.x = game.width / 2 + 175 * Math.cos(Phaser.Math.degToRad(this.ball.ballAngle));
    this.ball.y = game.height / 2 + 175 * Math.sin(Phaser.Math.degToRad(this.ball.ballAngle));
  },
  startMoving: function () {
    // removing the old input listener
    game.input.onDown.remove(this.startMoving, this);
    // adding a new input listener calling changeDirection function  
    game.input.onDown.add(this.changeDirection, this);
    // setting rotation direction
    this.bar.rotationDirection = 1;
  },
  changeDirection: function () {
    // determining the difference between bar and circle angles
    var angleDifference = Math.abs(this.ball.ballAngle - this.bar.angle);
    // if angle difference is greater than the maximum allowed...
    if (angleDifference > maxAngleDifference) {
      // it's game over
      this.fail();
    } else {
      // resetting crossingBall property
      this.bar.crossingBall = false;
      // inverting rotation direction
      this.bar.rotationDirection *= -1;
      // placing the ball elsewhere
      this.placeBall();
    }
  },
  update: function () {
    // moving the bar according to its rotation speed
    this.bar.angle += rotationSpeed * this.bar.rotationDirection;
    // determining the difference between bar and circle angles
    var angleDifference = Math.abs(this.ball.ballAngle - this.bar.angle);
    // if the angle difference is less than the max angle difference allowed,
    // the bar is crossing the ball
    if (angleDifference < maxAngleDifference && !this.bar.crossingBall) {
      // so we set crossingBall property to true
      this.bar.crossingBall = true;
    }
    // if the angle difference is greater than the max difference allowrd
    // and we are crossing the ball, it means we missed the bar
    if (angleDifference > maxAngleDifference && this.bar.crossingBall) {
      // and it's game over
      this.fail();
    }
  },
  fail: function () {
    // stop bar rotation
    this.bar.rotationDirection = 0;
    // tint bar  
    this.bar.tint = 0xff0000;
  }
}

// this function returns the difference between two angles, in degrees 

function angleDifference(a1, a2) {
  return Math.abs((a1 + 180 - a2) % 360 - 180);
}