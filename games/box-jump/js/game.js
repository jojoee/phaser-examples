Game = {};
var w = 600;
var h = 200;
var DEATH = 0;

var map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 5, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],

  [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 5, 5, 5, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 3],
  [0, 0, 0, 0, 2, 3, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0],
  [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 2, 3, 0, 0, 0],

  [0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2],
  [0, 0, 5, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 2],
  [0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 2, 2, 2, 0, 0, 5],
  [0, 0, 0, 0, 2, 3, 2, 0, 0, 0, 5, 5, 0, 0, 0, 2, 3, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 0, 2],
  
  [0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0],
  [0, 0, 0, 0, 4, 0, 0, 0, 0, 5, 0, 0, 0, 3, 3, 0, 0, 0, 0, 5, 0, 0],
  [0, 0, 0, 0, 0, 5, 0, 0, 2, 2, 0, 0, 0, 0, 5, 5, 0, 0, 0, 4, 0, 0],
  [0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 4, 1],
  [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 2, 0, 0]
];

var DEBUG_XPOS;
var DEBUG_YPOS;

var STARTED_DEBUG_XPOS = 8;
var STARTED_DEBUG_YPOS = 8;

/*================================================================ UTIL
*/

function rand(num) {
  return Math.floor(Math.random() * num)
};

/*================================================================ LOAD
*/

Game.Load = function(game) {};
Game.Load.prototype = {
  preload: function() {
    game.stage.backgroundColor = '#9b59b6';
    label1 = game.add.text(Math.floor(w / 2), Math.floor(h / 2) - 20, 'Box Jump', {
      font: '30px Arial',
      fill: '#fff'
    });
    label2 = game.add.text(Math.floor(w / 2) + 0.5, Math.floor(h / 2) + 20 + 0.5, 'loading...', {
      font: '16px Arial',
      fill: '#fff'
    });
    label1.anchor.setTo(0.5, 0.5);
    label2.anchor.setTo(0.5, 0.5);
    
    game.load.image('player', 'images/player.png');
    game.load.image('line', 'images/line.png');
    game.load.image('cube', 'images/cube.png');
    game.load.image('pixel', 'images/pixel.png');
    game.load.audio('hit', 'sounds/hit.wav');
    game.load.audio('jump', 'sounds/jump.wav');
    game.load.audio('music', 'sounds/music.wav');
  },
  create: function() {
    game.state.start('Play');
  }
};

/*================================================================ PLAY
*/

