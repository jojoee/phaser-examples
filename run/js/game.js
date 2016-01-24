var game = new Phaser.Game(w, h, Phaser.AUTO, 'game-canvas');
Game = {};
var w = 800;
var h = 600;
var score = 0;

var DEBUG_XPOS;
var DEBUG_YPOS;
var DEBUG_Y_STEP = 20;
var STARTED_DEBUG_XPOS = 8;
var STARTED_DEBUG_YPOS = 40;

/*================================================================ UTIL
*/

function rand(num) {
  return Math.floor(Math.random() * num)
};

// http://stackoverflow.com/questions/4959975/generate-random-value-between-two-numbers-in-javascript
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*================================================================ LOAD
*/

Game.Load = function(game) {};
Game.Load.prototype = {
  preload: function() {
    game.stage.backgroundColor = '#34495e';
    label = game.add.text(w / 2, h / 2, 'loading...', {
      font: '30px Arial',
      fill: '#fff'
    });
    label.anchor.setTo(0.5, 0.5);

    game.load.spritesheet('player', 'assets/player.png', 20, 24);
    game.load.spritesheet('enemy1', 'assets/enemy1.png', 32, 36);
    game.load.spritesheet('enemy2', 'assets/enemy2.png', 28, 40);
    game.load.audio('hit', 'assets/hit.wav');
  },
  create: function() {
    game.state.start('Play');
  }
};

/*================================================================ OVER
*/

