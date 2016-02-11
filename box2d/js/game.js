var game;
window.onload = function() {
  game = new Phaser.Game(640, 480, Phaser.AUTO, "");
  game.state.add("PlayGame", playGame);
  game.state.start("PlayGame");
}
var playGame = function(game) {};
playGame.prototype = {
  preload: function() {
    game.load.image("crate", "assets/crate.png");
    game.load.image("ground", "assets/ground.png");
  },
  create: function() {
    game.stage.backgroundColor = "#222222";
    // in the same way we initialized other Phaser physics engines, this is how we initialize Box2D engine
    game.physics.startSystem(Phaser.Physics.BOX2D);
    // setting gravity
    game.physics.box2d.gravity.y = 500;
    // we add the sprite which will represent the ground.
    // notice are placing it as if the registration point were in the center
    var groundSprite = game.add.sprite(320, 460, "ground");
    // enabling the physics on the body
    game.physics.box2d.enable(groundSprite);
    // making the body/sprite static
    groundSprite.body.static = true;
    // waiting for player input
    game.input.onDown.add(addCrate, this);
  }
}

function addCrate(e) {
  // this is how we get an array of bodies at a certain cordinate, in this case player input coordinate
  var currentBody = game.physics.box2d.getBodiesAtPoint(e.x, e.y);
  // if there is at least one body (but it can't be more than one in this example)...
  if (currentBody.length > 0) {
    // if the body is not static (it's not the ground)
    if (!currentBody[0].static) {
      // destroy the sprite and the body
      currentBody[0].sprite.destroy();
    }
  } else {
    // otherwise create a crate in the same way we created the ground
    var crateSprite = game.add.sprite(e.x, e.y, "crate");
    game.physics.box2d.enable(crateSprite);
  }
}