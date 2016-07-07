var LOG = null;
LOG = PHLog.getInstance();

var IS_MOBILE = (window.innerWidth < 640) ? true : false;

var ASSET_PATH = './assets/';
var SOUND_PATH = ASSET_PATH + 'snds/';
var IMAGE_PATH = ASSET_PATH + 'imgs/';

var MIN_WIDTH = 240;
var MIN_HEIGHT = 170;
var MAX_WIDTH = 2880;
var MAX_HEIGHT = 1920;

var WORLD_WIDTH = 1920;
var WORLD_HEIGHT = 1920;

var SpaceHipster = SpaceHipster || {};

// Boot
// - set scale
// - load preloader assets
SpaceHipster.Boot = function(){};
SpaceHipster.Boot.prototype = {
  init: function() {
    // add plugin
    if (!IS_MOBILE) this.add.plugin(Phaser.Plugin.Debug);
  },
  preload: function() {
    LOG.info('Boot - preload');

    // load preloader assets
    this.load.image('logo', IMAGE_PATH + 'logo.png');
    this.load.image('preloadbar', IMAGE_PATH + 'preloader-bar.png');
  },
  create: function() {
    LOG.info('Boot - create');

    // set bg
    this.game.stage.backgroundColor = '#fff';

    // scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.minWidth = MIN_WIDTH;
    this.scale.minHeight = MIN_HEIGHT;
    this.scale.maxWidth = MAX_WIDTH;
    this.scale.maxHeight = MAX_HEIGHT;
    this.scale.pageAlignHorizontally = true; // have the game centered horizontally

    // start Preload
    this.state.start('Preload');
  }
};

// Preload
// - run preloader
// - load game assets
SpaceHipster.Preload = function(){};
SpaceHipster.Preload.prototype = {
  preload: function() {
    LOG.info('Preload - preload');

    // show splash screen
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);

    // progress bar
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);

    // load game assets
    this.load.image('space', IMAGE_PATH + 'space.png');
    this.load.image('rock', IMAGE_PATH + 'rock.png');
    this.load.spritesheet('playership', IMAGE_PATH + 'player.png', 12, 12);
    this.load.spritesheet('power', IMAGE_PATH + 'power.png', 12, 12);
    this.load.image('playerParticle', IMAGE_PATH + 'player-particle.png');
    this.load.audio('collect', SOUND_PATH + 'collect.ogg');
    this.load.audio('explosion', SOUND_PATH + 'explosion.ogg');
  },
  create: function() {
    LOG.info('Preload - create');

    // start MainMenu
    this.state.start('MainMenu');
  }
};

var HIGHEST_SCORE = 0;

// MainMenu
SpaceHipster.MainMenu = function(){};
SpaceHipster.MainMenu.prototype = {
  init: function(score) {
    LOG.info('MainMenu - init');

    // set score / highest score
    var score = score || 0;
    HIGHEST_SCORE = Math.max(score, HIGHEST_SCORE);
  },
  create: function() {
    LOG.info('MainMenu - create');

    // set bg (repeated img)
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
    this.background.autoScroll(-20, 0);

    // set welcome text
    var text = 'Tap to begin';
    var style = {
      font: '30px Arial',
      fill: '#fff',
      align: 'center'
    };
    var t = this.game.add.text(this.game.width / 2, this.game.height / 5, text, style);
    t.anchor.set(0.5);
  },
  update: function() {
    // LOG.info('MainMenu - update');

    // if click
    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  }
};

