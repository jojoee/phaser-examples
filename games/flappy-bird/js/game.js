var SPEED = 200; // game speed
var GRAVITY = 900; // g force
var JET = 420;
var OPENING = 200;
var SPAWN_RATE = 1.25;
var ASSET_PATH = './assets/';
var SOUND_PATH = ASSET_PATH + 'snds/';
var IMAGE_PATH = ASSET_PATH + 'imgs/';

var IS_MOBILE = (window.innerWidth < 640) ? true : false;

var GAME = null; // game object
var LOG = null;
var GAME_WIDTH = (IS_MOBILE) ? 320 : 640;
var GAME_HEIGHT = 568;
var GAME_ID = 'game-canvas';
var SOUND_VOLUME = 0.1; // 0 - 1

var DEBUG_XPOS;
var DEBUG_YPOS;

var STARTED_DEBUG_XPOS = 8;
var STARTED_DEBUG_YPOS = 8;

var GAME_FONT_STYLE = {
  fontSize: '24px',
  fill: '#fff',
  align: 'center'
};

var DEBUG_FONT_STYLE = {
  fontSize: '16px',
  fill: '#fff',
  align: 'left'
};

LOG = PHLog.getInstance();

/*================================================================
  #INIT
  ================================================================*/

function init() {
  LOG.info('init');
  GAME = this;

  // set debug
  if (!IS_MOBILE) GAME.add.plugin(Phaser.Plugin.Debug);

  setSplashScreen();
}

function setSplashScreen() {
  // set splash screen
  var text = 'Phaser Version ' + Phaser.VERSION + ' works!';
  GAME.splashScreenText = GAME.add.text(GAME.world.centerX, GAME.world.centerY, text, GAME_FONT_STYLE);
  GAME.splashScreenText.anchor.setTo(0.5, 0.5);
}

/*================================================================
  #LOAD
  ================================================================*/

function preload() {
  LOG.info('preload');
  loadAssets();
}

function loadAssets() {
  GAME.nLoadedAssets = 0;

  // check by opening 'Network' tab on browser's console
  GAME.load.image('wall', IMAGE_PATH + 'wall.png');
  GAME.load.image('background', IMAGE_PATH + 'background-texture.png');
  GAME.load.spritesheet('player', IMAGE_PATH + 'player.png', 48, 48);

  GAME.load.audio('jet', SOUND_PATH + 'jet.wav');
  GAME.load.audio('score', SOUND_PATH + 'score.wav');
  GAME.load.audio('hurt', SOUND_PATH + 'hurt.wav');
}

function loadUpdate() {
  LOG.info('loadUpdate');
}

function loadRender() {
  LOG.info('loadRender');
}

function updateProgressBar() {
  // TODO
  // 
  // add progress bar
}

function create() {
  LOG.info('create');

  // enable plugin
  // game.plugins.add(Phaser.Plugin.Inspector);

  // set bg
  GAME.background = GAME.add.tileSprite(0, 0, GAME.world.width, GAME.world.height, 'background');

  // set physics
  GAME.physics.startSystem(Phaser.Physics.ARCADE);
  GAME.physics.arcade.gravity.y = GRAVITY;

  // set player
  // player sprite
  GAME.player = GAME.add.sprite(0,0,'player');
  // player animation - but not including last frame (last sprite)
  GAME.player.animations.add('fly', [0, 1, 2], 10, true);
  // player physic
  GAME.physics.arcade.enableBody(GAME.player);
  GAME.player.body.collideWorldBounds = true;

  // set wall
  // group them together into a single manageable game object.
  GAME.walls = GAME.add.group();
  GAME.spawnWall(300);
  GAME.spawnWall(300, true);

  // set welcome text
  var headerText = 'TOUCH TO\nSTART GAME';
  GAME.headerText = GAME.add.text(GAME.world.centerX, GAME.world.height / 5, headerText, GAME_FONT_STYLE);
  GAME.headerText.anchor.setTo(0.5, 0.5);

  // set sound
  GAME.jetSnd = GAME.add.audio('jet', SOUND_VOLUME);
  GAME.scoreSnd = GAME.add.audio('score', SOUND_VOLUME);
  GAME.hurtSnd = GAME.add.audio('hurt', SOUND_VOLUME);

  // set input
  // when user click on the screen
  GAME.input.onDown.add(GAME.jump, GAME);

  welcomeScreen();
}

/*================================================================
  #UPDATE
  ================================================================*/

function update() {
  // LOG.info('update');

  if (GAME.isGameStarted) {

    // check if he falling down then
    // set player frame
    if (GAME.player.body.velocity.y > -20) {
      GAME.player.frame = 3;

    // if he jump then animate
    } else {  
      GAME.player.animations.play('fly');
    }

    if (!GAME.isGameOver) {
      GAME.checkCollision();

      // if wall pass ...
      GAME.walls.forEachAlive(function(wall) {

        // if wall pass the screen
        // then kill the wall
        if (wall.x + wall.width < GAME.world.bounds.left) {
          wall.kill();

        // if wall passs the player
        // then update the score
        } else if (!wall.scored && wall.x <= GAME.player.x) {
          GAME.updateScore(wall);
        }
      });
    }

  } else {
    // player will float on the screen
    GAME.player.y = GAME.world.centerY + (8 * Math.cos(GAME.time.now / 200));
  }
}

