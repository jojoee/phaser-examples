window.onload = function() {
  // game definition, 320x480
  var game = new Phaser.Game(320, 480, Phaser.CANVAS, "", {
    preload: onPreload,
    create: onCreate
  });
  // the player
  var player
  // function executed on preload
  function onPreload() {
    game.load.image("player", "assets/player.png");
  }
  // function to scale up the game to full screen
  function goFullScreen() {
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize(true);
  }
  // function to be called when the game has been created
  function onCreate() {
    // initializing physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // going full screen
    goFullScreen();
    // adding the player on stage
    player = game.add.sprite(160, 240, "player");
    // setting player anchor point
    player.anchor.setTo(0.5);
    // enabling physics car.body.collideWorldBounds = true;
    game.physics.enable(player, Phaser.Physics.ARCADE);
    // the player will collide with bounds
    player.body.collideWorldBounds = true;
    // setting player bounce
    player.body.bounce.set(0.8);
    // setting gyroscope update frequency
    gyro.frequency = 10;
    // start gyroscope detection
    gyro.startTracking(function(o) {
      // updating player velocity
      player.body.velocity.x += o.gamma / 20;
      player.body.velocity.y += o.beta / 20;
    });
  }
}