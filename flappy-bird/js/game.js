/**
 *
 * This is a simple state template to use for getting a Phaser game up
 * and running quickly. Simply add your own game logic to the default
 * state object or delete it and make your own.
 *
 */

var SPEED = 200; // game speed
var GRAVITY = 900; // g force
var JET = 420;
var OPENING = 200;
var SPAWN_RATE = 1.25;
var ASSET_PATH = './assets/';

function init() {
  console.log('init');

  // splash screen
  var text = 'Phaser Version ' + Phaser.VERSION + ' works!';
  var fontStyle = {
    font  : '24px Arial',
    fill  : '#fff',
    align : 'center'
  };
  var t = game.add.text(this.world.centerX, this.world.centerY, text, fontStyle);
  t.anchor.setTo(0.5, 0.5);
}

function preload() {
  console.log('preload');
    
  // check by opening 'Network' tab on browser's console
  this.load.image('wall', ASSET_PATH + 'wall.png');
  this.load.image('background', ASSET_PATH + 'background-texture.png');
  this.load.spritesheet('player', ASSET_PATH + 'player.png', 48, 48);

  this.load.audio('jet', ASSET_PATH + 'jet.wav');
  this.load.audio('score', ASSET_PATH + 'score.wav');
  this.load.audio('hurt', ASSET_PATH + 'hurt.wav');
}

function create() {
  console.log('create');

  this.background = this.add.tileSprite(0,0, this.world.width, this.world.height, 'background');

  // group them together into a single manageable game object.
  this.walls = this.add.group();
  this.spawnWall(300);
  this.spawnWall(300, true);

  this.physics.startSystem(Phaser.Physics.ARCADE);
  this.physics.arcade.gravity.y = GRAVITY;

  // player sprite
  this.player = this.add.sprite(0,0,'player');
  // player animation
  // but not including last frame (last sprite)
  this.player.animations.add('fly', [0,1,2], 10, true);
  // player physic
  this.physics.arcade.enableBody(this.player);
  this.player.body.collideWorldBounds = true;

  var welcomeText = 'TOUCH TO\nSTART GAME';
  var welcomeTextStyle = {
    size  : '32px',
    fill  : '#FFF',
    align : 'center'
  };
  this.scoreText = this.add.text(this.world.centerX, this.world.height / 5, '', welcomeTextStyle);
  this.scoreText.setText(welcomeText);
  this.scoreText.anchor.setTo(0.5, 0.5);

  // set sound
  this.jetSnd = this.add.audio('jet');
  this.scoreSnd = this.add.audio('score');
  this.hurtSnd = this.add.audio('hurt');

  // when user click on the screen
  this.input.onDown.add(this.jet, this);
  this.reset();
}

function update() {
  console.log('update');

  if (this.gameStarted) {
    
    // set player frame when we don't do anything
    // the player will falling down
    if (this.player.body.velocity.y > -20) {
      this.player.frame = 3;

    // when user click the screen
    // then it will increase velocity
    } else {  
      this.player.animations.play('fly');
    }

    if (! this.gameOver) {

      // player - bottom bound collision
      if (this.player.body.bottom >= this.world.bounds.bottom) { this.setGameOver(); }
      // player - wall collision
      this.physics.arcade.collide(this.player, this.walls, this.setGameOver, null, this);

      var logMsg = 'walls - alive: ' + this.walls.countLiving() + ', dead: ' + this.walls.countDead();
      console.log(logMsg);

      // if wall pass ...
      this.walls.forEachAlive(function(wall) {

        // if wall pass the screen
        // then kill the wall
        if (wall.x + wall.width < game.world.bounds.left) {
          wall.kill();

        // if wall passs the player
        // then update the score
        } else if (! wall.scored && wall.x <= state.player.x) {
          state.addScore(wall);
        }
      });
    }
  } else {
    this.player.y = this.world.centerY + (8 * Math.cos(this.time.now / 200));
  }
}

function reset() {
  console.log('reset');

  this.background.autoScroll(-SPEED * .80 ,0);

  this.gameStarted = false; // unused
  this.gameOver = false; // unused
  this.score = 0; // unused

  this.player.body.allowGravity = false;
  this.player.reset(this.world.width / 4, this.world.centerY);
  this.player.animations.play('fly');

  // remove all walls
  this.walls.removeAll();
}

function start() {
  console.log('start');

  this.player.body.allowGravity = true;
  var screenText = 'SCORE\n' + this.score;
  this.scoreText.setText(screenText);
  this.gameStarted = true;

  // spawn wall
  this.wallTimer = this.game.time.events.loop(Phaser.Timer.SECOND * SPAWN_RATE, this.spawnWalls, this);
  this.wallTimer.timer.start();
}

function jet() {
  console.log('jet');

  if (! this.gameStarted) { this.start(); }

  if (! this.gameOver) {
    this.player.body.velocity.y = -JET;
    this.jetSnd.play();

  } else if (this.time.now > this.timeOver + 400) {
    this.reset();
  }  
}

function setGameOver() {
  console.log('setGameOver');
  this.hurtSnd.play();

  this.gameOver = true;
  this.timeOver = this.time.now;
  var screenText = 'FINAL SCORE\n' + this.score + '\n\nTOUCH TO\nTRY AGAIN';
  this.scoreText.setText(screenText);

  // stop bg scroll
  this.background.autoScroll(0, 0);

  // stop player velocity
  this.player.body.velocity.x = 0;

  // stop all walls
  this.walls.forEachAlive(function(wall) {
    wall.body.velocity.x = wall.body.velocity.y = 0;
  });
  this.wallTimer.timer.stop();  
}

function spawnWall(y, flipped) {
  console.log('spawnWall');

  var wall = this.walls.create(
    game.width,
    y + (flipped ? - OPENING : OPENING) / 2,
    'wall'
  )

  this.physics.arcade.enableBody(wall);
  wall.body.allowGravity = false;
  wall.scored = false;
  wall.body.immovable = true;
  wall.body.velocity.x = -SPEED;

  if (flipped) {
    wall.scale.y = -1;
    wall.body.offset.y = -wall.body.height;
  }
}

function spawnWalls() {
  console.log('spawnWalls');

  var wallY = this.rnd.integerInRange(game.height * .3, game.height * .7);
  var botWall = this.spawnWall(wallY);
  var topWall = this.spawnWall(wallY, true);
}

function addScore(wall) {
  this.scoreSnd.play();

  wall.scored = true;
  this.score += .5; // cause we have 2 walls (2 instances) in a row (top and bottom)
  var screenText = 'SCORE\n' + this.score;
  this.scoreText.setText(screenText);
}

var state = {
  init: init,
  preload: preload,
  create: create,
  update: update,

  // custom
  reset: reset,
  start: start,
  jet: jet,
  setGameOver: setGameOver,
  spawnWall: spawnWall,
  spawnWalls: spawnWalls,
  addScore: addScore
};

var game = new Phaser.Game(
  320,
  568,
  Phaser.AUTO,
  'game-canvas',
  state
);
