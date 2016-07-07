Game = {};
var W;
var H;
var SCORE = 0;

// W = 300;
// H = 500;

W = 800;
H = 600;

/*================================================================ UTIL
*/

function rand(num) {
  return Math.floor(Math.random() * num)
};

/*================================================================ LOAD
*/

Game.Load = function(game) {
};
Game.Load.prototype = {
  preload: function() {
    // bg image
    game.stage.backgroundColor = '#2980b9';

    // label
    label = game.add.text(
      W / 2,
      H / 2,
      'loading...',
      {
        font: '30px Arial',
        fill: '#fff'
      }
    );
    label.anchor.setTo(0.5, 0.5);

    // load all assets
    game.load.image('bg', 'images/bg.png');
    game.load.image('player', 'images/player.png');
    game.load.image('fire', 'images/fire.png');
    game.load.image('bonus', 'images/bonus.png');
    game.load.image('pixel', 'images/pixel.png');
    game.load.spritesheet('bullet', 'images/bullet.png', 16, 32);
    game.load.image('enemy', 'images/enemy.png');
    game.load.audio('hit', 'sounds/hit.wav');
    game.load.audio('fire', 'sounds/fire.wav');
    game.load.audio('exp', 'sounds/exp.wav');
    game.load.audio('dead', 'sounds/dead.wav');
    game.load.audio('bonus', 'sounds/bonus.wav');
  },
  create: function() {
    game.state.start('Intro');
  }
};

/*================================================================ INTRO
*/

Game.Intro = function(game) {};
Game.Intro.prototype = {
  create: function() {
    // bg
    game.add.sprite(0, 0, 'bg');

    // set arrow keys
    this.cursor = game.input.keyboard.createCursorKeys();
  },
  update: function() {
    if (this.cursor.up.isDown) {
      game.state.start('Play');
    }
  }
};

/*================================================================ PLAY
*/

var DEBUG_XPOS;
var DEBUG_YPOS;
var DEBUG_Y_STEP = 20;
var STARTED_DEBUG_XPOS = 8;
var STARTED_DEBUG_YPOS = 40;

function echoDebug(txt, val) {
  game.debug.text(txt + ': ' + val, DEBUG_XPOS, DEBUG_YPOS+=20);
}

var M_NUMBER = 80;

