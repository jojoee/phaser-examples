Game = {};
var w = 500;
var h = 500;
var score = 0;
var best_score = 0;
var sound = 1;
var dead_s;

function rand(num) {
  return Math.floor(Math.random() * num)
};
Game.Boot = function(game) {};
Game.Boot.prototype = {
  preload: function() {
    game.stage.backgroundColor = '#fff';
    game.load.image('loading', 'images/loading.png');
    game.load.image('loading2', 'images/loading2.png');
  },
  create: function() {
    this.game.state.start('Load');
  }
};
Game.Load = function(game) {};
Game.Load.prototype = {
  preload: function() {
    label2 = game.add.text(Math.floor(w / 2) + 0.5, Math.floor(h / 2) - 15 + 0.5, 'loading...', {
      font: '30px Arial',
      fill: '#fff'
    });
    label2.anchor.setTo(0.5, 0.5);
    preloading2 = game.add.sprite(w / 2, h / 2 + 15, 'loading2');
    preloading2.x -= preloading2.width / 2;
    preloading = game.add.sprite(w / 2, h / 2 + 19, 'loading');
    preloading.x -= preloading.width / 2;
    game.load.setPreloadSprite(preloading);
    game.load.image('player', 'images/player.png');
    game.load.image('coin', 'images/coin.png');
    game.load.spritesheet('bg', 'images/bg.png', 350, 350);
    game.load.spritesheet('sound', 'images/sound.png', 28, 22);
    game.load.audio('music', 'sounds/music.wav');
    game.load.audio('coin', 'sounds/coin.wav');
    game.load.audio('death', 'sounds/death.wav');
  },
  create: function() {
    game.state.start('Menu');
  }
};
Game.Menu = function(game) {};
Game.Menu.prototype = {
  create: function() {
    game.stage.backgroundColor = '#fff';
    this.cursor = this.game.input.keyboard.createCursorKeys();
    var label = game.add.text(w / 2, h / 2 - 100, 'Crazy Snake', {
      font: '60px Arial',
      fill: '#2c2c2c',
      align: 'center'
    });
    label.anchor.setTo(0.5, 0.5);
    label.scale.setTo(0, 0);
    game.add.tween(label.scale).to({
      x: 1,
      y: 1
    }, 1000, Phaser.Easing.Bounce.Out).start();
    var label = game.add.text(w / 2, h - 150, 'press the UP arrow key to start', {
      font: '25px Arial',
      fill: '#2c2c2c'
    });
    label.anchor.setTo(0.5, 0.5);
    label.alpha = 0;
    game.add.tween(label).delay(500).to({
      alpha: 1
    }, 500).start();
    game.add.tween(label).to({
      y: h - 150
    }, 500).to({
      y: h - 125
    }, 500).loop().start();
    this.sound_toggle = this.game.add.button(w - 50, 50, 'sound', this.toggle_sound, this);
    this.sound_toggle.anchor.setTo(1, 0);
    this.sound_toggle.alpha = 0;
    game.add.tween(this.sound_toggle).delay(500).to({
      alpha: 1
    }, 500).start();
  },
  update: function() {
    if (this.cursor.up.isDown)
      this.game.state.start('Play');
  },
  toggle_sound: function() {
    if (this.sound_toggle.frame == 0) {
      this.sound_toggle.frame = 1;
      sound = false;
    } else {
      this.sound_toggle.frame = 0;
      sound = true;
    }
  }
};
/*
  Programming and art made by www.lessmilk.com
  You can freely look at the code below, 
  but you are not allowed to use the code or art to make your own games
*/
Game.Play = function(game) {};
Game.Play.prototype = {
  create: function() {
    game.stage.backgroundColor = '#fff';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursor = this.game.input.keyboard.createCursorKeys();
    this.bg = this.game.add.sprite(0, 0, 'bg');
    this.bg.anchor.setTo(0.5, 0.5);
    this.bg.frame = 0;
    game.physics.arcade.enable(this.bg);
    this.snake_array = [];
    this.snake = game.add.group();
    this.new_square(0, 2);
    this.new_square(0, 3);
    this.new_square(0, 4);
    var s = {
      font: '20px Arial',
      fill: '#fff'
    };
    this.score_label = game.add.text(-160, -160, "0", s);
    this.coin = this.game.add.sprite(100, 100, 'coin');
    this.coin.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this.coin);
    this.coin.body.setSize(1, 1, 0, 0);
    this.level = game.add.group();
    this.level.add(this.bg);
    this.level.add(this.snake);
    this.level.add(this.coin);
    this.level.add(this.score_label);
    this.level.x = w / 2;
    this.level.y = w / 2;
    this.music = game.add.sound('music');
    if (sound) this.music.play('', 0, 0.4, true);
    this.coin_s = game.add.sound('coin');
    this.coin_s.volume = 0.3;
    dead_s = game.add.sound('death');
    score = 0;
    this.direction = 1;
    this.effect = 0;
    this.max = {
      x: 175,
      y: 175
    };
    this.is_dead = false;
    game.time.events.loop(200, this.move, this);
  },
  update: function() {
    game.physics.arcade.overlap(this.snake, this.coin, this.take_coin, null, this);
    if (this.snake_array[0].x > this.max.x || this.snake_array[0].x < -this.max.x)
      this.dead();
    if (this.snake_array[0].y > this.max.y || this.snake_array[0].y < -this.max.y)
      this.dead();
    this.player_movements();
    if (score == 5 && this.effect == 0) {
      this.effect += 1;
      game.add.tween(this.level).to({
        angle: 30
      }, 5000).start();
    } else if (score == 10 && this.effect == 1) {
      this.effect += 1;
      game.add.tween(this.level.scale).to({
        x: 0.5,
        y: 0.5
      }, 3000).start();
    } else if (score == 15 && this.effect == 2) {
      this.effect += 1;
      game.add.tween(this.level).to({
        x: w / 2,
        y: h / 2
      }, 5000).start();
      game.add.tween(this.level.scale).to({
        x: 0.3,
        y: 0.9
      }, 5000).start();
      game.add.tween(this.level).to({
        angle: 0
      }, 5000).start();
    } else if (score == 20 && this.effect == 3) {
      this.effect += 1;
      game.add.tween(this.level.scale).to({
        x: 1,
        y: 1
      }, 3000).start();
    } else if (score == 25 && this.effect == 4) {
      this.effect += 1;
      game.add.tween(this.level.scale).to({
        x: 0.2,
        y: 0.2
      }, 5000).start();
      game.add.tween(this.level).to({
        x: w / 2 + 150,
        y: h / 2 + 150
      }, 5000).start();
    } else if (score == 30 && this.effect == 5) {
      this.effect += 1;
      game.add.tween(this.level).to({
        x: w / 2,
        y: h / 2
      }, 5).
      to({
        x: w / 2,
        y: h / 2
      }, 4000).to({
        x: w / 2 - 150,
        y: h / 2 - 150
      }, 5).start();
    } else if (score == 35 && this.effect == 6) {
      this.effect += 1;
      game.add.tween(this.level.scale).to({
        x: 1,
        y: 1
      }, 5000).start();
      game.add.tween(this.level).to({
        x: w / 2,
        y: h / 2
      }, 5000).start();
    } else if (score == 40 && this.effect == 7) {
      this.effect += 1;
      game.add.tween(this.level).to({
        angle: -100
      }, 5000).start();
    } else if (score == 45 && this.effect == 8) {
      this.effect += 1;
      game.add.tween(this.level).to({
        angle: -190
      }, 3000).start();
    } else if (score >= 50) {
      this.level.angle -= 0.2;
    }
    if (!this.snake_array[0].inCamera)
      this.dead();
  },
  new_square: function(i, j) {
    var square = this.game.add.sprite(0, 0, 'player');
    square.anchor.setTo(0.5, 0.5);
    square.reset(i * 20, j * 20);
    square.head = false;
    game.physics.arcade.enable(square);
    square.body.setSize(2, 2, 0, 0);
    this.snake.add(square);
    this.snake_array.push(square);
  },
  dead: function() {
    if (this.is_dead)
      return;
    this.is_dead = true;
    if (sound) dead_s.play();
    var t = game.add.tween(this.level.scale).to({
      x: 0,
      y: 0
    }, 500).start();
    t.onComplete.add(function() {
      this.music.stop();
      game.state.start('End');
    }, this);
  },
  move: function() {
    if (this.is_dead)
      return;
    var head = this.snake_array[0];
    var head_x = this.snake_array[0].x;
    var head_y = this.snake_array[0].y;
    head.head = true;
    if (this.direction == 1)
      head_y -= 20;
    else if (this.direction == 2)
      head_y += 20;
    else if (this.direction == 3)
      head_x += 20;
    else if (this.direction == 4)
      head_x -= 20;
    this.snake.forEach(function(e) {
      if (!e.head && head.x == e.x && head.y == e.y)
        this.dead();
    }, this);
    head.head = false;
    this.current_direction = this.direction;
    var tail = this.snake_array.pop();
    tail.x = head_x;
    tail.y = head_y;
    this.snake_array.unshift(tail);
  },
  take_coin: function() {
    if (sound) this.coin_s.play();
    var rand_;
    var tmp = true;
    while (tmp) {
      rand_ = {
        x: -160 + rand(17) * 20,
        y: -160 + rand(17) * 20
      };
      tmp = false;
      this.snake.forEach(function(e) {
        if (e.x == rand_.x && e.y == rand_.y)
          tmp = true;
      }, this);
    }
    this.coin.reset(rand_.x, rand_.y);
    score += 1;
    this.score_label.text = score;
    this.new_square(0, 10);
    if (score > 20 && score < 30)
      this.bg.frame = (this.bg.frame + 1) % 6;
    else if (score == 30)
      this.bg.frame = 0;
    this.coin.scale.setTo(0, 0);
    this.game.add.tween(this.coin.scale).to({
      x: 1,
      y: 1
    }, 300).start();
  },
  player_movements: function() {
    if (this.cursor.left.isDown && this.current_direction != 3)
      this.direction = 4;
    else if (this.cursor.right.isDown && this.current_direction != 4)
      this.direction = 3;
    else if (this.cursor.up.isDown && this.current_direction != 2)
      this.direction = 1;
    else if (this.cursor.down.isDown && this.current_direction != 1)
      this.direction = 2;
  }
};
Game.End = function(game) {};
Game.End.prototype = {
  create: function() {
    game.stage.backgroundColor = '#000';
    if (score > best_score)
      best_score = score;
    this.cursor = this.game.input.keyboard.createCursorKeys();
    var label = game.add.text(w / 2, h / 2 - 100, 'You Died', {
      font: '60px Arial',
      fill: '#fff',
      align: 'center'
    });
    label.anchor.setTo(0.5, 0.5);
    label.scale.setTo(0, 0);
    game.add.tween(label.scale).to({
      x: 1,
      y: 1
    }, 1000, Phaser.Easing.Bounce.Out).start();
    var label2 = game.add.text(w / 2, h - 220, 'score: ' + score + '\nbest score: ' + best_score, {
      font: '25px Arial',
      fill: '#fff',
      align: 'center'
    });
    label2.anchor.setTo(0.5, 0.5);
    label2.alpha = 0;
    game.add.tween(label2).delay(500).to({
      alpha: 1
    }, 500).start();
    var label3 = game.add.text(w / 2, h - 120, 'press up arrow key to restart', {
      font: '25px Arial',
      fill: '#fff',
      align: 'center'
    });
    label3.anchor.setTo(0.5, 0.5);
    label3.alpha = 0;
    game.add.tween(label3).delay(500).to({
      alpha: 1
    }, 500).start();
    game.add.tween(label3).to({
      y: h - 100
    }, 500).to({
      y: h - 75
    }, 500).loop().start();
    this.time = this.game.time.now + 500;
  },
  update: function() {
    if (this.cursor.up.isDown && this.time < this.game.time.now) {
      dead_s.stop();
      game.state.start('Play');
    }
  }
};
var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameContainer');
game.state.add('Boot', Game.Boot);
game.state.add('Load', Game.Load);
game.state.add('Menu', Game.Menu);
game.state.add('Play', Game.Play);
game.state.add('End', Game.End);
game.state.start('Boot');