Game.Over = function(game) {};
Game.Over.prototype = {
  create: function() {
    label = game.add.text(w / 2, h / 2, 'game over\n\nscore: ' + score + '\n\npress the UP arrow key\nto restart', {
      font: '30px Arial',
      fill: '#fff',
      align: 'center'
    });
    label.anchor.setTo(0.5, 0.5);

    this.cursor = game.input.keyboard.createCursorKeys();
    this.time = this.game.time.now + 800;
    game.add.audio('hit').play('', 0, 0.1);
  },
  update: function() {
    if (this.game.time.now > this.time && this.cursor.up.isDown) {
      game.state.start('Play');
    }   
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
    // resize
  },
  shutdown: function() {
    // shutdown
  },
  updateDebug: function() {
    DEBUG_XPOS = STARTED_DEBUG_XPOS;
    DEBUG_YPOS = STARTED_DEBUG_YPOS;

    this.echoDebug('enemies1 living', this.enemies1.countLiving());
    this.echoDebug('enemies1 dead', this.enemies1.countDead());
    this.echoDebug('enemies2 living', this.enemies2.countLiving());
    this.echoDebug('enemies2 dead', this.enemies2.countDead());

    this.game.debug.spriteInfo(this.player, DEBUG_XPOS, 160);
  },
  echoDebug: function(txt, val) {
    game.debug.text(txt + ': ' + val, DEBUG_XPOS, DEBUG_YPOS += DEBUG_Y_STEP);
  },
  create: function() {
    this.cursor = game.input.keyboard.createCursorKeys();

    this.player = game.add.sprite(w / 2, h / 2, 'player');
    this.player.animations.add('bottom', [0, 1], 10, true);
    this.player.animations.add('top', [4, 5], 10, true);
    this.player.animations.add('right', [2, 3], 10, true);
    this.player.animations.add('left', [6, 7], 10, true);
    this.physics.arcade.enableBody(this.player);
    this.player.body.collideWorldBounds = true;

    this.enemies1 = game.add.group();
    this.spawnEnemy1();

    this.enemies2 = game.add.group();
    this.spawnEnemy2();

    this.labelScore = game.add.text(15, 10, 'score: 0', {
      font: '20px Arial',
      fill: '#fff'
    });

    this.labelKeys = game.add.text(Math.floor(w / 2) + 1, h - 50, 'use the arrow keys to move', {
      font: '20px Arial',
      fill: '#fff'
    });
    this.labelKeys.anchor.setTo(0.5, 1);

    this.hit_s = game.add.audio('hit');
    this.enemyTime = 0;
    this.scoreTime = 0;
    score = 0;
    this.firstKey = false;
  },
  update: function() {
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (this.cursor.up.isDown && !this.firstKey) {
      this.firstKey = true;
      this.game.add.tween(this.labelKeys).to({alpha: 0}, 800, Phaser.Easing.Linear.None).start();
    }

    if (this.cursor.left.isDown) {
      this.player.body.velocity.x = -300;
      this.player.animations.play('left');

    } else if (this.cursor.right.isDown) {
      this.player.body.velocity.x = 300;
      this.player.animations.play('right');

    } else if (this.cursor.up.isDown) {
      this.player.body.velocity.y = -300;
      this.player.animations.play('top');

    } else if (this.cursor.down.isDown) {
      this.player.body.velocity.y = 300;
      this.player.animations.play('bottom');

    } else {
      this.player.animations.stop();
    }
      
    if (this.game.time.now > this.enemyTime) {
      this.spawnEnemy();
    }

    var mnumber = 200;
    this.enemies1.forEachAlive(function(enemy) {
      if (enemy.x >= 0 - mnumber &&
        enemy.x <= w + mnumber &&
        enemy.y >= 0 - mnumber &&
        enemy.y <= h + mnumber) {
      } else {
        enemy.kill();
      }
    });

    this.enemies2.forEachAlive(function(enemy) {
      if (enemy.x >= 0 - mnumber &&
        enemy.x <= w + mnumber &&
        enemy.y >= 0 - mnumber &&
        enemy.y <= h + mnumber) {
      } else {
        enemy.kill();
      }
    });

    if (this.game.time.now > this.scoreTime) {
      this.scoreTime = game.time.now + 1000;
      score += 1;
      this.labelScore.content = 'score: ' + score;
    }

    this.physics.arcade.overlap(this.player, this.enemies1, this.playerHit, null, this);
    this.physics.arcade.overlap(this.player, this.enemies2, this.playerHit, null, this);
  },
  newEnemy: function() {
    this.enemyTime = game.time.now + 500;
    if (rand(2) == 1) {
      var enemy = this.enemies1.getFirstExists(false);
    } else {
      var enemy = this.enemies2.getFirstExists(false);
    }

    enemy.anchor.setTo(0.5, 0.5);
    var randu = rand(4);
    if (randu == 0) {
      x = rand(w);
      y = -enemy.height / 2 + 2;
      tox = rand(w);
      toy = h + enemy.height;
    } else if (randu == 1) {
      x = rand(w);
      y = h + enemy.height / 2 - 2;
      tox = rand(w);
      toy = -enemy.height;
    } else if (randu == 2) {
      x = -enemy.width / 2 + 2;
      y = rand(h);
      tox = w + enemy.width;
      toy = rand(h);
    } else if (randu == 3) {
      x = w + enemy.width / 2 - 2;
      y = rand(h);
      tox = -enemy.width;
      toy = rand(h);
    }


    enemy.reset(x, y);
    enemy.angle = 90 + Math.atan2(y - toy, x - tox) * 180 / Math.PI;

    console.log(enemy.angle);


    this.game.add.tween(enemy).to({
      x: tox,
      y: toy
    }, 3000, Phaser.Easing.Linear.None).start();
    enemy.animations.add('move');
    enemy.animations.play('move', 5, true);
  },
  spawnEnemy: function(type) {
    this.enemyTime = game.time.now + 500;
    var enemy;
    var bnumber = 30; // half of enemy
    var mnumber = 460;

    var randu = rand(4);
    if (randu == 0) {
      // top
      x = rand(w);
      y = 0 - bnumber;
      toX = rand(w);
      toY = getRandomInt(h / 2, h) + mnumber;

    } else if (randu == 1) {
      // bottom
      x = rand(w);
      y = h + bnumber;
      toX = rand(w);
      toY = getRandomInt(0, h / 2) - mnumber;

    } else if (randu == 2) {
      // left
      x = 0 - bnumber;
      y = rand(h);
      toX = getRandomInt(w / 2, w) + mnumber;
      toY = rand(h);

    } else if (randu == 3) {
      // right
      x = w + bnumber;
      y = rand(h);
      toX = getRandomInt(0, w / 2) - mnumber;
      toY = rand(h);
    }

    var enemyType = (type) ? type : getRandomInt(1, 2);
    enemy = (enemyType === 1) ? this.enemies1.create(x, y, 'enemy1' ) : this.enemies2.create(x, y, 'enemy2' );
    enemy.angle = 90 + Math.atan2(y - toY, x - toX) * 180 / Math.PI;
    this.game.add.tween(enemy).to({
      x: toX,
      y: toY
    }, 3000, Phaser.Easing.Linear.None).start();
    this.physics.arcade.enableBody(enemy);
    enemy.animations.add('move');
    enemy.animations.play('move', 5, true);
    
  },
  spawnEnemy1: function() {
    this.spawnEnemy(1);
  },
  spawnEnemy2: function() {
    this.spawnEnemy(2);
  },
  playerHit: function(player, enemy) {
    game.state.start('Over');
  }
};
game.state.add('Load', Game.Load);
game.state.add('Play', Game.Play);
game.state.add('Over', Game.Over)
game.state.start('Load');