Game.Play = function(game) {};
Game.Play.prototype = {
  create: function() {
    // var
    this.fireTime = 0;
    this.bonusTime = 0;
    this.enemyTime = 0;
    this.bulletTime = 0;
    this.lives = 3;
    this.evolution = 1;
    this.playerY = H - 70;
    SCORE = 0;

    // max number of items on screen
    this.maxNEnemy = 30;
    this.maxNFire = 25;
    this.maxNBonus = 3;
    this.maxNBullet = 25;

    // set arrow keys
    this.cursor = game.input.keyboard.createCursorKeys();

    // enemy group
    this.enemies = game.add.group();
    this.enemies.createMultiple(this.maxNEnemy, 'enemy');
    this.enemies.setAll('outOfBoundsKill', true);

    // fire
    this.fires = game.add.group();
    this.fires.createMultiple(this.maxNFire, 'fire');
    this.fires.setAll('outOfBoundsKill', true);

    // bonus
    this.bonuses = game.add.group();
    this.bonuses.createMultiple(this.maxNBonus, 'bonus');
    this.bonuses.setAll('outOfBoundsKill', true);

    // bullet
    this.bullets = game.add.group();
    this.bullets.createMultiple(this.maxNBullet, 'bullet');
    this.bullets.setAll('outOfBoundsKill', true);

    // player
    this.player = game.add.sprite(W / 2, this.playerY, 'player');
    game.physics.arcade.enableBody(this.player);
    this.player.body.collideWorldBounds = true;

    // sound
    this.hitSound = game.add.audio('hit');
    this.fireSound = game.add.audio('fire');
    this.expSound = game.add.audio('exp');
    this.bonusSound = game.add.audio('bonus');

    // emitter
    this.emitter = game.add.emitter(0, 0, 200);
    this.emitter.makeParticles('pixel');
    this.emitter.gravity = 0;

    // live text
    this.livesText = game.add.text(
      W - 25,
      10,
      this.lives,
      {
        font: '30px Arial',
        fill: '#fff'
      }
    );

    // score text
    this.scoreText = game.add.text(
      10,
      10,
      "0",
      {
        font: '30px Arial',
        fill: '#fff'
      }
    );
  },
  render: function() {
    this.updateDebug();
  },
  updateDebug: function() {
    DEBUG_XPOS = STARTED_DEBUG_XPOS;
    DEBUG_YPOS = STARTED_DEBUG_YPOS;

    echoDebug('enemies living', this.enemies.countLiving());
    echoDebug('enemies dead', this.enemies.countDead());

    echoDebug('fires living', this.fires.countLiving());
    echoDebug('fires dead', this.fires.countDead());

    echoDebug('bonuses living', this.bonuses.countLiving());
    echoDebug('bonuses dead', this.bonuses.countDead());

    echoDebug('bullets living', this.bullets.countLiving());
    echoDebug('bullets dead', this.bullets.countDead());
  },
  summonEnemy: function() {
    var enemy = this.enemies.getFirstExists(false);

    if (enemy) {
      game.physics.arcade.enableBody(enemy);
      enemy.reset(rand(W / enemy.width - 1) * enemy.width + 7, -enemy.height);
      enemy.body.velocity.y = 300;

      this.enemyTime = game.time.now + 250;
    }
  },
  killEnemy: function() {
    this.enemies.forEachAlive(function(enemy) {
      if (enemy.y >= H + M_NUMBER) {
        enemy.kill();
      }
    });
  },
  summonBullet: function() {
    var bullet = this.bullets.getFirstExists(false);

    if (bullet) {
      game.physics.arcade.enableBody(bullet);
      bullet.reset(rand(W - bullet.width), -bullet.height);
      bullet.body.velocity.y = 350;

      bullet.animations.add('move');
      bullet.animations.play('move', 4, true);

      this.bulletTime = game.time.now + 1000 - SCORE / 2;
    }
  },
  killBullet: function() {
    this.bullets.forEachAlive(function(bullet) {
      if (bullet.y >= H + M_NUMBER) {
        bullet.kill();
      }
    });
  },
  summonBonus: function() {
    var bonus = this.bonuses.getFirstExists(false);

    if (bonus) {
      bonus.reset(rand(W - bonus.width) + bonus.width / 2, -bonus.height / 2);
      game.physics.arcade.enableBody(bonus);
      bonus.body.velocity.y = 150;
      bonus.anchor.setTo(0.5, 0.5);
      this.game.add.tween(bonus).to({ angle: 360 }, 3500, Phaser.Easing.Linear.None).start();

      this.bonusTime = game.time.now + 5000;
    }
  },
  killBonus: function() {
    this.bonuses.forEachAlive(function(bonus) {
      if (bonus.y >= H + M_NUMBER) {
        bonus.kill();
      }
    });
  },
  killFire: function() {
    this.fires.forEachAlive(function(fire) {
      if (fire.y <= -M_NUMBER) {
        fire.kill();
      }
    });
  },
  update: function() {
    this.player.body.velocity.x = 0;

    // move
    if (this.cursor.left.isDown) {
      this.player.body.velocity.x = -350;

    } else if (this.cursor.right.isDown) {
      this.player.body.velocity.x = 350;
    }

    // fire
    if (this.cursor.up.isDown) {
      this.fire();
    }

    // summon enemy
    if (this.game.time.now > this.enemyTime) {
      this.summonEnemy();
    }

    // summon bullet
    if (this.game.time.now > this.bulletTime) {
      this.summonBullet();
    }

    // summon bonus
    if (this.game.time.now > this.bonusTime) {
      this.summonBonus(); 
    }

    this.killFire();
    this.killEnemy();
    this.killBullet();
    this.killBonus();

    // set overlap
    game.physics.arcade.overlap(this.player, this.enemies, this.playerHit, null, this);
    game.physics.arcade.overlap(this.fires, this.enemies, this.enemyHit, null, this);
    game.physics.arcade.overlap(this.player, this.bonuses, this.takeBonus, null, this);
  },
  playerHit: function(player, enemy) {
    // kill enemy
    enemy.kill();

    // play hit sound
    this.hitSound.play('', 0, 0.2);

    // set live
    this.lives -= 1;
    this.livesText.setText(this.lives);
    if (this.lives == 0) {
      this.clear();
      game.state.start('Over');
    }
    
    // set bullet
    this.evolution = 1;
    
    // play player animate (backstep)
    game.add.tween(player)
      .to({ y: this.playerY + 20 }, 100, Phaser.Easing.Linear.None)
      .to({ y: this.playerY }, 100, Phaser.Easing.Linear.None).start();
  },
  takeBonus: function(player, bonus) {
    // kill bonus
    bonus.kill();

    // play sound
    this.bonusSound.play('', 0, 0.1);
    
    // set bullet
    this.evolution += 1;

    // update score
    this.updateScore(100);
  },
  enemyHit: function(fire, enemy) {
    // kill bullet
    fire.kill();

    // kill enemy
    enemy.kill();

    // play sound
    this.expSound.play('', 0, 0.1);

    // set emiiter position and play
    this.emitter.x = enemy.x + enemy.width / 2;
    this.emitter.y = enemy.y + enemy.height / 2;
    this.emitter.start(true, 300, null, 10);

    // update score
    this.updateScore(10);
  },
  fire: function() {
    // check fire's delay
    if (this.game.time.now > this.fireTime) {
      this.fireTime = game.time.now + 300;
      this.fireSound.play('', 0, 0.1);

      if (this.evolution == 1) {
        this.oneFire(this.player.x + this.player.width / 2, this.player.y);

      } else if (this.evolution == 2) {
        this.oneFire(this.player.x + this.player.width * 1 / 4, this.player.y);
        this.oneFire(this.player.x + this.player.width * 3 / 4, this.player.y);

      } else {
        this.oneFire(this.player.x, this.player.y);
        this.oneFire(this.player.x + this.player.width / 2, this.player.y);
        this.oneFire(this.player.x + this.player.width, this.player.y);
      }

      // animate player
      this.game.add.tween(this.player)
        .to({ y: this.playerY + 5 }, 50, Phaser.Easing.Linear.None)
        .to({ y: this.playerY }, 50, Phaser.Easing.Linear.None).start();
    }
  },
  oneFire: function(x, y) {
    var fire = this.fires.getFirstExists(false);

    if (fire) {
      game.physics.arcade.enableBody(fire);
      fire.reset(x - fire.width / 2, y - fire.height);
      fire.body.velocity.y = -500;  
    }
  },
  updateScore: function(n) {
    SCORE += n;
    this.scoreText.setText(SCORE);
  },
  clear: function() {
    this.lives = 3;
    this.evolution = 1;
  }
};

/*================================================================ OVER
*/

Game.Over = function(game) {};
Game.Over.prototype = {
  create: function() {
    // play sound
    game.add.audio('dead').play('', 0, 0.2);

    // set text
    label = game.add.text(
      W / 2,
      H / 2,
      'game over\n\nscore: ' + SCORE + '\n\npress the UP arrow\nkey to restart',
      {
        font: '30px Arial',
        fill: '#fff',
        align: 'center'
      }
    );
    label.anchor.setTo(0.5, 0.5);

    // set delay time
    this.time = this.game.time.now + 800;

    // set arrow keys
    this.cursor = game.input.keyboard.createCursorKeys();
  },
  update: function() {
    if (this.game.time.now > this.time && this.cursor.up.isDown) {
      game.state.start('Play');
    }
  }
};

var game = new Phaser.Game(W, H, Phaser.AUTO, 'gameContainer');
game.state.add('Load', Game.Load);
game.state.add('Intro', Game.Intro);
game.state.add('Play', Game.Play);
game.state.add('Over', Game.Over);
game.state.start('Load');
