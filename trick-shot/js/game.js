// the game itself
var game;
// the ball you are about to fire
var ball;
// the rectangle where you can place the ball and charge the launch power
var launchRectangle = new Phaser.Rectangle(30, 250, 200, 150);
// here we will draw the predictive trajectory
var trajectoryGraphics;
// a simply multiplier to increase launch power
var forceMult = 5;
// here we will store the launch velocity
var launchVelocity;
// this is the compound object which will represent the crate
var crateBody;
// we are going to create a moving crate, so this is crate speed
var crateSpeed = 160;
// function to be executed when the window loads
window.onload = function() {
  // starting the game itself
  game = new Phaser.Game(800, 600, Phaser.AUTO, "");
  // creation and execution of "PlayGame" state
  game.state.add("PlayGame", playGame);
  game.state.start("PlayGame");
}
var playGame = function(game) {};
playGame.prototype = {
  // preloading graphic assets (only the ball)
  preload: function() {
    game.load.image("ball", "assets/ball.png");
  },
  // function to be executed onche game has been created
  create: function() {
    // adding a new graphics and drawing the launch rectangle in it
    var launchGraphics = game.add.graphics(0, 0);
    launchGraphics.lineStyle(5, 0xff0000);
    launchGraphics.drawRect(launchRectangle.x, launchRectangle.y, launchRectangle.width, launchRectangle.height);
    // also adding the graphics where we'll draw the trajectory
    trajectoryGraphics = game.add.graphics(0, 0);
    // setting initial launch velocity to zero
    launchVelocity = new Phaser.Point(0, 0);
    // changing game background to dark grey
    game.stage.backgroundColor = "#222222";
    // initializing Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    // setting gravity
    game.physics.box2d.gravity.y = 500;
    // waiting for player input then call placeBall function
    game.input.onDown.add(placeBall);
    // this is how we build the crate as a compound body
    // it's a kinematic body so it will act as a static body, but it will also react to forces
    crateBody = new Phaser.Physics.Box2D.Body(game, null, 500, 440, 1);
    crateBody.restitution = 0.98;
    crateBody.addRectangle(120, 10, 0, 0);
    crateBody.addRectangle(10, 110, -55, -60);
    crateBody.addRectangle(10, 110, 55, -60);
    var crateTop = crateBody.addRectangle(10, 40, 68, -124, Math.PI / 4);
    // adding custom user data to give crate parts a name
    crateTop.m_userData = "top";
    crateTop = crateBody.addRectangle(10, 40, -68, -124, -Math.PI / 4);
    crateTop.m_userData = "top";
    // inside the crate we also place a sensor to check if the ball is inside the crate
    var sensor = crateBody.addRectangle(100, 70, 0, -40);
    sensor.m_isSensor = true;
    // adding custom user data to give crate sensor a name
    sensor.m_userData = "inside";
    // setting crate bitmask to check for selective collisions
    crateBody.setCollisionCategory(2);
    // setting crate horizontal velocity
    crateBody.velocity.x = crateSpeed;
    // also placing a static object to make the game a little harder
    var barBody = new Phaser.Physics.Box2D.Body(game, null, 350, 300, 0);
    barBody.setRectangle(10, 400, 0, 0);
  },
  render: function() {
    // this is the debug draw in action
    game.debug.box2dWorld();
  },
  update: function() {
    // updating create velocity according to its position
    if (crateBody.x > 710) {
      crateBody.velocity.x = -crateSpeed;
    }
    if (crateBody.x < 500) {
      crateBody.velocity.x = crateSpeed;
    }
  }
}
// this function will place the ball
function placeBall(e) {
  // we place a new ball only if we are inside launch rectangle
  if (launchRectangle.contains(e.x, e.y)) {
    // adding ball sprite
    ball = game.add.sprite(e.x, e.y, "ball");
    // enabling physics to ball sprite
    game.physics.box2d.enable(ball);
    // temporarily set ball gravity to zero, so it won't fall down
    ball.body.gravityScale = 0;
    // telling Box2D we are dealing with a circle shape
    ball.body.setCircle(ball.width / 2);
    ball.body.restitution = 0.98;
    // removing onDown listener
    game.input.onDown.remove(placeBall);
    // when the player ends the input call launchBall function
    game.input.onUp.add(launchBall);
    // when the player moves the input call chargeBall
    game.input.addMoveCallback(chargeBall);
  }
}
// this function will allow the player to charge the ball before the launch, and it's the core of the example
function chargeBall(pointer, x, y, down) {
  // we does not allow multitouch, so we are only handling pointer which id is zero
  if (pointer.id == 0) {
    // clearing trajectory graphics, setting its line style and move the pen on ball position
    trajectoryGraphics.clear();
    trajectoryGraphics.lineStyle(3, 0x00ff00);
    trajectoryGraphics.moveTo(ball.x, ball.y);
    // now we have two options: the pointer is inside the launch rectangle...
    if (launchRectangle.contains(x, y)) {
      // ... and in this case we simply draw a line to pointer position
      trajectoryGraphics.lineTo(x, y);
      launchVelocity.x = ball.x - x;
      launchVelocity.y = ball.y - y;
    }
    // ... but the pointer cal also be OUTSIDE launch rectangle
    else {
      // ... in this case we have to check for the intersection between launch line and launch rectangle
      var intersection = lineIntersectsRectangle(new Phaser.Line(x, y, ball.x, ball.y), launchRectangle);
      trajectoryGraphics.lineTo(intersection.x, intersection.y);
      launchVelocity.x = ball.x - intersection.x;
      launchVelocity.y = ball.y - intersection.y;
    }
    // now it's time to draw the predictive trajectory  
    trajectoryGraphics.lineStyle(1, 0x00ff00);
    launchVelocity.multiply(forceMult, forceMult);
    for (var i = 0; i < 180; i += 6) {
      var trajectoryPoint = getTrajectoryPoint(ball.x, ball.y, launchVelocity.x, launchVelocity.y, i);
      trajectoryGraphics.moveTo(trajectoryPoint.x - 3, trajectoryPoint.y - 3);
      trajectoryGraphics.lineTo(trajectoryPoint.x + 3, trajectoryPoint.y + 3);
      trajectoryGraphics.moveTo(trajectoryPoint.x - 3, trajectoryPoint.y + 3);
      trajectoryGraphics.lineTo(trajectoryPoint.x + 3, trajectoryPoint.y - 3);
    }
  }
}
// function to launch the ball
function launchBall() {
  // adjusting callbacks
  game.input.deleteMoveCallback(0);
  game.input.onUp.remove(launchBall);
  game.input.onDown.add(placeBall);
  // setting ball velocity
  ball.body.velocity.x = launchVelocity.x;
  ball.body.velocity.y = launchVelocity.y;
  // applying the gravity to the ball
  ball.body.gravityScale = 1;
  // ball collision listener callback
  ball.body.setCategoryContactCallback(2, ballHitsCrate);
}
// function to be executed when the ball hits the crate
function ballHitsCrate(body1, body2, fixture1, fixture2, begin) {
  // we only want this to happen when the hit begins
  if (begin) {
    // if the ball hits the sensor inside...
    if (fixture2.m_userData == "inside") {
      // setting restitution to zero to prevent the ball to jump off the box, but it's just a "hey I got the collision" test 
      body1.restitution = 0;
      // now the ball looks for a contact category which does not exist, so we won't trigger anymore the contact with the sensor
      body1.setCategoryContactCallback(4, ballHitsCrate);
    }
    // if the ball hits the crate top, destroy it. Again, it's just an "I got you!" collision feedback   
    if (fixture2.m_userData == "top") {
      body1.sprite.destroy();
    }
  }
}
// simple function to check for intersection between a segment and a rectangle
function lineIntersectsRectangle(l, r) {
  return l.intersects(new Phaser.Line(r.left, r.top, r.right, r.top), true) ||
    l.intersects(new Phaser.Line(r.left, r.bottom, r.right, r.bottom), true) ||
    l.intersects(new Phaser.Line(r.left, r.top, r.left, r.bottom), true) ||
    l.intersects(new Phaser.Line(r.right, r.top, r.right, r.bottom), true);
}
// function to calculate the trajectory point taken from http://phaser.io/examples/v2/box2d/projected-trajectory
function getTrajectoryPoint(startX, startY, velocityX, velocityY, n) {
  var t = 1 / 60;
  var stepVelocityX = t * game.physics.box2d.pxm(-velocityX);
  var stepVelocityY = t * game.physics.box2d.pxm(-velocityY);
  var stepGravityX = t * t * game.physics.box2d.pxm(-game.physics.box2d.gravity.x);
  var stepGravityY = t * t * game.physics.box2d.pxm(-game.physics.box2d.gravity.y);
  startX = game.physics.box2d.pxm(-startX);
  startY = game.physics.box2d.pxm(-startY);
  var tpx = startX + n * stepVelocityX + 0.5 * (n * n + n) * stepGravityX;
  var tpy = startY + n * stepVelocityY + 0.5 * (n * n + n) * stepGravityY;
  tpx = game.physics.box2d.mpx(-tpx);
  tpy = game.physics.box2d.mpx(-tpy);
  return {
    x: tpx,
    y: tpy
  };
}