// Game
SpaceHipster.Game = function(){};
SpaceHipster.Game.prototype = {
  create: function() {
    LOG.info('Game - create');

    // set physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // set world dimensions
    this.game.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    // set bg (repeated img)
    this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');

    // set player
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playership');
    this.player.scale.setTo(2);
    this.player.animations.add('fly', [0, 1, 2, 3], 5, true);
    this.player.animations.play('fly');

    // set player score
    this.playerScore = 0;

    // set player physics
    this.game.physics.arcade.enable(this.player);
    this.playerSpeed = 120;
    this.player.body.collideWorldBounds = true;

    // set camera
    // - follow the player in the world
    this.game.camera.follow(this.player);

    
    // set collectables
    this.generateCollectables();

    // set asteroids
    this.generateAsteriods();

    // set score
    this.showLabels();

    // set sounds
    this.explosionSound = this.game.add.audio('explosion');
    this.collectSound = this.game.add.audio('collect');
  },
  render: function() {
    // LOG.logNoId('Game - render');
    
    var xPos = 8;
    var yPos = 8;
    this.game.debug.text('highest score ' + HIGHEST_SCORE, xPos, yPos+=20);

  },
  update: function() {
    // LOG.infoNoId('Game - update');

    if(this.game.input.activePointer.justPressed()) {
      
      //move on the direction of the input
      this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
    }

    //collision between player and asteroids
    this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);

    //overlapping between player and collectables
    this.game.physics.arcade.overlap(this.player, this.collectables, this.collect, null, this);
  },
  generateCollectables: function() {
    LOG.info('Game - generateCollectables');

    this.collectables = this.game.add.group();

    //enable physics in them
    this.collectables.enableBody = true;
    this.collectables.physicsBodyType = Phaser.Physics.ARCADE;

    //phaser's random number generator
    var numCollectables = this.game.rnd.integerInRange(100, 150)
    var collectable;

    for (var i = 0; i < numCollectables; i++) {
      //add sprite
      collectable = this.collectables.create(this.game.world.randomX, this.game.world.randomY, 'power');
      collectable.animations.add('fly', [0, 1, 2, 3], 5, true);
      collectable.animations.play('fly');
    }

  },
  generateAsteriods: function() {
    LOG.info('Game - generateAsteriods');
    this.asteroids = this.game.add.group();
    
    //enable physics in them
    this.asteroids.enableBody = true;
    this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;

    //phaser's random number generator
    var numAsteroids = this.game.rnd.integerInRange(150, 200)
    var asteriod;

    for (var i = 0; i < numAsteroids; i++) {
      //add sprite
      asteriod = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
      asteriod.scale.setTo(this.game.rnd.integerInRange(10, 40)/10);

      //physics properties
      asteriod.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
      asteriod.body.velocity.y = this.game.rnd.integerInRange(-20, 20);
      asteriod.body.immovable = true;
      asteriod.body.collideWorldBounds = true;
    }
  },
  hitAsteroid: function(player, asteroid) {
    LOG.info('Game - hitAsteroid');


    //play explosion sound
    this.explosionSound.play();

    //make the player explode
    var emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
    emitter.makeParticles('playerParticle');
    emitter.minParticleSpeed.setTo(-200, -200);
    emitter.maxParticleSpeed.setTo(200, 200);
    emitter.gravity = 0;
    emitter.start(true, 1000, null, 100);
    this.player.kill();

    this.game.time.events.add(800, this.gameOver, this);
  },
  gameOver: function() {    
    LOG.info('Game - gameOver');

    //pass it the score as a parameter 
    this.game.state.start('MainMenu', true, false, this.playerScore);
  },
  collect: function(player, collectable) {
    LOG.info('Game - collect');

    //play collect sound
    this.collectSound.play();

    //update score
    this.playerScore++;
    this.scoreLabel.text = this.playerScore;

    //remove sprite
    collectable.destroy();
  },
  showLabels: function() {
    LOG.info('Game - showLabels');

    //score text
    var text = "0";
    var style = { font: "20px Arial", fill: "#fff", align: "center" };
    this.scoreLabel = this.game.add.text(0, 0, text, style);
    this.scoreLabel.fixedToCamera = true;
  }
};

SpaceHipster.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

SpaceHipster.game.state.add('Boot', SpaceHipster.Boot);
SpaceHipster.game.state.add('Preload', SpaceHipster.Preload);
SpaceHipster.game.state.add('MainMenu', SpaceHipster.MainMenu);
SpaceHipster.game.state.add('Game', SpaceHipster.Game);

SpaceHipster.game.state.start('Boot');