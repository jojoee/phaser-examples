var MAP = [
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
var W = 450;
var H = 450;
var LEVEL = 0;
var SCORE = 0;
var BEST_SCORE = 0;
var CURRENT_TIME;

/*================================================================ UTIL
*/

function rand(num) {
  return Math.floor(Math.random() * num)
};

/*================================================================ BOOT
*/

Game.Boot = function(game) {};
Game.Boot.prototype = {
  preload: function() {
    game.stage.backgroundColor = '#2ecc71';
    game.load.image('loading', 'images/loading.png');
    game.load.image('loading-border', 'images/loading-border.png');
  },
  create: function() {
    game.state.start('Load');
  }
};

/*================================================================ LOAD
*/

Game.Load = function(game) {};
Game.Load.prototype = {
  preload: function() {
    // loading label
    var loadingTextStyle = {
      font: '30px Arial',
      fill: '#fff'
    };
    loadingText = game.add.text(
      Math.floor(W / 2) + 0.5,
      Math.floor(H / 2) - 15 + 0.5,
      'loading...',
      loadingTextStyle
    );
    loadingText.anchor.setTo(0.5, 0.5);

    // preloading image
    preloadingBorder = game.add.sprite(W / 2, H / 2 + 15, 'loading-border');
    preloadingBorder.x -= preloadingBorder.widtH / 2;
    preloading = game.add.sprite(W / 2, H / 2 + 19, 'loading');
    preloading.x -= preloading.widtH / 2;
    game.load.setPreloadSprite(preloading);

    // game images
    game.load.image('rabbit', 'images/rabbit2.png');
    game.load.image('circle', 'images/circle.png');
    game.load.spritesheet('bad', 'images/bad.png', 36, 40);
    game.load.image('tweet', 'images/tweet.png');
    game.load.image('facebook', 'images/facebook.png');

    // game sounds
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

/*================================================================ MENU
*/

Game.Menu = function(game) {};
Game.Menu.prototype = {
  create: function() {
    // input
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.startGame, this);

    // enemy
    this.bad = game.add.sprite(W / 2, H / 2 - 120, 'bad');
    this.bad.anchor.setTo(0.5, 1);
    this.bad.animations.add('walk', [0, 1], 5, true).play();

    // circle
    this.circle = game.add.sprite(W / 2, H / 2, 'circle');
    this.circle.anchor.setTo(0.5, 0.5);

    // top label
    var topLabelStyle = {
      font: '30px Arial',
      fill: '#fff',
      align: 'center'
    };
    topLabel = game.add.text(W / 2 + 0.5, 30, "I Hate Rabbits!", topLabelStyle);
    topLabel.anchor.setTo(0.5, 0.5);

    // middle label
    var middleLabelStyle = {
      font: '20px Arial',
      fill: '#fff',
      align: 'center'
    };
    var middleLabel = game.add.text(W / 2 + 0.5, H / 2 + 0.5, "press space to\nstart the game", middleLabelStyle);
    middleLabel.anchor.setTo(0.5, 0.5);
    game.add.tween(middleLabel.scale).to({
      x: 1.1,
      y: 1.1
    }, 300).to({
      x: 1,
      y: 1
    }, 300).loop().start();

    // bottom label
    var bottomLabelStyle = {
      font: '20px Arial',
      fill: '#fff',
      align: 'center'
    };
    var bottomLabel = game.add.text(W / 2 + 0.5, H - 30, "try to save the rabbits by pressing space", bottomLabelStyle);
    bottomLabel.anchor.setTo(0.5, 0.5);
  },
  startGame: function() {
    game.state.start('Play');
  }
};

/*================================================================ PLAY
*/

Game.Play = function(game) {};
Game.Play.prototype = {
  create: function() {
    // var
    SCORE = 65;
    LEVEL = 0;
    this.changeLevel = true;

    // input
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spaceKey.onDown.add(this.jump, this);

    // player
    this.rabbits = game.add.group();
    this.rabbits.createMultiple(30, 'rabbit');

    // enemy
    this.bad = game.add.sprite(W / 2, H / 2, 'bad');
    this.bad.anchor.setTo(0.5, 1);
    this.bad.animations.add('walk', [0, 1], 5, true).play();
    game.physics.arcade.enable(this.bad);

    // circle
    this.circle = game.add.sprite(W / 2, H / 2, 'circle');
    this.circle.anchor.setTo(0.5, 0.5);

    // top label
    var topLabelStyle = {
      font: '20px Arial',
      fill: '#fff',
      align: 'center'
    };
    this.topLabel = game.add.text(W / 2 + 0.5, 30, "try to save the rabbits by pressing space", topLabelStyle);
    this.topLabel.anchor.setTo(0.5, 0.5);

    // middle label (LEVEL)
    var middleLabelStyle = {
      font: '80px Arial',
      fill: '#fff',
      align: 'center'
    };
    this.middleLabel = game.add.text(W / 2, H / 2, "10", middleLabelStyle);
    this.middleLabel.anchor.setTo(0.5, 0.5);

    // sound
    this.aSound = game.add.audio("a");
    this.aSound.volume = 0.3;
    this.eSound = game.add.audio("e");
    this.eSound.volume = 0.3;
    this.iSound = game.add.audio("i");
    this.iSound.volume = 0.3;
    this.oSound = game.add.audio("o");
    this.oSound.volume = 0.3;
    this.uSound = game.add.audio("u");
    this.uSound.volume = 0.3;
    this.gameMusic = game.add.audio('music');
    this.gameMusic.play('', 0, 0.4, false);
  },
  update: function() {
    game.physics.arcade.overlap(this.bad, this.rabbits, this.hit, null, this);

    // angle
    // 0 -> 180
    // -180 -> 0
    
    // prevent js lagging
    if (this.bad.angle >= -2 && this.bad.angle <= 2 && this.changeLevel) {
      this.changeLevel = false;
      this.drawLevel();

    } else if (this.bad.angle > 2) {
      this.changeLevel = true;
    }

    this.bad.angle += 1.2;

    var x = W / 2 + (this.circle.width / 2 - 4) * Math.cos(this.bad.rotation - Math.PI / 2);
    var y = H / 2 + (this.circle.width / 2 - 4) * Math.sin(this.bad.rotation - Math.PI / 2);
    this.bad.reset(x, y);
  },
  addRabbit: function(angle, i) {
    var rabbit = this.rabbits.getFirstDead();
    game.physics.arcade.enable(rabbit);
    rabbit.rotation = 0;
    rabbit.rotation = angle + Math.PI / 2;

    var xOut = W / 2 + (this.circle.width + 100) * Math.cos(angle);
    var yOut = H / 2 + (this.circle.width + 100) * Math.sin(angle);
    var xIn = W / 2 + (this.circle.width / 2 - 2) * Math.cos(angle);
    var yIn = H / 2 + (this.circle.width / 2 - 2) * Math.sin(angle);

    rabbit.jump = false;
    rabbit.alpha = 1;
    rabbit.pos = i;
    rabbit.reset(xOut, yOut);

    rabbit.anchor.setTo(0.5, 1);
    rabbit.t = game.add.tween(rabbit);
    rabbit.t.to({
      x: xIn,
      y: yIn
    }, 300).start();
  },
  hit: function(bad, rabbit) {
    rabbit.kill();
    SCORE--;

    var sound = game.add.audio("haho");
    sound.volume = 0.5;
    sound.play();
  },
  jumpSound: function() {
    var r = rand(5);
    if (r == 0) this.aSound.play();
    else if (r == 1) this.eSound.play();
    else if (r == 2) this.iSound.play();
    else if (r == 3) this.oSound.play();
    else if (r == 4) this.uSound.play();
  },
  jump: function() {
    var min = 20;
    var minR;

    this.rabbits.forEachAlive(function(r) {
      if (r.jump == false && r.pos < min) {
        min = r.pos;
        minR = r;
      }
    }, this);

    var rabbit = minR;
    if (min != 20 && !rabbit.t.isRunning) {
      this.jumpSound();
      var x = W / 2 + (this.circle.width / 2 + 90) * Math.cos(rabbit.rotation - Math.PI / 2);
      var y = H / 2 + (this.circle.width / 2 + 90) * Math.sin(rabbit.rotation - Math.PI / 2);
      rabbit.t2 = game.add.tween(rabbit)
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
  drawLevel: function() {
    console.log('LEVEL', LEVEL);
    if (LEVEL == 9) {
      game.state.start('End');
      return;
    }

    // fade and kill alive rabbit
    this.rabbits.forEachAlive(function(r) {
      var t = game.add.tween(r).to({
        alpha: 0
      }, 300).start();

      t.onComplete.add(function() {
        this.kill()
      }, r);
    }, this);

    // update middle label
    this.middleLabel.setText(9 - LEVEL);

    // fade top label
    if (LEVEL == 1) {
      game.add.tween(this.topLabel).to({
        alpha: 0
      }, 500).start();
    }

    // show rabbit
    var l = MAP[LEVEL];
    for (var i = 0; i < l.length; i++) {
      if (l[i] != 0) {
        this.addRabbit(i * (Math.PI / 10), i);
      }
    }

    LEVEL += 1;
  }
};

/*================================================================ END
*/

Game.End = function(game) {};
Game.End.prototype = {
  create: function() {
    if (SCORE > BEST_SCORE) {
      BEST_SCORE = SCORE;
    }

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.startGame, this);

    // circle
    this.circle = game.add.sprite(W / 2, H / 2, 'circle');
    this.circle.anchor.setTo(0.5, 0.5);

    // top
    var topLabelStyle = {
      font: '30px Arial',
      fill: '#fff',
      align: 'center'
    };
    var topLabel = game.add.text(W / 2 + 0.5, 40, "you saved " + SCORE + " rabbits", topLabelStyle);
    topLabel.anchor.setTo(0.5, 0.5);

    var top2LabelStyle = {
      font: '20px Arial',
      fill: '#fff',
      align: 'center'
    };
    var top2Label = game.add.text(W / 2 + 0.5, 70, "best SCORE: " + BEST_SCORE, top2LabelStyle);
    top2Label.anchor.setTo(0.5, 0.5);

    var middleLabelStyle = {
      font: '20px Arial',
      fill: '#fff',
      align: 'center'
    };
    var middleLabel = game.add.text(W / 2 + 0.5, H / 2 + 0.5, "press space to\nrestart the game", middleLabelStyle);
    middleLabel.anchor.setTo(0.5, 0.5);

    var bottomLabelStyle = {
      font: '20px Arial',
      fill: '#fff',
      align: 'center'
    };
    bottomLabel = game.add.text(W / 2 - 70 + 0.5, H - 50, "share your SCORE on Twitter:", bottomLabelStyle);
    bottomLabel.anchor.setTo(0.5, 0.5);

    var t = game.add.button(W / 2 + 135, H - 50, 'tweet', this.tweet, this);
    t.scale.setTo(0.8, 0.8);
    t.anchor.setTo(0.5, 0.5);
    game.add.tween(t.scale).to({
      x: 0.85,
      y: 0.85
    }, 300).to({
      x: 0.8,
      y: 0.8
    }, 300).loop().start();

    this.currentTime = game.time.now + 500;

    if (LEVEL == 9) {
      var sound = game.add.audio("yeah");
      sound.volume = 0.5;
      sound.play();
    }

    game.world.alpha = 0;
    game.add.tween(game.world).to({
      alpha: 1
    }, 1000).start();
  },
  startGame: function() {
    if (this.currentTime < game.time.now) {
      game.world.alpha = 1;
      game.state.start('Play');
    }
  },
  tweet: function() {
    window.open('http://twitter.com/share?text=I+just+saved+' + SCORE + '+rabbits+at+"I+Hate+Rabbits"+game!+Try+to+beat+me+here&via=joejojoee&url=http://jojoee.github.io/phaser-examples/i-hate-rabbits/', '_blank');
  }
};

var game = new Phaser.Game(W, H, Phaser.CANVS, 'game-container');

game.state.add('Boot', Game.Boot);
game.state.add('Load', Game.Load);
game.state.add('Menu', Game.Menu);
game.state.add('Play', Game.Play);
game.state.add('End', Game.End);
game.state.start('Boot');