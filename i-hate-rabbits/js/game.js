var map = [
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1],
  [0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1],
  [0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1],
  [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[x, 0, 0, 0, 0, x, 0, 0, 0, 0, x, 0, 0, 0, 0],
];
Game = {};
var w = 450;
var h = 450;
var level = 0;
var score = 0;
var best_score = 0;

function rand(num) {
  return Math.floor(Math.random() * num)
};
Game.Boot = function(game) {};
Game.Boot.prototype = {
  preload: function() {
    game.stage.backgroundColor = '#2ecc71';
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
    game.load.image('rabbit', 'images/rabbit2.png');
    game.load.image('circle', 'images/circle.png');
    game.load.spritesheet('bad', 'images/bad.png', 36, 40);
    game.load.image('tweet', 'images/tweet.png');
    game.load.image('facebook', 'images/facebook.png');
    game.load.audio('music', 'sounds/music.wav');
    game.load.audio('a', 'sounds/a.mp3');
    game.load.audio('e', 'sounds/e.mp3');
    game.load.audio('i', 'sounds/i.mp3');
    game.load.audio('o', 'sounds/o.mp3');
    game.load.audio('u', 'sounds/u.mp3');
    game.load.audio('yeah', 'sounds/yeah.mp3');
    game.load.audio('haho', 'sounds/haho.mp3');
  },
  create: function() {
    game.state.start('Menu');
  }
};
Game.Menu = function(game) {};
Game.Menu.prototype = {
  create: function() {
    var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space_key.onDown.add(this.start_game, this);
    this.bad = this.game.add.sprite(w / 2, h / 2 - 120, 'bad');
    this.bad.anchor.setTo(0.5, 1);
    this.bad.animations.add('walk', [0, 1], 5, true).play();
    this.circle = this.game.add.sprite(w / 2, h / 2, 'circle');
    this.circle.anchor.setTo(0.5, 0.5);
    var s = {
      font: '20px Arial',
      fill: '#fff',
      align: 'center'
    };
    var start_label = game.add.text(w / 2 + 0.5, h / 2 + 0.5, "press space to\nstart the game", s);
    start_label.anchor.setTo(0.5, 0.5);
    game.add.tween(start_label.scale).to({
      x: 1.1,
      y: 1.1
    }, 300).to({
      x: 1,
      y: 1
    }, 300).loop().start();
    var start_label = game.add.text(w / 2 + 0.5, h - 30, "try to save the rabbits by pressing space", s);
    start_label.anchor.setTo(0.5, 0.5);
    var s = {
      font: '30px Arial',
      fill: '#fff',
      align: 'center'
    };
    title_label = game.add.text(w / 2 + 0.5, 30, "I Hate Rabbits!", s);
    title_label.anchor.setTo(0.5, 0.5);
  },
  start_game: function() {
    this.game.state.start('Play');
  }
};
Game.Play = function(game) {};
Game.Play.prototype = {
  create: function() {
    this.space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.space_key.onDown.add(this.jump, this);
    this.rabbits = game.add.group();
    this.rabbits.createMultiple(30, 'rabbit');
    this.bad = this.game.add.sprite(w / 2, h / 2, 'bad');
    this.bad.anchor.setTo(0.5, 1);
    this.bad.animations.add('walk', [0, 1], 5, true).play();
    this.circle = this.game.add.sprite(w / 2, h / 2, 'circle');
    this.circle.anchor.setTo(0.5, 0.5);
    var s = {
      font: '20px Arial',
      fill: '#fff',
      align: 'center'
    };
    this.start_label = game.add.text(w / 2 + 0.5, 30, "try to save the rabbits by pressing space", s);
    this.start_label.anchor.setTo(0.5, 0.5);
    var s2 = {
      font: '80px Arial',
      fill: '#fff',
      align: 'center'
    };
    this.world_label = game.add.text(w / 2, h / 2, "10", s2);
    this.world_label.anchor.setTo(0.5, 0.5);
    score = 65;
    level = 0;
    this.change_level = true;
    this.end = 0;
    this.a_s = this.game.add.audio("a");
    this.a_s.volume = 0.3;
    this.e_s = this.game.add.audio("e");
    this.e_s.volume = 0.3;
    this.i_s = this.game.add.audio("i");
    this.i_s.volume = 0.3;
    this.o_s = this.game.add.audio("o");
    this.o_s.volume = 0.3;
    this.u_s = this.game.add.audio("u");
    this.u_s.volume = 0.3;
    this.music_s = game.add.audio('music');
    this.music_s.play('', 0, 0.4, false);
  },
  update: function() {
    if (this.end != 0 && this.end < game.time.now) {
      this.music_s.stop();
      this.game.state.start('End');
    }
    game.physics.overlap(this.bad, this.rabbits, this.hit, null, this);
    if (this.bad.angle >= -2 && this.bad.angle <= 2 && this.change_level) {
      this.change_level = false;
      this.draw_level();
    } else if (this.bad.angle > 2)
      this.change_level = true;
    this.bad.angle += 1.2;
    var x = w / 2 + (this.circle.width / 2 - 4) * Math.cos(this.bad.rotation - Math.PI / 2);
    var y = h / 2 + (this.circle.width / 2 - 4) * Math.sin(this.bad.rotation - Math.PI / 2);
    this.bad.reset(x, y);
  },
  add_rabbit: function(angle, i) {
    var rabbit = this.rabbits.getFirstDead();
    rabbit.rotation = 0;
    rabbit.rotation = angle + Math.PI / 2;
    var x_out = w / 2 + (this.circle.width + 100) * Math.cos(angle);
    var y_out = h / 2 + (this.circle.width + 100) * Math.sin(angle);
    var x_in = w / 2 + (this.circle.width / 2 - 2) * Math.cos(angle);
    var y_in = h / 2 + (this.circle.width / 2 - 2) * Math.sin(angle);
    rabbit.jump = false;
    rabbit.alpha = 1;
    rabbit.pos = i;
    rabbit.reset(x_out, y_out);
    rabbit.anchor.setTo(0.5, 1);
    rabbit.t = this.game.add.tween(rabbit);
    rabbit.t.to({
      x: x_in,
      y: y_in
    }, 300).start();
  },
  hit: function(bad, rabbit) {
    rabbit.kill();
    /*game.add.tween(this.circle.scale).to({x:3, y:3}, 500).start();
    game.add.tween(this.world_label).to({alpha: 0}, 100).start();
    this.start_label.alpha = 0;
    this.rabbits.forEachAlive(function(r){r.kill();}, this);
    this.end = game.time.now + 500;*/
    score -= 1;
    var sound = this.game.add.audio("haho");
    sound.volume = 0.5;
    sound.play();
  },
  jump_sound: function() {
    var r = rand(5);
    if (r == 0) this.a_s.play();
    else if (r == 1) this.e_s.play();
    else if (r == 2) this.i_s.play();
    else if (r == 3) this.o_s.play();
    else if (r == 4) this.u_s.play();
  },
  jump: function() {
    var min = 20,
      min_r;
    this.rabbits.forEachAlive(function(r) {
      if (r.jump == false && r.pos < min) {
        min = r.pos;
        min_r = r;
      }
    }, this);
    var rabbit = min_r;
    if (min != 20 && !rabbit.t.isRunning) {
      this.jump_sound();
      var x = w / 2 + (this.circle.width / 2 + 90) * Math.cos(rabbit.rotation - Math.PI / 2);
      var y = h / 2 + (this.circle.width / 2 + 90) * Math.sin(rabbit.rotation - Math.PI / 2);
      rabbit.t2 = this.game.add.tween(rabbit)
        .to({
          x: x,
          y: y
        }, 400)
        .to({
          x: rabbit.x,
          y: rabbit.y
        }, 600);
      rabbit.t2.start();
      rabbit.jump = true;
    }
  },
  draw_level: function() {
    this.rabbits.forEachAlive(function(r) {
      var t = this.game.add.tween(r).to({
        alpha: 0
      }, 300).start();
      t.onComplete.add(function() {
        this.kill()
      }, r);
    }, this);
    this.world_label.content = 9 - level;
    if (level == 9) {
      this.game.state.start('End');
      return;
    }
    if (level == 1)
      this.game.add.tween(this.start_label).to({
        alpha: 0
      }, 500).start();
    var l = map[level];
    for (var i = 0; i < l.length; i++)
      if (l[i] != 0)
        this.add_rabbit(i * (Math.PI / 10), i);
    level += 1;
  }
};
Game.End = function(game) {};
Game.End.prototype = {
  create: function() {
    if (score > best_score)
      best_score = score;
    var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space_key.onDown.add(this.start_game, this);
    this.circle = this.game.add.sprite(w / 2, h / 2, 'circle');
    this.circle.anchor.setTo(0.5, 0.5);
    var s = {
      font: '30px Arial',
      fill: '#fff',
      align: 'center'
    };
    var score_label = game.add.text(w / 2 + 0.5, 40, "you saved " + score + " rabbits", s);
    score_label.anchor.setTo(0.5, 0.5);
    var s = {
      font: '20px Arial',
      fill: '#fff',
      align: 'center'
    };
    var best_score_label = game.add.text(w / 2 + 0.5, 70, "best score: " + best_score, s);
    best_score_label.anchor.setTo(0.5, 0.5);
    var start_label = game.add.text(w / 2 + 0.5, h / 2 + 0.5, "press space to\nrestart the game", s);
    start_label.anchor.setTo(0.5, 0.5);
    share_label = game.add.text(w / 2 - 70 + 0.5, h - 50, "share your score on Twitter:", s);
    share_label.anchor.setTo(0.5, 0.5);
    var t = this.game.add.button(w / 2 + 135, h - 50, 'tweet', this.tweet, this);
    t.scale.setTo(0.8, 0.8);
    t.anchor.setTo(0.5, 0.5);
    game.add.tween(t.scale).to({
      x: 0.85,
      y: 0.85
    }, 300).to({
      x: 0.8,
      y: 0.8
    }, 300).loop().start();
    this.time = this.game.time.now + 500;
    if (level == 9) {
      var sound = this.game.add.audio("yeah");
      sound.volume = 0.5;
      sound.play();
    }
    this.game.world.alpha = 0;
    this.game.add.tween(this.game.world).to({
      alpha: 1
    }, 1000).start();
  },
  start_game: function() {
    if (this.time < this.game.time.now) {
      this.game.world.alpha = 1;
      this.game.state.start('Play');
    }
  },
  tweet: function() {
    window.open('http://twitter.com/share?text=I+just+saved+' + score + '+rabbits+at+"I+Hate+Rabbits"+game!+Try+to+beat+me+here&via=lessmilk_&url=http://www.lessmilk.com/9/', '_blank');
  }
};
var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameContainer');
game.state.add('Boot', Game.Boot);
game.state.add('Load', Game.Load);
game.state.add('Menu', Game.Menu);
game.state.add('Play', Game.Play);
game.state.add('End', Game.End);
game.state.start('Boot');