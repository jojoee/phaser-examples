Game = {};
var w = 450;
var h = 600;
var score = 0;
var best_score = 0;
var sound = true;

function rand(num) {
  return Math.floor(Math.random() * num)
};
Game.Boot = function(game) {};
Game.Boot.prototype = {
  preload: function() {
    game.stage.backgroundColor = '#a3b9ff';
    game.load.image('loading', 'images/loading.png');
    game.load.image('loading2', 'images/loading2.png');
    // game.load.image('orientation', 'images/orientation.png');
  },
  create: function() {
    if (!this.game.device.desktop) {
      document.body.style.backgroundColor = "#a3b9ff";
      // game.stage.scale.forceOrientation(false, true, 'orientation');
      game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
      this.game.stage.scale.pageAlignHorizontally = true;
      this.game.stage.scale.pageAlignVeritcally = true;
      game.stage.scale.setShowAll();
      game.stage.scale.refresh();
    }
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
    game.load.image('heart', 'images/heart.png');
    game.load.image('spike', 'images/spike.png');
    game.load.image('cloud', 'images/cloud.png');
    game.load.image('ground', 'images/ground.png');
    game.load.image('platform', 'images/platform.png');
    game.load.image('princess_zoom', 'images/princess_zoom.png');
    game.load.spritesheet('princess', 'images/princess.png', 52, 72);
    game.load.image('line', 'images/line.png');
    game.load.spritesheet('mute', 'images/mute.png', 28, 18);
    game.load.audio('dead', 'sounds/dead.wav');
    game.load.audio('jump', 'sounds/jump.wav');
    game.load.audio('heart', 'sounds/heart.wav');
    game.load.audio('music', 'sounds/music.wav');
    game.load.audio('hit', 'sounds/hit.wav');
  },
  create: function() {
    game.state.start('Menu');
  }
};
Game.Menu = function(game) {};
Game.Menu.prototype = {
  create: function() {
    game.add.text(Math.floor(w / 2) + 0.5, 50, 'Princess Quest', {
        font: '40px Arial',
        fill: '#fff'
      })
      .anchor.setTo(0.5, 0.5);
    game.add.text(Math.floor(w / 2) + 0.5, 100, 'help the princess go as high as possible', {
        font: '22px Arial',
        fill: '#fff'
      })
      .anchor.setTo(0.5, 0.5);
    if (this.game.device.desktop)
      var txt = 'press the UP arrow key to start';
    else
      var txt = 'tap anywhere to start';
    label2 = game.add.text(Math.floor(w / 2) + 0.5, h - 40 + 0.5, txt, {
      font: '25px Arial',
      fill: '#fff'
    });
    label2.anchor.setTo(0.5, 0.5);
    game.add.tween(label2).to({
        angle: 1
      }, 300, Phaser.Easing.Linear.None)
      .to({
        angle: -1
      }, 300, Phaser.Easing.Linear.None).loop().start();
    this.princess = this.game.add.sprite(w / 2, h / 2 - 50, 'princess');
    this.princess.body.gravity.y = 12;
    this.princess.anchor.setTo(0.5, 1);
    this.princess.frame = 1;
    this.platform = this.game.add.sprite(w / 2, h / 2 + 150, 'platform');
    this.platform.anchor.setTo(0.5, 0.5);
    this.platform.body.immovable = true;
    this.sound_toggle = this.game.add.button(w - 70, 42, 'mute', this.toggle_sound, this);
    this.cursor = this.game.input.keyboard.createCursorKeys();
  },
  update: function() {
    game.physics.collide(this.princess, this.platform);
    if (this.princess.body.touching.down && this.princess.scale.y == 1) {
      var tween = game.add.tween(this.princess.scale).to({
        y: 0.7,
        x: 1.3
      }, 150, Phaser.Easing.Linear.None).start();
      tween.onComplete.add(function() {
        this.princess.scale.setTo(1, 1);
        this.princess.body.velocity.y = -500;
      }, this);
    }
    if (this.cursor.up.isDown || game.input.activePointer.isDown)
      game.state.start('Play');
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
Game.Play = function(game) {};
Game.Play.prototype = {
  create: function() {
    this.game.world.setBounds(0, -100000, w, h + 100000);
    this.cursor = this.game.input.keyboard.createCursorKeys();
    this.clouds = game.add.group();
    this.clouds.createMultiple(6, 'cloud');
    this.clouds.setAll('outOfBoundsKill', true);
    if (score > best_score)
      best_score = score;
    score = 0;
    /*if (best_score > 0) {
        var x = -best_score*10+h/2;
      this.score_line = game.add.sprite(0, x, 'line');
      this.score_line_label = game.add.text(w-100, x-25, 'best score', { font: '20px Arial', fill: '#fff' });
    }*/
    this.platforms = game.add.group();
    this.platforms.createMultiple(15, 'platform');
    this.platforms.setAll('body.immovable', true);
    this.platforms.setAll('body.allowCollision.down', false);
    this.platforms.setAll('body.allowCollision.right', false);
    this.platforms.setAll('body.allowCollision.left', false);
    this.hearts = game.add.group();
    this.hearts.createMultiple(3, 'heart');
    this.spikes = game.add.group();
    this.spikes.createMultiple(5, 'spike');
    this.emitter = game.add.emitter(0, 0, 100);
    this.emitter.x = -100;
    this.emitter.on = false;
    this.emitter.makeParticles('heart');
    this.emitter.gravity = 10;
    this.emitter.start(false, 1000, 15, 0);
    this.emitter.width = 50;
    this.princess = this.game.add.sprite(w / 2 + 100, h - 200, 'princess');
    this.princess.body.gravity.y = 12;
    this.princess.anchor.setTo(0.5, 1);
    this.ground = this.game.add.sprite(0, h - 56, 'ground');
    this.ground.scale.setTo(15, 1);
    this.ground.body.immovable = true;
    this.ground.outOfBoundsKill = true;
    this.score_label = game.add.text(10, 10, '0', {
      font: '20px Arial',
      fill: '#fff'
    });
    //this.tutorial_label = game.add.text(w/2+0.5, h-25, 'use the arrow keys to move', { font: '20px Arial', fill: '#fff' });
    //this.tutorial_label.anchor.setTo(0.5, 0.5);
    this.jump_s = game.add.audio('jump');
    this.heart_s = game.add.audio('heart');
    this.hit_s = game.add.audio('hit');
    this.music_s = game.add.audio('music');
    if (sound) this.music_s.play('', 0, 0.2, true);
    this.maxX = h / 2 - 20;
    this.next_platform = 10;
    this.next_cloud = 50;
    this.took_heart = false;
    this.count_update = 0;
    this.init_level();
  },
  update: function() {
    if (this.princess.alive) {
      if (this.ground.alive) game.physics.collide(this.princess, this.ground);
      game.physics.collide(this.princess, this.platforms);
      game.physics.overlap(this.princess, this.hearts, this.take_heart, null, this);
      game.physics.overlap(this.princess, this.spikes, this.take_spike, null, this);
    }
    if (this.princess.body.y < this.game.camera.y + h / 2) {
      this.move_screen_up();
      this.generate_level();
    }
    if (this.count_update == 20) {
      this.count_update = 0;
      this.platforms.forEachAlive(this.update_platform, this);
      this.hearts.forEachAlive(this.update_heart, this);
      this.spikes.forEachAlive(this.update_spike, this);
    } else
      this.count_update += 1;
    this.princess_move();
  },
  init_level: function() {
    this.add_platform(h - 150, 100);
    this.add_platform(h - 300, 200);
    this.add_platform(h - 450, 300);
    this.add_platform(h - 550, 300);
    this.add_cloud(h - 300);
    this.add_cloud(h - 500);
  },
  generate_level: function() {
    if (this.next_platform < -this.game.camera.y) {
      if (score < 250)
        var level = [1, 1, 1, 1, 2, 2, 2, 3, 5, 5];
      else if (score < 500)
        var level = [1, 1, 2, 2, 2, 3, 3, 4, 4, 5];
      else if (score < 1000)
        var level = [1, 2, 2, 3, 3, 3, 4, 4, 4, 5];
      else if (score < 2000)
        var level = [1, 2, 3, 3, 3, 4, 4, 4, 4, 5];
      else if (score < 3000)
        var level = [2, 3, 3, 3, 4, 4, 4, 4, 4, 5];
      else
        var level = [2, 3, 3, 4, 4, 4, 4, 4, 4, 4];
      var type = level[rand(level.length)];
      var y = this.game.camera.y - 30;
      this.next_platform += rand(80) + 70;
      if (type == 1)
        this.add_platform_double(y);
      else if (type == 2)
        this.add_platform(y);
      else if (type == 3)
        this.add_platform_moving(y);
      else if (type == 4) {
        if (rand(3) > 0) this.add_platform_moving(y);
        else this.add_platform_double(y);
        this.add_platform_spike(y - 150);
        this.next_platform += 150;
      } else if (type == 5)
        this.add_platform_heart(y);
    }
    if (this.next_cloud < -this.game.camera.y) {
      this.add_cloud(this.game.camera.y - 70);
      this.next_cloud += 100 + rand(200);
    }
  },
  move_screen_up: function() {
    var delta = this.game.camera.y + Math.floor(h / 2) - this.princess.body.y;
    this.game.camera.y -= delta;
    this.score_label.y = this.game.camera.y + 10;
    /*
    create and kill score line
    kill ground and tutorial
    */
    score = -Math.floor(this.game.camera.y / 10);
    this.score_label.content = score;
  },
  princess_move: function() {
    if (this.princess.body.y > this.game.camera.y + h + 200) {
      this.music_s.stop();
      game.state.start('Dead');
      return;
    }
    if (this.princess.x < 20)
      this.princess.x = 20;
    else if (this.princess.x > w - 20)
      this.princess.x = w - 20;
    if (this.princess.body.touching.down && this.princess.scale.y == 1) {
      if (sound) this.jump_s.play('', 0, 0.15, false);
      if (this.princess.scale.x == 1)
        var scale_x = 1.3;
      else
        var scale_x = -1.3;
      var tween = game.add.tween(this.princess.scale).to({
        y: 0.7,
        x: scale_x
      }, 150, Phaser.Easing.Linear.None).start();
      tween.onComplete.add(function() {
        if (this.princess.scale.x == 1)
          this.princess.scale.setTo(1, 1);
        else
          this.princess.scale.setTo(-1, 1);
        this.princess.body.velocity.y = -500;
      }, this);
    }
    this.princess.body.velocity.x = 0;
    var touch_right = game.input.activePointer.isDown && game.input.activePointer.x > w / 2;
    var touch_left = game.input.activePointer.isDown && game.input.activePointer.x < w / 2;
    if ((this.cursor.left.isDown || touch_left) && this.princess.alive) {
      this.princess.frame = 0;
      this.princess.body.velocity.x = -300;
      if (this.princess.scale.x == 1)
        this.princess.scale.setTo(-1, 1);
    } else if ((this.cursor.right.isDown || touch_right) && this.princess.alive) {
      this.princess.frame = 0;
      this.princess.body.velocity.x = 300;
      if (this.princess.scale.x == -1)
        this.princess.scale.setTo(1, 1);
    } else
      this.princess.frame = 1;
    if (this.princess.body.velocity.y > -200) {
      this.took_heart = false;
      this.emitter.on = false;
    }
    this.emitter.x = this.princess.x;
    this.emitter.y = this.princess.y - 15;
  },
  add_platform: function(y, x) {
    var platform = this.platforms.getFirstExists(false);
    if (platform) {
      x = typeof x !== 'undefined' ? x : rand(w - platform.width - 10) + platform.width / 2 + 5;
      platform.reset(x, y);
      platform.anchor.setTo(0.5, 0.5);
      platform.body.velocity.x = 0;
      return platform;
    } else console.log("plat");
  },
  add_platform_double: function(y) {
    this.add_platform(y);
    this.add_platform(y);
  },
  add_platform_heart: function(y) {
    var p = this.add_platform(y);
    var heart = this.hearts.getFirstExists(false);
    if (heart) {
      heart.anchor.setTo(0.5, 0.5);
      heart.reset(p.x, y - 29);
    }
  },
  add_platform_spike: function(y) {
    var p = this.add_platform(y);
    this.add_spike(p.x, p.y + 18);
  },
  add_platform_moving: function(y) {
    var p = this.add_platform(y);
    if (rand(2) == 0)
      p.body.velocity.x = -120;
    else
      p.body.velocity.x = 120;
  },
  add_cloud: function(y) {
    var cloud = this.clouds.getFirstExists(false);
    if (cloud) {
      cloud.reset(rand(w) - cloud.width, y);
      if (rand(2) == 1) cloud.body.velocity.x = 8;
      else cloud.body.velocity.x = -8;
    } else console.log("cloud");
  },
  add_spike: function(x, y) {
    var spike = this.spikes.getFirstExists(false);
    if (spike) {
      spike.body.setSize(spike.width - 6, spike.height - 6, 0, 0)
      spike.anchor.setTo(0.5, 0.5);
      spike.reset(x, y);
    } else console.log("spike");
  },
  update_platform: function(p) {
    if (p.x + p.width / 2 >= w && p.body.velocity.x > 0)
      p.body.velocity.x = -120;
    else if (p.x - p.width / 2 <= 0 && p.body.velocity.x < 0)
      p.body.velocity.x = 120;
    if (p.y - p.height > this.game.camera.y + h)
      p.kill();
  },
  update_heart: function(h) {
    if (h.y - h.height > this.game.camera.y + h)
      h.kill();
  },
  update_spike: function(s) {
    if (s.y - s.height > this.game.camera.y + h)
      s.kill();
  },
  take_heart: function(princess, heart) {
    heart.kill();
    if (sound) this.heart_s.play('', 0, 0.2, false);
    this.emitter.on = true;
    this.princess.body.velocity.y = -1200;
    this.took_heart = true;
  },
  take_spike: function(princess, spike) {
    if (!this.took_heart) {
      if (sound) this.hit_s.play('', 0, 0.4, false);
      this.princess.alive = false;
      this.princess.body.velocity.y = -300;
    }
  },
  shutdown: function() {
    game.world.removeAll();
  }
};
Game.Dead = function(game) {};
Game.Dead.prototype = {
  create: function() {
    game.add.text(Math.floor(w / 2) + 0.5, 50, 'oh no, you died', {
        font: '40px Arial',
        fill: '#fff'
      })
      .anchor.setTo(0.5, 0.5);
    game.add.text(Math.floor(w / 2) + 0.5, 130, 'your score: ' + score + '\nbest score: ' + best_score, {
        font: '30px Arial',
        fill: '#fff',
        align: 'center'
      })
      .anchor.setTo(0.5, 0.5);
    if (this.game.device.desktop)
      var txt = 'press the UP arrow key to restart';
    else
      var txt = 'tap anywhere to restart';
    label = game.add.text(Math.floor(w / 2) + 0.5, 200, txt, {
      font: '25px Arial',
      fill: '#fff'
    });
    label.anchor.setTo(0.5, 0.5);
    game.add.tween(label).to({
        angle: 1
      }, 300, Phaser.Easing.Linear.None)
      .to({
        angle: -1
      }, 300, Phaser.Easing.Linear.None).loop().start();
    label2 = game.add.text(Math.floor(w / 2) + 0.5, h + 300, 'I\'m sure you can do better!', {
      font: '25px Arial',
      fill: '#fff'
    });
    label2.anchor.setTo(0.5, 0.5);
    princess = this.game.add.sprite(w / 2, h + h, 'princess_zoom');
    princess.anchor.setTo(0.5, 1);
    game.add.tween(label2).to({
      y: 300
    }, 2000, Phaser.Easing.Bounce.Out).start();
    game.add.tween(princess).to({
      y: h
    }, 2000, Phaser.Easing.Bounce.Out).start();
    if (sound) game.add.audio('dead').play('', 0, 0.3, false);
    this.cursor = this.game.input.keyboard.createCursorKeys();
  },
  update: function() {
    if (this.cursor.up.isDown || game.input.activePointer.isDown)
      game.state.start('Play');
  },
  shutdown: function() {
    game.world.removeAll();
  }
};
var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameContainer');
game.state.add('Boot', Game.Boot);
game.state.add('Load', Game.Load);
game.state.add('Menu', Game.Menu);
game.state.add('Play', Game.Play);
game.state.add('Dead', Game.Dead);
game.state.start('Boot');