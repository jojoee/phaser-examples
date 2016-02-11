window.onload = function() {
  var game = new Phaser.Game(728, 640, Phaser.CANVAS, "", {
    preload: onPreload,
    create: onCreate
  });
  var totem;
  // THE GAME IS PRELOADING
  function onPreload() {
    game.load.image("grass", "assets/grass.png");
    game.load.image("1x1_destroy", "assets/1x1_destroy.png");
    game.load.image("4x1_destroy", "assets/4x1_destroy.png");
    game.load.image("2x1_solid", "assets/2x1_solid.png");
    game.load.image("3x1_destroy", "assets/3x1_destroy.png");
    game.load.image("4x2_solid", "assets/4x2_solid.png");
    game.load.image("totem", "assets/totem.png");
    game.load.image("sensor", "assets/sensor.png");
  }
  // THE GAME HAS BEEN CREATED
  function onCreate() {
    // creation of large world bounds
    game.world.bounds = new Phaser.Rectangle(-300, 0, 1328, 640);
    // adding P2 physics to the game
    game.physics.startSystem(Phaser.Physics.P2JS);
    // setting gravity
    game.physics.p2.gravity.y = 250;
    // building the totem
    var grass = game.add.sprite(364, 608, "grass");
    // adding "unbreakable" property to assets we do not want to be removed
    grass.unbreakable = true;
    // naming grass sprite as "grass" to recognize it later on
    grass.name = "grass";
    game.physics.p2.enable(grass);
    grass.body.static = true;
    var brick = game.add.sprite(460, 544, "1x1_destroy");
    game.physics.p2.enable(brick);
    brick = game.add.sprite(268, 544, "1x1_destroy");
    game.physics.p2.enable(brick);
    brick = game.add.sprite(364, 480, "4x1_destroy");
    game.physics.p2.enable(brick);
    brick = game.add.sprite(364, 416, "2x1_solid");
    brick.unbreakable = true;
    game.physics.p2.enable(brick);
    brick = game.add.sprite(332, 352, "3x1_destroy");
    game.physics.p2.enable(brick);
    brick = game.add.sprite(364, 256, "4x2_solid");
    brick.unbreakable = true;
    game.physics.p2.enable(brick);
    totem = game.add.sprite(364, 128, "totem");
    totem.unbreakable = true;
    game.physics.p2.enable(totem);
    // now adding bound sensors, just a bit out of game bounds
    var sensor = game.add.sprite(-96, 320, "sensor");
    sensor.name = "sensor";
    game.physics.p2.enable(sensor);
    sensor.body.static = true;
    sensor.body.data.shapes[0].sensor = true;
    sensor = game.add.sprite(824, 320, "sensor");
    sensor.name = "sensor";
    game.physics.p2.enable(sensor);
    sensor.body.static = true;
    sensor.body.data.shapes[0].sensor = true;
    // listener for totem collision
    totem.body.onBeginContact.add(checkTotemCollision, this);
    // adding event listener for mousedown/touch event
    game.input.onDown.add(destroyBlock, this);
  }
  // MOUSE IS CLICKED
  function destroyBlock(pointer) {
    // getting the block we clicked on
    var bodyClicked = game.physics.p2.hitTest(pointer.position);
    if (bodyClicked.length != 0) {
      // if the body is not unbreakable...
      if (!bodyClicked[0].parent.sprite.unbreakable) {
        // destroy the block
        bodyClicked[0].parent.sprite.kill();
      }
    }
  }
  // TOTEM IS COLLIDING ON SOMETHING
  function checkTotemCollision(body, shapeA, shapeB, equation) {
    if (body) {
      //check collision with the boundary sensors
      if (body.sprite.name == "sensor") {
        // writing a text
        var style = {
          font: "65px Arial",
          fill: "#ff0044",
          align: "center"
        };
        var text = game.add.text(364, 90, "Oh, no!! Out of the stage", style);
        text.anchor.set(0.5);
        totem.body.onBeginContact.remove(checkTotemCollision, this);
      }
      // check collision with the ground
      if (body.sprite.name == "grass") {
        // writing a text
        var style = {
          font: "65px Arial",
          fill: "#ff0044",
          align: "center"
        };
        var text = game.add.text(364, 90, "Oh, no!! On the floor!!", style);
        text.anchor.set(0.5);
        totem.body.onBeginContact.remove(checkTotemCollision, this);
      }
    }
  }
};