Game.Play = function(game) {};
Game.Play.prototype = {
  render: function() {
    this.updateDebug();
  },
  resize: function() {
    console.log('resize');
  },
  shutdown: function() {
    console.log('shutdown');
  },
  updateDebug: function() {
    DEBUG_XPOS = STARTED_DEBUG_XPOS;
    DEBUG_YPOS = STARTED_DEBUG_YPOS;

    // this.game.debug.spriteInfo(this.player, 32, 32);
    this.game.debug.bodyInfo(this.player, 32, 32);
    this.game.debug.body(this.player);
  },
  echoDebug: function(txt, val) {
    this.game.debug.text(txt + ': ' + val, DEBUG_XPOS, DEBUG_YPOS += 20);
  },
  create: function() {
    // player
    this.player = this.game.add.sprite(80, h * 2 / 3 - 20, 'player');
    this.game.physics.arcade.enable(this.player);
    this.player.body.bounce.y = 0;
    this.player.body.gravity.y = 10000;
    this.player.anchor.setTo(0.5, 0.5);

    // cube
    this.cubes = game.add.group();
    this.cubes.createMultiple(20, 'cube');

    // line
    this.line = this.game.add.sprite(w / 2, Math.floor(h * 2 / 3), 'line');
    this.line.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enableBody(this.line);
    this.line.body.immovable = true;

    // sound
    this.hitSound = game.add.audio('hit');
    this.jumpSound = game.add.audio('jump');

    // death label
    this.labelDeath = game.add.text(100, h - 35, '0', {
      font: '18px Arial',
      fill: '#fff',
      align: 'center'
    });
    this.labelDeath.anchor.setTo(0.5, 0.5);

    // level label
    this.labelLevel = game.add.text(w - 100 + 0.5, h - 35, '1/' + map.length, {
      font: '18px Arial',
      fill: '#fff',
      align: 'center'
    });
    this.labelLevel.anchor.setTo(0.5, 0.5);

    // intro label
    this.labelTuto = game.add.text(Math.floor(w / 2) + 0.5, h - 35 + 0.5, 'press space to jump', {
      font: '18px Arial',
      fill: '#fff',
      align: 'center'
    });
    this.labelTuto.anchor.setTo(0.5, 0.5);

    // input
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // var
    this.level = 0;
    this.isStarted = false

    // emitter
    this.emitter = game.add.emitter(0, 0, 200);
    this.emitter.makeParticles('pixel');
    this.emitter.gravity = 0;
    this.emitter.minParticleSpeed.setTo(-200, -200);
    this.emitter.maxParticleSpeed.setTo(200, 200);

    // load level
    this.loadLevel();
  },
  update: function() {
    game.physics.arcade.collide(this.player, this.line);

    // on the ground && press space
    if (this.spaceKey.isDown && this.player.body.touching.down) {
      this.playerJump();

      if (!this.isStarted) {
        this.isStarted = true
        this.player.body.velocity.x = 170;
        game.add.audio('music').play('', 0, 0.1, true);
      }
    }
    if (this.player.body.touching.down && this.isStarted) {
      this.player.alive = true;
      this.player.body.velocity.x = 170;
    }

    if (this.player.x >= w - 60)
      this.loadLevel();
    this.emitter.forEachAlive(function(particle) {
      particle.alpha = game.math.clamp(particle.lifespan / 100, 0, 1);
    }, this);

    this.player.body.gravity.y = 800;

    if (this.player.y > this.line.y) {
      this.initPlayer();
    }

    game.physics.arcade.overlap(this.player, this.cubes, this.playerHit, null, this);
  },
  playerJump: function() {
    this.player.body.velocity.y = -250;

    this.jumpSound.play('', 0, 0.1);

    // spin the player
    this.rotation = this.game.add.tween(this.player).to({
      angle: this.player.angle + 180
    }, 700, Phaser.Easing.Linear.None);
    this.rotation.start();
  },
  playerHit: function(player, hit) {
    if (this.player.alive) {
      this.hitSound.play('', 0, 0.2);

      this.player.alive = false;
      DEATH += 1;

      this.emitter.x = player.x + player.width / 2;
      this.emitter.y = player.y + player.height / 2;
      this.emitter.start(true, 300, null, 8);
      
      this.labelDeath.setText(DEATH);
      this.initPlayer();
    }
  },
  loadLevel: function() {
    if (map.length == this.level) {
      game.state.start('End');

    } else {
      this.drawLevel(map[this.level]);
      this.level++;
      this.labelLevel.setText(this.level + '/' + map.length);
      this.initPlayer();

      if (this.level == 2) {
        this.labelTuto.setText('');
      }
    }
  },
  initPlayer: function() {
    this.player.body.gravity.y = 0;
    this.player.x = 60;
    this.player.y = h * 2 / 3 - this.player.height / 2 - 30;
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    this.player.angle = 0;

    if (this.rotation) {
      this.rotation.pause();
    }
  },
  drawLevel: function(map) {
    this.cubes.forEachAlive(function(cube) {
      cube.kill();
    });

    var cube;
    var height;
    for (var i = 0; i < map.length; i++) {
      cube = this.cubes.getFirstExists(false);
      this.game.physics.arcade.enable(cube);

      if (map[i] == 1) {
        cube.reset(100 + i * cube.width, h * 2 / 3);
        height = 0.3;

      } else if (map[i] == 2) {
        cube.reset(100 + i * cube.width, h * 2 / 3);
        height = 1;

      } else if (map[i] == 3) {
        cube.reset(100 + i * cube.width, h * 2 / 3);
        height = 1.5;

      } else if (map[i] == 4) {
        cube.reset(100 + i * cube.width, h * 2 / 3);
        height = 1.8;

      } else if (map[i] == 5) {
        cube.reset(100 + i * cube.width, h * 2 / 3 - 22);
        height = 0.5;
      }

      if (map[i] != 0) {
        cube.scale.y = 0;
        cube.anchor.setTo(0, 1);

        // animate when init cube
        this.game.add.tween(cube.scale).to({
          y: height
        }, 300 * height, Phaser.Easing.Linear.None).start();
      }
    }
  }
};

/*================================================================ END
*/

Game.End = function(game) {};
Game.End.prototype = {
  create: function() {
    // first label
    label1 = game.add.text(w / 2, h / 2 - 20, 'you finished the game! :-D', {
      font: '30px Arial',
      fill: '#fff'
    });
    label1.anchor.setTo(0.5, 0.5);

    // second label
    label2 = game.add.text(w / 2, h / 2 + 20, 'and died ' + DEATH + ' times\ncan you do better?', {
      font: '20px Arial',
      fill: '#fff'
    });
    label2.anchor.setTo(0.5, 0.5);
  }
};

var game = new Phaser.Game(w, h, Phaser.AUTO, 'game-box');
game.state.add('Load', Game.Load);
game.state.add('Play', Game.Play);
game.state.add('End', Game.End);
game.state.start('Load');
