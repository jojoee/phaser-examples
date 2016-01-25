Game = {};
var w = 400;
var h = 500;
var score = 0;
var best_score = 0;
var sound = true;

function rand(num) {
  return Math.floor(Math.random() * num)
};
Game.Boot = function(game) {};
Game.Boot.prototype = {
  preload: function() {
    game.stage.backgroundColor = '#ecf0f1';
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
    this.input.maxPointers = 1;
    label2 = game.add.text(Math.floor(w / 2) + 0.5, Math.floor(h / 2) - 15 + 0.5, 'loading...', {
      font: '30px Arial',
      fill: '#2c3e50'
    });
    label2.anchor.setTo(0.5, 0.5);
    preloading2 = game.add.sprite(w / 2, h / 2 + 15, 'loading2');
    preloading2.x -= preloading2.width / 2;
    preloading = game.add.sprite(w / 2, h / 2 + 19, 'loading');
    preloading.x -= preloading.width / 2;
    game.load.setPreloadSprite(preloading);
    game.load.spritesheet('dot', 'images/dot.png', 50, 50);
    game.load.spritesheet('sound', 'images/sound.png', 28, 22);
    game.load.image('bar', 'images/bar.png');
    game.load.image('progress', 'images/progress.png');
    game.load.image('tuto', 'images/tuto.png');
    game.load.image('question', 'images/question.png');
    game.load.audio('tap1', 'sounds/tap1.wav');
    game.load.audio('tap2', 'sounds/tap2.wav');
    game.load.audio('tap3', 'sounds/tap3.wav');
    game.load.audio('combo', 'sounds/combo.wav');
  },
  create: function() {
    game.state.start('Menu');
  }
};
Game.Menu = function(game) {};
Game.Menu.prototype = {
  create: function() {
    this.tap1_s = game.add.audio('tap1');
    this.combo_s = game.add.audio('combo');
    game.add.text(w / 2, 50, "connected", {
        font: "30px Arial",
        fill: "#2c3e50"
      })
      .anchor.setTo(0.5, 0.5);
    var label_start = game.add.text(w / 2, h - 50, "connect the two dots to start", {
      font: "20px Arial",
      fill: "#2c3e50"
    });
    label_start.anchor.setTo(0.5, 0.5);
    this.dot1 = this.game.add.sprite(w / 2 - 25, h / 2, 'dot');
    this.dot1.anchor.setTo(0.5, 0.5);
    this.dot1.frame = 0;
    this.dot1.inputEnabled = true;
    this.dot1.input.useHandCursor = true;
    this.dot2 = this.game.add.sprite(w / 2 + 25, h / 2, 'dot');
    this.dot2.anchor.setTo(0.5, 0.5);
    this.dot2.frame = 0;
    this.dot2.inputEnabled = true;
    this.dot2.input.useHandCursor = true;
    this.sound_toggle = this.game.add.button(w - 70, 40, 'sound', this.toggle_sound, this);
    game.add.tween(label_start).to({
      angle: 1
    }, 300).to({
      angle: -1
    }, 300).loop().start();
  },
  update: function() {
    var bool1 = Phaser.Rectangle.contains(this.dot1.body, game.input.activePointer.x, game.input.activePointer.y);
    var bool2 = Phaser.Rectangle.contains(this.dot2.body, game.input.activePointer.x, game.input.activePointer.y);
    if (game.input.activePointer.isDown) {
      if (this.dot1.frame == 0 && bool1) {
        this.dot1.frame += 1;
        if (sound) this.tap1_s.play('', 0, 0.5, false);
      }
      if (this.dot2.frame == 0 && bool2) {
        this.dot2.frame += 1;
        if (sound) this.tap1_s.play('', 0, 0.5, false);
      }
    }
    if (game.input.activePointer.isUp) {
      if (this.dot1.frame == 0 || this.dot2.frame == 0) {
        this.dot1.frame = 0;
        this.dot2.frame = 0;
      } else {
        if (sound) this.combo_s.play('', 0, 0.5, false);
        this.game.state.start('Play');
      }
    }
  },
  toggle_sound: function() {
    if (this.sound_toggle.frame == 0) {
      this.sound_toggle.frame = 1;
      sound = false;
    } else {
      this.sound_toggle.frame = 0;
      sound = true;
    }
  },
  shutdown: function() {
    game.world.removeAll();
  }
};
var tile_size = 60;
Game.Play = function(game) {};
Game.Play.prototype = {
  create: function() {
    this.dots = game.add.group();
    this.dots.createMultiple(70, 'dot');
    this.dots.setAll('inputEnabled', true);
    this.dots.setAll('input.useHandCursor', true);
    this.label_score = game.add.text(40, 20, "0", {
      font: "20px Arial",
      fill: "#2c3e50"
    });
    this.label_moves = game.add.text(w - 75, 20, "0/20", {
      font: "20px Arial",
      fill: "#2c3e50"
    });
    this.progress = this.game.add.sprite(w / 2, h - 50, 'progress');
    this.progress.anchor.setTo(0, 0.5);
    bar = this.game.add.sprite(w / 2, h - 50, 'bar');
    bar.anchor.setTo(0.5, 0.5);
    this.progress.width = 0;
    this.progress.x -= bar.width / 2;
    question = this.game.add.button(w / 2, 30, 'question', this.add_tuto, this);
    question.anchor.setTo(0.5, 0.5);
    this.tap1_s = game.add.audio('tap1');
    this.tap2_s = game.add.audio('tap2');
    this.tap3_s = game.add.audio('tap3');
    this.combo_s = game.add.audio('combo');
    this.clicked = false;
    this.count = 0;
    this.moves = 0;
    this.type = -1;
    this.deleted_dots = [];
    this.pos_i = -1;
    this.pos_j = -1;
    this.offset_x = (w - 6 * tile_size) / 2 + tile_size / 2;
    this.offset_y = 80;
    this.next_time = 0;
    score = 0;
    this.build_world();
  },
  update: function() {
    this.dots.forEachAlive(function(e) {
      if (e.scale.x == 2) e.kill();
    }, this);
    if (game.input.activePointer.isDown && game.time.now > this.next_time) {
      this.clicked = true;
      this.try_select_a_dot();
    }
    if (game.input.activePointer.isUp && this.clicked) {
      if (this.count > 1) {
        this.remove_selected_dots();
        this.move_dots_down();
        this.add_missing_dots();
        this.update_score_and_labels();
      } else
        this.unselect_all_dots();
      this.next_time = game.time.now + 300;
      this.count = 0;
      this.clicked = false;
      this.type = -1;
      this.pos_i = -1;
      this.pos_j = -1;
    }
  },
  build_world: function() {
    for (var i = 0; i < 6; i++)
      for (var j = 0; j < 6; j++)
        this.add_dot(i, j, true);
  },
  add_dot: function(i, j, type) {
    var dot = this.dots.getFirstExists(false);
    var r = rand(4);
    if (r == 0) dot.frame = 0;
    else if (r == 1) dot.frame = 2;
    else if (r == 2) dot.frame = 4;
    else if (r == 3) dot.frame = 6;
    dot.anchor.setTo(0.5, 0.5);
    dot.selected = false;
    dot.pos_i = i;
    dot.pos_j = j;
    dot.move_y = 0;
    dot.body.setSize(30, 30, 0, 0);
    dot.alpha = 1;
    dot.scale.setTo(0.01, 0.01);
    dot.alive2 = true;
    dot.reset(this.offset_x + j * tile_size, this.offset_y + i * tile_size);
    if (type)
      game.add.tween(dot.scale).delay(j * 100 + 1).to({
        x: 1,
        y: 1
      }, 400).start();
    else
      game.add.tween(dot.scale).delay(400).to({
        x: 1,
        y: 1
      }, 400).start();
  },
  try_select_a_dot: function(e) {
    this.dots.forEachAlive(function(e) {
      var bool = Phaser.Rectangle.contains(e.body, game.input.activePointer.x, game.input.activePointer.y);
      if (e.selected || !bool)
        return;
      if (this.type == -1)
        this.type = e.frame;
      if (this.type == e.frame && this.in_range(e))
        this.select_a_dot(e);
      else
        this.unselect_all_dots();
    }, this);
  },
  select_a_dot: function(e) {
    if (sound) {
      if (this.progress.width / 28 <= 3)
        this.tap1_s.play('', 0, 0.5, false);
      else if (this.progress.width / 28 <= 7)
        this.tap2_s.play('', 0, 0.7, false);
      else
        this.tap3_s.play('', 0, 0.9, false);
    }
    e.selected = true;
    e.frame += 1;
    this.count += 1;
    this.pos_j = e.pos_j;
    this.pos_i = e.pos_i;
    this.increase_bar();
  },
  remove_selected_dots: function(e) {
    this.dots.forEachAlive(function(e) {
      if (!e.selected)
        return;
      this.game.add.tween(e.scale).to({
        x: 2,
        y: 2
      }, 300).start();
      this.game.add.tween(e).to({
        alpha: 0
      }, 300).start();
      this.deleted_dots.push({
        i: e.pos_i,
        j: e.pos_j
      });
      e.alive2 = false;
    }, this);
  },
  unselect_all_dots: function() {
    this.count = 0;
    this.dots.forEachAlive(function(e) {
      if (e.selected) {
        e.selected = false;
        e.frame -= 1;
      }
    }, this);
    this.clear_bar();
  },
  move_dots_down: function() {
    for (var i = 0; i < this.deleted_dots.length; i++) {
      var tmp_i = this.deleted_dots[i].i;
      var tmp_j = this.deleted_dots[i].j;
      this.dots.forEachAlive(function(e) {
        if (!e.selected && e.pos_j == tmp_j && e.pos_i < tmp_i)
          e.move_y += tile_size;
      }, this);
    }
    this.dots.forEachAlive(function(e) {
      if (e.move_y == 0)
        return;
      var coef = e.move_y / tile_size;
      e.pos_i += coef;
      game.add.tween(e).delay(100).to({
        y: e.y + e.move_y
      }, 100 * coef).start();
      e.move_y = 0;
    }, this);
    this.deleted_dots = [];
  },
  add_missing_dots: function() {
    var min = [6, 6, 6, 6, 6, 6];
    this.dots.forEachAlive(function(e) {
      if (e.pos_i < min[e.pos_j] && e.alive2)
        min[e.pos_j] = e.pos_i;
    }, this);
    for (var i = 0; i < 6; i++)
      for (var j = 0; j < min[i]; j++)
        this.add_dot(j, i, false);
  },
  update_score_and_labels: function() {
    if (sound) this.combo_s.play('', 0, 0.4, false);
    this.moves += 1;
    this.label_moves.content = this.moves + '/20';
    score += this.count * this.get_multiplier_bar();
    this.label_score.content = score;
    this.clear_bar();
    if (this.moves == 20) this.game.state.start('End');
  },
  in_range: function(d) {
    if (this.pos_j == -1) return true;
    return (this.pos_j - 1 == d.pos_j && this.pos_i == d.pos_i) ||
      (this.pos_j + 1 == d.pos_j && this.pos_i == d.pos_i) ||
      (this.pos_j == d.pos_j && this.pos_i - 1 == d.pos_i) ||
      (this.pos_j == d.pos_j && this.pos_i + 1 == d.pos_i);
  },
  increase_bar: function() {
    if (this.progress.width / 28 <= 11)
      game.add.tween(this.progress).to({
        width: "+28"
      }, 100).start();
  },
  clear_bar: function() {
    game.add.tween(this.progress).to({
      width: 0
    }, 300).start();
  },
  get_multiplier_bar: function() {
    if (this.progress.width / 28 <= 4) return 1;
    else if (this.progress.width / 28 <= 8) return 5;
    else return 10;
  },
  add_tuto: function() {
    this.tuto = this.game.add.button(0, 0, 'tuto', this.remove_tuto, this);
  },
  remove_tuto: function() {
    this.tuto.kill();
  }
};
Game.End = function(game) {};
Game.End.prototype = {
  create: function() {
    if (best_score == 0) {
      if (typeof(Storage) !== "undefined") {
        var tmp = localStorage.getItem("7_best_score");
        if (tmp > 0)
          best_score = tmp;
      }
    }
    game.add.text(w / 2, h / 2, "you ended your 20 turns\n\nyou scored: " + score +
        "\nyour best score: " + best_score, {
          font: "30px Arial",
          fill: "#2c3e50",
          align: "center"
        })
      .anchor.setTo(0.5, 0.5);
    if (score > best_score) {
      best_score = score;
      if (typeof(Storage) !== "undefined")
        localStorage.setItem("7_best_score", best_score);
    }
    label_restart = game.add.text(w / 2, h - 50, "click anywhere to restart", {
      font: "20px Arial",
      fill: "#2c3e50"
    });
    label_restart.anchor.setTo(0.5, 0.5);
    game.add.tween(label_restart).to({
      angle: 1
    }, 300).to({
      angle: -1
    }, 300).loop().start();
    emitter = game.add.emitter(w / 2, -200, 100);
    emitter.makeParticles('dot');
    emitter.start(false, 5000, 200);
  },
  update: function() {
    if (game.input.activePointer.isDown)
      this.game.state.start('Play');
  }
};
var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameContainer');
game.state.add('Boot', Game.Boot);
game.state.add('Load', Game.Load);
game.state.add('Menu', Game.Menu);
game.state.add('Play', Game.Play);
game.state.add('End', Game.End);
game.state.start('Boot');