function checkCollision() {
  // player - bottom bound collision
  if (GAME.player.body.bottom >= GAME.world.bounds.bottom) { GAME.gameOverScreen(); }

  // player - wall collision
  GAME.physics.arcade.collide(GAME.player, GAME.walls, GAME.gameOverScreen, null, GAME);
}

/*================================================================
  #PAUSE
  ================================================================*/

function paused() {
  LOG.info('paused');
}

function pauseUpdate() {
  // LOG.infoNoId('pauseUpdate');
}

function resumed() {
  LOG.info('resumed');
}

/*================================================================
  #OTHERS
  ================================================================*/

function preRender() {
  // LOG.infoNoId('preRender');
}

function render() {
  // LOG.infoNoId('render');
  updateDebug();
}

function resize() {
  LOG.info('resize');
}

function shutdown() {
  LOG.info('shutdown');
}

function updateDebug() {
  DEBUG_XPOS = STARTED_DEBUG_XPOS;
  DEBUG_YPOS = STARTED_DEBUG_YPOS;

  echoDebug('jumps', GAME.nJumps);
  echoDebug('alive walls', GAME.walls.countLiving());
  echoDebug('dead walls', GAME.walls.countDead());
  echoDebug('score', GAME.score);
  echoDebug('highest score', GAME.highestScore);
}

function echoDebug(txt, val) {
  this.game.debug.text(txt + ': ' + val, DEBUG_XPOS, DEBUG_YPOS+=20);
}

/*================================================================
  #GAME
  ================================================================*/

function welcomeScreen() {
  // set bg
  GAME.background.autoScroll(-SPEED * .80, 0);

  // set var
  GAME.isGameStarted = false;
  GAME.isGameOver = false;
  GAME.score = 0;
  GAME.highestScore = GAME.highestScore || 0;
  GAME.nJumps = 0;

  // set header text
  var headerText = 'TOUCH TO\nSTART GAME';
  GAME.headerText.setText(headerText);

  // set player
  GAME.player.body.allowGravity = false;
  GAME.player.reset(GAME.world.width / 4, GAME.world.centerY);
  GAME.player.animations.play('fly');

  // remove all walls
  GAME.walls.removeAll();
}

function start() {
  // set player
  GAME.player.body.allowGravity = true;

  // set header text
  var headerText = 'SCORE\n' + GAME.score;
  GAME.headerText.setText(headerText);

  // set var
  GAME.isGameStarted = true;

  // spawn wall
  GAME.wallTimer = GAME.game.time.events.loop(Phaser.Timer.SECOND * SPAWN_RATE, GAME.spawnWalls, GAME);
  GAME.wallTimer.timer.start();
}

function jump() {
  GAME.nJumps++;

  if (!GAME.isGameStarted) {
    GAME.start();
  }

  if (!GAME.isGameOver) {
    GAME.player.body.velocity.y = -JET;
    GAME.jetSnd.play();

  // player would accidentally restart the game without seeing their final score
  } else if (GAME.time.now > GAME.timeOver + 400) {
    GAME.welcomeScreen();
  }
}

function gameOverScreen() {
  // play sound
  GAME.hurtSnd.play();

  // set var
  GAME.timeOver = GAME.time.now;
  GAME.isGameOver = true;
  GAME.highestScore = Math.max(GAME.score, GAME.highestScore);

  // set text
  var headerText = 'SCORE ' + GAME.score + '\nTOUCH TO\nTRY AGAIN';
  GAME.headerText.setText(headerText);
  
  // stop bg scroll
  GAME.background.autoScroll(0, 0);

  // stop player velocity
  GAME.player.body.velocity.x = 0;

  // stop all walls
  GAME.walls.forEachAlive(function(wall) {
    wall.body.velocity.x = wall.body.velocity.y = 0;
  });
  GAME.wallTimer.timer.stop();
}

function spawnWall(y, flipped) {
  var wall = GAME.walls.create(
    GAME_WIDTH,
    y + (flipped ? -OPENING : OPENING) / 2,
    'wall'
  )

  GAME.physics.arcade.enableBody(wall);
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
  var wallY = GAME.rnd.integerInRange(GAME_HEIGHT * .3, GAME_HEIGHT * .7);
  var botWall = GAME.spawnWall(wallY);
  var topWall = GAME.spawnWall(wallY, true);
}

function updateScore(wall) {
  GAME.scoreSnd.play();

  wall.scored = true;
  GAME.score += .5; // cause we have 2 walls (2 instances) in a row (top and bottom)
  
  var headerText = 'SCORE\n' + GAME.score;
  GAME.headerText.setText(headerText);
}

var STATE = {
  init: init,
  preload: preload,
  loadUpdate: loadUpdate,
  create: create,
  paused: paused,
  pauseUpdate: pauseUpdate,
  resumed: resumed,
  preRender: preRender,
  render: render,
  loadRender: loadRender,
  update: update,
  resize: resize,
  shutdown: shutdown,

  // custom
  welcomeScreen: welcomeScreen,
  start: start,
  jump: jump,
  gameOverScreen: gameOverScreen,
  checkCollision: checkCollision,
  spawnWall: spawnWall,
  spawnWalls: spawnWalls,
  updateScore: updateScore
};

var game = new Phaser.Game(
  GAME_WIDTH,
  GAME_HEIGHT,
  Phaser.CANVAS, // Phaser.AUTO,
  GAME_ID,
  STATE
);
