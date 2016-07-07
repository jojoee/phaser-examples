// the game itself
var game;
// the ball
var ballBody;
// the joint
var ballJoint;
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
  // function to be executed onche game has been created
  create: function() {
    // initializing Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    // making the debug draw show joints
    game.physics.box2d.debugDraw.joints = true;
    // setting gravity
    game.physics.box2d.gravity.y = 500;
    // the ground
    var groundBody = new Phaser.Physics.Box2D.Body(game, null, 400, 595, 1);
    groundBody.setRectangle(800, 10, 0, 0);
    // adding some random bodies
    for (var i = 0; i < 10; i++) {
      var randomBody = new Phaser.Physics.Box2D.Body(game, null, game.rnd.between(100, 700), game.rnd.between(100, 400), 0);
      randomBody.setRectangle(game.rnd.between(27, 75), game.rnd.between(25, 75), 0, 0);
    }
    // the ball
    ballBody = new Phaser.Physics.Box2D.Body(game, null, 400, 550, 2);
    ballBody.setCircle(10);
    // waiting for player input then call placeBall function
    game.input.onDown.add(addHook);
  },
  render: function() {
    // this is the debug draw in action
    game.debug.box2dWorld();
  },
  update: function() {
    if (ballJoint) {
      ballJoint.SetLength(ballJoint.GetLength() * 0.99);
    }
  }
}

function addHook(e) {
  // this is how we get an array of bodies at a certain cordinate, in this case player input coordinate
  var currentBody = game.physics.box2d.getBodiesAtPoint(e.x, e.y);
  // if there is at least one body (but it can't be more than one in this example)...
  if (currentBody.length > 0) {
    // if the body is not static (it's not the ground)
    if (currentBody[0].static) {
      // waking up the body (it won't work on a sleeping body)
      ballBody.data.SetAwake(true);
      // adding a distance joint
      ballJoint = game.physics.box2d.distanceJoint(ballBody, currentBody[0]);
    }
    // update listeners
    game.input.onDown.remove(addHook);
    game.input.onUp.add(removeHook);
  }
}

function removeHook() {
  // update listeners
  game.input.onUp.remove(removeHook);
  game.input.onDown.add(addHook);
  // destroying the joint
  game.physics.box2d.world.DestroyJoint(ballJoint);
}