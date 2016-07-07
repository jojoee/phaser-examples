window.onload = function() {
  // here we define a new 640x480 game, with three core functions:
  // onPreload to be executed when the game preloads
  // onCreate to be executed once the game is firstly created
  // onUpdate to be called every time the game us updated
  var game = new Phaser.Game(640, 480, Phaser.CANVAS, "", {
    preload: onPreload,
    create: onCreate,
    update: onUpdate
  });
  // the square!! the hero of the game
  var theSquare;
  // the spike!! hero's worst (and only) enemy
  var theSpike;
  // how many spikes are we going to add?
  var spikesAmount = 10;
  // all spikes are going to be grouped here
  var spikesGroup //=game.add.group();
    // square's horizontal speed in pixels/frame
  var xSpeed = 4;
  // square's jump height, in pixels
  var jumpHeight = 40;
  // square's jump width, in pixels. xSpeed must divide jumpWidth
  var jumpWidth = 120;
  // rotation performed at every jump, in degrees
  var jumpRotation = 180;
  // time passed since the player started jumping, in frames
  var jumpTime = 0;
  // is the player jumping?
  var isJumping = false;
  // simple degrees to radians conversion
  var degToRad = 0.0174532925;
  // array containing all various floor y positions, in pixels
  var floorY = Array(92, 184, 276, 368, 460);
  // floor I am currently moving on 
  var currentFloor = 0;
  // floor height, in pixels
  var floorHeight = 20;
  // x position where the level starts, in pixels
  var levelStart = 0;
  // x position where the level ends, in pixels
  var levelEnd = 640;
  // THE GAME IS PRELOADING
  function onPreload() {
    // loading player image
    game.load.image("square", "assets/square.png");
    // loading spike image
    game.load.image("spike", "assets/spike.png");
  }
  // THE GAME HAS BEEN CREATED
  function onCreate() {
    // simply drawing all floors, as lines from levelStart to levelEnd, tickness floorHeight
    var floor = game.add.graphics(0, 0);
    floor.lineStyle(floorHeight, 0x440044, 1);
    for (i = 0; i < floorY.length; i++) {
      floor.moveTo(levelStart, floorY[i] + floorHeight / 2);
      floor.lineTo(levelEnd, floorY[i] + floorHeight / 2);
    }
    // adding the hero
    theSquare = game.add.sprite(levelStart, floorY[currentFloor] - game.cache.getImage("square").height / 2, "square");
    theSquare.anchor.setTo(0.5, 0.5);
    // adding some spikes, first we declare the group
    spikesGroup = game.add.group();
    // the we create the spikes as sprites and randomly place them on the stage
    for (i = 0; i < spikesAmount; i++) {
      var randomFloor = Math.floor(Math.random() * floorY.length)
      theSpike = game.add.sprite(Math.floor(Math.random() * 400) + 120, floorY[randomFloor] - game.cache.getImage("spike").height / 2, "spike");
      theSpike.anchor.setTo(0.5, 0.5);
      // finally we add the newly created spike to the group
      spikesGroup.add(theSpike);
    }
    // event listener for mouse down
    game.input.onDown.add(jump, this);

    game.physics.arcade.enable([theSquare, spikesGroup])
  }

  function jump() {
    // if we aren't jumping... then JUMP!!
    if (!isJumping) {
      jumpTime = 0;
      isJumping = true;
    }
  }
  // THE GAME IS GOING TO BE UPDATED
  function onUpdate() {
    // temp variable to let us know if we are on an odd or even floor
    var mod = currentFloor % 2;
    // updating square x position
    theSquare.x += xSpeed * (1 - 2 * mod);
    // if the square reached the end of the floor...
    if (theSquare.x > levelEnd && mod == 0 || theSquare.x < levelStart && mod == 1) {
      // move onto next floor
      currentFloor++;
      // if we just finished the lowest floor...
      if (currentFloor > floorY.length - 1) {
        // start the game again
        currentFloor = 0;
      }
      // even or odd?
      mod = currentFloor % 2
        // we start on the ground
      isJumping = false;
      theSquare.rotation = 0;
      theSquare.x = levelEnd * mod + levelStart * (1 - mod);
      theSquare.y = floorY[currentFloor] - game.cache.getImage("square").height / 2;
    }
    // if we are jumping...
    if (isJumping) {
      // calculating the number of frames we will be jumping
      var jumpFrames = jumpWidth / xSpeed;
      // calculating how many degrees should the square rotate at each frame
      var degreesPerFrame = jumpRotation / jumpFrames * (1 - 2 * mod);
      // calculating how may radians we have to apply to sine trigonometry function to simulate player jump
      var radiansPerFrame = (180 / jumpFrames) * degToRad
        // anohter frame jumping...
      jumpTime++;
      // updating rotation
      theSquare.angle += degreesPerFrame;
      // updating y position
      theSquare.y = floorY[currentFloor] - game.cache.getImage("square").height / 2 - jumpHeight * Math.sin(radiansPerFrame * jumpTime);
      // if we jumped enough...
      if (jumpTime == jumpFrames) {
        // ... just stop jumping
        isJumping = false;
        theSquare.y = floorY[currentFloor] - game.cache.getImage("square").height / 2;
      }
    }
    // checking for collision between the square and the group of spikes, and calling onCollision function if actors overlap
    game.physics.arcade.overlap(theSquare, spikesGroup, onCollision);
  }
  // at the moment if there's a collision we simply make the player restart from the last visited floor
  function onCollision() {
    var mod = currentFloor % 2;
    isJumping = false;
    theSquare.rotation = 0;
    theSquare.x = levelEnd * mod + levelStart * (1 - mod);
    theSquare.y = floorY[currentFloor] - game.cache.getImage("square").height / 2;
  }

  function onRender() {}
};