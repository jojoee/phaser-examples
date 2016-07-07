Game = {};
var w = 500;
var h = 350;

function rand(num) {
  return Math.floor(Math.random() * num)
};
Game.Boot = function(game) {};
Game.Boot.prototype = {
  preload: function() {
    game.load.image('loading', 'images/loading.png');
  },
  create: function() {
    this.game.stage.scale.minWidth = 600;
    this.game.stage.scale.minHeight = 420;
    this.game.stage.scale.setSize();
    this.game.state.start('Load');
  }
};
Game.Load = function(game) {};
Game.Load.prototype = {
  preload: function() {
    game.stage.backgroundColor = '#1bb7ff';
    label2 = game.add.text(Math.floor(w / 2) + 0.5, Math.floor(h / 2) - 15 + 0.5, 'loading...', {
      font: '30px Arial',
      fill: '#fff'
    });
    label2.anchor.setTo(0.5, 0.5);
    preloading = game.add.sprite(w / 2, h / 2 + 15, 'loading');
    preloading.x -= preloading.width / 2;
    game.load.setPreloadSprite(preloading);
    game.load.image('brick', 'images/brick.png');
    game.load.image('bg', 'images/bg.png');
    game.load.spritesheet('player', 'images/player.png', 27, 33);
    game.load.spritesheet('enemy', 'images/enemy.png', 18, 27);
    game.load.image('coin', 'images/coin.png');
    game.load.audio('jump', 'sounds/jump.wav');
    game.load.audio('kill', 'sounds/kill.wav');
    game.load.audio('dead', 'sounds/dead.wav');
    game.load.audio('coin', 'sounds/coin.wav');
    game.load.audio('music', 'sounds/music.wav');
  },
  create: function() {
    game.state.start('Menu');
  }
};
Game.Menu = function(game) {};
Game.Menu.prototype = {
  create: function() {
    this.cursor = this.game.input.keyboard.createCursorKeys();
    game.add.sprite(0, 0, 'bg');
    label = game.add.text(w / 2, h - 50, 'press the UP arrow key to start', {
      font: '25px Arial',
      fill: '#fff'
    });
    label.anchor.setTo(0.5, 0.5);
    game.add.tween(label).to({
        angle: 1
      }, 1000, Phaser.Easing.Linear.None)
      .to({
        angle: -2
      }, 1000, Phaser.Easing.Linear.None).loop().start();
  },
  update: function() {
    if (this.cursor.up.isDown)
      game.state.start('Play');
  }
};
Game.Play = function(game) {};
Game.Play.prototype = {
  create: function() {
    game.world.setBounds(-50, -50, 800, 800);
    this.cursor = this.game.input.keyboard.createCursorKeys();
    this.player = this.game.add.sprite(w / 2, h / 2, 'player');
    this.player.body.bounce.y = 0;
    this.player.body.gravity.y = 12;
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('walk', [1, 2], 6, true);
    this.playerJumpCount = 1;
    this.enemies = game.add.group();
    this.enemies.createMultiple(40, 'enemy');
    this.enemies.setAll('outOfBoundsKill', true);
    this.enemyTime = 0;
    this.coin = this.game.add.sprite(150, h / 2, 'coin');
    this.coin.body.gravity.y = 10;
    this.coin.body.bounce.y = 0.3;
    this.coin.anchor.setTo(0.5, 0.5);
    this.labelScore = game.add.text(30, 30, 'score: 0', {
      font: '16px Arial',
      fill: '#fff'
    });
    this.labelBestScore = game.add.text(30, 50, 'best: 0', {
      font: '16px Arial',
      fill: '#fff'
    });
    this.labelTutorial = game.add.text(w / 2 + 0.5, h / 2 - 20 + 0.5, '1- arrow keys to move\n2- take coins for score\n3- jump on penguins to kill', {
      font: '18px Arial',
      fill: '#fff'
    });
    this.labelTutorial.anchor.setTo(0.5, 0.5);
    this.score = 0;
    this.bestScore = 0;
    this.oneCoin = false;
    this.oneKill = false;
    this.jumped = false;
    this.kill_s = game.add.audio('kill');
    this.jump_s = game.add.audio('jump');
    this.coin_s = game.add.audio('coin');
    this.dead_s = game.add.audio('dead');
    this.coinPosition = [];
    this.coinPosition[0] = [
      [150, h / 2],
      [w - 150, h / 2],
      [50, h - 100],
      [w - 50, h - 100]
    ];
    this.coinPosition[1] = this.coinPosition[0].concat([
      [60, 100],
      [w - 60, 100]
    ]);
    this.coinPosition[2] = this.coinPosition[1].concat([
      [130, 50],
      [w - 130, 50],
      [200, h - 60],
      [w - 200, h - 60]
    ]);
    this.coinX = 0;
    game.add.audio('music').play('', 0, 0.3, true);
    this.buildLevel();
    this.half = 1;
  },
  update: function() {
    game.physics.collide(this.player, this.platforms);
    game.physics.collide(this.player, this.walls);
    game.physics.collide(this.enemies, this.platforms);
    game.physics.collide(this.coin, this.platforms);
    game.physics.overlap(this.enemies, this.walls, this.enemyWall, null, this);
    game.physics.overlap(this.player, this.enemies, this.collide, null, this);
    game.physics.overlap(this.player, this.coin, this.takeCoin, null, this);
    this.player.body.velocity.x = 0;
    this.enemies.forEachAlive(this.updateEnemy, this);
    if (this.cursor.left.isDown && this.player.alive) {
      if (this.player.body.touching.down)
        this.player.body.velocity.x = -200;
      else
        this.player.body.velocity.x = -150;
      this.player.animations.play('walk');
      this.player.scale.setTo(-1, 1);
    } else if (this.cursor.right.isDown && this.player.alive) {
      if (this.player.body.touching.down)
        this.player.body.velocity.x = 200;
      else
        this.player.body.velocity.x = 150;
      this.player.animations.play('walk');
      this.player.scale.setTo(1, 1);
    } else {
      this.player.animations.stop();
      this.player.frame = 0;
    }
    if (this.cursor.up.isDown && this.player.body.touching.down) {
      this.jump_s.play('', 0, 0.08);
      this.playerJumpCount = 1;
      this.player.body.velocity.y = -200;
    } else if (this.cursor.up.isDown && this.playerJumpCount < 20 && this.playerJumpCount != 0) {
      this.playerJumpCount += 1;
      this.player.body.velocity.y = -200;
    } else
      this.playerJumpCount = 0;
    if (this.game.time.now > this.enemyTime) {
      this.enemyTime = game.time.now + 2000 + rand(500) - Math.min(this.score * 20, 1000);
      this.newEnemy();
    }
    if (this.player.y > h + this.player.height || this.player.y < 0 - this.player.height / 2)
      this.playerDie();
    if (this.oneCoin && this.oneKill && this.labelTutorial.alive) {
      this.labelTutorial.alive = false;
      game.add.tween(this.labelTutorial).to({
        alpha: 0
      }, 1000, Phaser.Easing.Linear.None).start();
    }
  },
  newEnemy: function() {
    var enemy = this.enemies.getFirstExists(false);
    if (enemy) {
      enemy.reset(w / 2, 0);
      enemy.scale.setTo(1, 1);
      enemy.anchor.setTo(0.5, 1);
      enemy.body.gravity.y = 5;
      enemy.body.velocity.x = 0;
      enemy.animations.add('walk', [0, 1], 3, true);
      if (this.half == 1) {
        enemy.scale.setTo(-1, 1);
        this.half = 0;
      } else
        this.half = 1;
    }
  },
  takeCoin: function(player, coin) {
    this.addScore(1);
    if (this.score <= 5) var i = 0;
    else if (this.score <= 10) var i = 1;
    else var i = 2;
    var tab = this.coinPosition[i];
    this.coin_s.play('', 0, 0.15);
    var ra = rand(tab.length);
    if (ra == this.coinX) ra = (ra + 1) % tab.length;
    this.coinX = ra;
    coin.reset(tab[ra][0], tab[ra][1]);
    this.oneCoin = true;
  },
  updateEnemy: function(enemy) {
    if (enemy.body.velocity.x == 0 && enemy.body.touching.down) {
      enemy.body.velocity.x = -70;
      enemy.animations.play('walk');
      if (enemy.scale.x == -1)
        enemy.body.velocity.x *= -1;
    }
    if (enemy.alive == true && enemy.y >= h + enemy.height / 2) {
      enemy.alive = false;
      this.newEnemy();
    }
  },
  enemyWall: function(enemy, wall) {
    enemy.body.velocity.x *= -1;
    if (enemy.x < h / 2) {
      enemy.scale.setTo(-1, 1);
      enemy.x = 50 + enemy.width / 2 + 1;
    } else {
      enemy.scale.setTo(1, 1);
      enemy.x = w - 20 - enemy.width / 2 - 1;
    }
  },
  collide: function(player, enemy) {
    if (!player.body.touching.down && player.bottomRight.y < enemy.topRight.y + 10 && enemy.alive && player.alive) {
      player.body.velocity.y = -150;
      this.enemyDie(enemy, false);
      this.playerJumpCount = 5;
    } else //if (player.x+player.width/2-5 >= enemy.x-enemy.width/2 || player.x-player.width/2+5 <= enemy.x+enemy.width/2)
      this.playerDie();
  },
  enemyDie: function(enemy, killall) {
    var tmp = game.add.tween(enemy.scale).to({
      y: 0
    }, 150, Phaser.Easing.Linear.None).start();
    tmp.onCompleteCallback(function() {
      enemy.kill();
    });
    enemy.alive = false;
    if (!killall) {
      this.kill_s.play('', 0, 0.15);
      this.shakeScreen(2, 80);
      this.oneKill = true;
    }
  },
  playerDie: function() {
    if (this.player.alive) {
      this.dead_s.play('', 0, 0.1);
      this.player.alive = false;
      var tmp = game.add.tween(this.player).to({
        y: h + 10
      }, 500, Phaser.Easing.Linear.None).start();
      game.add.tween(this.player).to({
        angle: 360
      }, 500, Phaser.Easing.Linear.None).start();
      tmp.onComplete.add(this.playerInit, this);
      this.updateBestScore();
      this.enemies.forEachAlive(function(e) {
        this.enemyDie(e, true)
      }, this);
      this.shakeScreen(10, 100);
    }
  },
  playerInit: function() {
    this.player.x = w / 2;
    this.player.y = h / 2;
    this.player.alive = true;
  },
  addScore: function(i) {
    this.score += i;
    this.labelScore.content = 'score: ' + this.score;
  },
  shakeScreen: function(i, t) {
    this.game.add.tween(this.game.camera).to({
        y: i
      }, t, Phaser.Easing.Linear.None)
      .to({
        y: -i
      }, t, Phaser.Easing.Linear.None)
      .to({
        y: 0
      }, t, Phaser.Easing.Linear.None).start();
    this.game.add.tween(this.game.camera).to({
        x: i
      }, t, Phaser.Easing.Linear.None)
      .to({
        x: -i
      }, t, Phaser.Easing.Linear.None)
      .to({
        x: 0
      }, t, Phaser.Easing.Linear.None).start();
  },
  updateBestScore: function() {
    if (this.bestScore < this.score) {
      this.bestScore = this.score;
      this.labelBestScore.content = 'best: ' + this.bestScore;
      this.labelBestScore.scale.setTo(2, 2);
      this.game.add.tween(this.labelBestScore.scale).to({
        x: 1,
        y: 1
      }, 300, Phaser.Easing.Linear.None).start();
    }
    this.score = 0;
    this.labelScore.content = 'score: ' + this.score;
  },
  buildLevel: function() {
    this.platforms = game.add.group();
    this.walls = game.add.group();
    var bottom1 = this.platforms.create(0, h, 'brick');
    bottom1.anchor.setTo(0, 1);
    bottom1.scale.setTo(11, 1);
    var bottom1bis = this.platforms.create(0, h - 20, 'brick');
    bottom1bis.anchor.setTo(0, 1);
    bottom1bis.scale.setTo(4, 1);
    var bottom2 = this.platforms.create(w / 2 + 30, h, 'brick');
    bottom2.anchor.setTo(0, 1);
    bottom2.scale.setTo(11, 1);
    var bottom2bis = this.platforms.create(w / 2 + 170, h - 20, 'brick');
    bottom2bis.anchor.setTo(0, 1);
    bottom2bis.scale.setTo(4, 1);
    var top1 = this.platforms.create(0, 0, 'brick');
    top1.anchor.setTo(0, 0);
    top1.scale.setTo(9, 1);
    var top2 = this.platforms.create(w / 2 + 60, 0, 'brick');
    top2.anchor.setTo(0, 0);
    top2.scale.setTo(9, 1);
    var left = this.walls.create(0, 0, 'brick');
    left.anchor.setTo(0, 0);
    left.scale.setTo(1, 17.5);
    var right = this.walls.create(w, 0, 'brick');
    right.anchor.setTo(1, 0);
    right.scale.setTo(1, 17.5);
    var middle1 = this.platforms.create(w / 2, h * 1 / 4 + 10, 'brick');
    middle1.anchor.setTo(0.5, 0.5);
    middle1.scale.setTo(14, 1);
    var middle2 = this.platforms.create(w / 2, h * 3 / 4 - 10, 'brick');
    middle2.anchor.setTo(0.5, 0.5);
    middle2.scale.setTo(14, 1);
    var middle3 = this.platforms.create(0, h / 2, 'brick');
    middle3.anchor.setTo(0, 0.5);
    middle3.scale.setTo(5, 1);
    var middle4 = this.platforms.create(w / 2 + 150, h / 2, 'brick');
    middle4.anchor.setTo(0, 0.5);
    middle4.scale.setTo(5, 1);
    this.platforms.setAll('body.immovable', true);
    this.walls.setAll('body.immovable', true);
  }
};
var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameContainer');
game.state.add('Boot', Game.Boot);
game.state.add('Load', Game.Load);
game.state.add('Menu', Game.Menu);
game.state.add('Play', Game.Play);
game.state.start('Boot');