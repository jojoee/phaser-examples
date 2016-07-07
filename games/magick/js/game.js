window.onload = function() {
  // the game itself
  var game = new Phaser.Game(800, 320);
  // the player! The hero of the game!!
  var player;
  // level map, created with Tiled
  var map;
  // map layer with level data
  var levelLayer;
  // player horizontal speed
  var playerSpeed = 120;
  // map tile size, in pixels
  var tileSize = 32;
  // tilePoint will be used to save the coordinates of the tile placed by the player
  var tilePoint = null;
  // is the player jumping?
  var playerJumping = false;
  // playGame function, to be bound to "PlayGame" state
  var playGame = function(game) {}
  playGame.prototype = {
    // preloading assets
    preload: function() {
      // map data
      game.load.tilemap("map", "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
      // rock image, used to draw walls
      game.load.image("rock", "assets/rock.png");
      // block image, used to let the player add tiles to the map
      game.load.image("block", "assets/block.png");
      // the player
      game.load.image("player", "assets/player.png");
    },
    // once the game has been created
    create: function() {
      // starting arcade physics
      game.physics.startSystem(Phaser.Physics.ARCADE);
      // adding the map
      map = game.add.tilemap("map");
      // adding "rock" and "block" graphic assets to the map
      map.addTilesetImage("rock");
      map.addTilesetImage("block");
      // both "rock" and "block" are solid
      map.setCollisionBetween(1, 2);
      // we are going to use "myLevel" layer, as created with Tiled
      levelLayer = map.createLayer("myLevel");
      // adding the player
      player = game.add.sprite(48, 226, "player");
      // setting player registration point in the center
      player.anchor.setTo(0.5);
      // enabling arcade pysics to the player
      game.physics.enable(player, Phaser.Physics.ARCADE);
      // setting player gravity
      player.body.gravity.y = 400;
      // waiting for input, both touch or mouse click, to call addBlock function
      game.input.onDown.add(addBlock, this);
    },
    // function to be executed at each frame
    update: function() {
      // setting player x speed to zero
      player.body.velocity.x = 0;
      // check for collision between the player and the level, and call "movePlayer" if there's a collision
      game.physics.arcade.collide(player, levelLayer, movePlayer);
    }
  }

  function movePlayer() {
    // is the player blocked down, that is: is the player on the floor?
    if (player.body.blocked.down) {
      // set player horizontal velocity
      player.body.velocity.x = playerSpeed;
      // the player is definitively not jumping
      playerJumping = false;
    }
    // is player speed greater than zero and the player is blocked right, that is the player is against a wall on the right?
    if (player.body.blocked.right && playerSpeed > 0) {
      // is the tile on player upper right diagonal empty, as well as the tile immediately above the player, or is the player already jumping?
      if ((!map.getTileWorldXY(player.x + tileSize, player.y - tileSize, tileSize, tileSize, levelLayer) && !map.getTileWorldXY(player.x, player.y - tileSize, tileSize, tileSize, levelLayer)) || playerJumping) {
        // jump
        jump();
      } else {
        // invert player speed
        playerSpeed *= -1;
      }
    }
    // the same concept is applied to collisions on the left side of the player
    if (player.body.blocked.left && playerSpeed < 0) {
      if ((!map.getTileWorldXY(player.x - tileSize, player.y - tileSize, tileSize, tileSize, levelLayer) && !map.getTileWorldXY(player.x, player.y - tileSize, tileSize, tileSize, levelLayer)) || playerJumping) {
        jump();
      } else {
        playerSpeed *= -1;
      }
    }
  }

  function addBlock(e) {
    // is the tile where we clicked/touched a null tile?
    if (!map.getTileWorldXY(e.x, e.y, tileSize, tileSize, levelLayer)) {
      // is there already a tile placed by the player?
      if (tilePoint) {
        // remove the tile placed by the player
        map.removeTileWorldXY(tilePoint.x, tilePoint.y, tileSize, tileSize, levelLayer);
      }
      // place the tile on mouse/touch position
      map.putTileWorldXY(2, e.x, e.y, tileSize, tileSize, levelLayer);
      // save placed tile position
      tilePoint = new Phaser.Point(e.x, e.y);
    }
  }

  function jump() {
    // setting player vertical velocity
    player.body.velocity.y = -100;
    // setting player horizontal velocity
    player.body.velocity.x = playerSpeed / 4;
    // now the player is jumping  
    playerJumping = true;
  }
  // defining "PlayGame" state
  game.state.add("PlayGame", playGame);
  // run "PlayGame" state
  game.state.start("PlayGame")
}