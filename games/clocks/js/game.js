var game;
var gridSize = 40;
var levelWidth = 8;
var levelHeight = 8;
var level = 0;
var ballSpeed = 600;
window.onload = function() {
  game = new Phaser.Game(640, 960, Phaser.AUTO, "");
  game.state.add("Boot", boot);
  game.state.add("Preload", preload);
  game.state.add("PlayGame", playGame);
  game.state.start("Boot");
}
var boot = function(game) {};
boot.prototype = {
  preload: function() {
    this.game.load.image("loading", "assets/sprites/loading.png");
  },
  create: function() {
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.state.start("Preload");
  }
}
var preload = function(game) {};
preload.prototype = {
  preload: function() {
    game.load.spritesheet("smallclock", "assets/sprites/smallclock.png", 70, 70);
    game.load.spritesheet("smallhand", "assets/sprites/smallhand.png", 70, 70);
    game.load.spritesheet("bigclock", "assets/sprites/bigclock.png", 140, 140);
    game.load.spritesheet("bighand", "assets/sprites/bighand.png", 140, 140);
    game.load.image("smallclockface", "assets/sprites/smallclockface.png");
    game.load.image("bigclockface", "assets/sprites/bigclockface.png");
    game.load.image("ball", "assets/sprites/ball.png");
  },
  create: function() {
    game.state.start("PlayGame");
  }
}
var playGame = function(game) {};
playGame.prototype = {
  create: function() {
    this.canFire = true;
    this.reached = 1;
    this.totalClocks = 0;
    this.clockGroup = game.add.group();
    this.ballGroup = game.add.group();
    this.clockGroup.y = (game.height - gridSize * 16) / 2;
    this.ballGroup.y = (game.height - gridSize * 16) / 2;
    this.clocksArray = [];
    game.stage.backgroundColor = 0x2babca;
    for (var i = 0; i < levels[level].tiledOutput.length; i++) {
      switch (levels[level].tiledOutput[i]) {
        case 1:
          this.clocksArray[i] = this.placeClock(new Phaser.Point(i % levelWidth * 2 + 1, Math.floor(i / levelHeight) * 2 + 1), "small");
          break;
        case 2:
          this.clocksArray[i] = this.placeClock(new Phaser.Point(i % levelWidth * 2 + 2, Math.floor(i / levelHeight) * 2), "big");
          break;
      }
    }
    do {
      startClock = game.rnd.between(0, levels[level].tiledOutput.length - 1);
    } while (levels[level].tiledOutput[startClock] == 0);
    this.clocksArray[startClock].frame = 1;
    this.clocksArray[startClock].tint = 0x2babca;
    this.clocksArray[startClock].children[0].visible = true;
    this.clocksArray[startClock].children[1].frame = 1;
    this.clocksArray[startClock].children[1].tint = 0xffffff;
    this.activeClock = this.clocksArray[startClock];
    game.input.onDown.add(this.fireBall, this);
  },
  update: function() {
    var clockHit = false;
    game.physics.arcade.overlap(this.ball, this.clockGroup, function(ball, clock) {
      if (!clockHit) {
        clock.frame = 1;
        clock.tint = 0x2babca;
        clock.children[0].visible = true;
        clock.children[1].frame = 1;
        clock.children[1].tint = 0xffffff;
        this.activeClock = clock;
        clockHit = true;
      }
    }, null, this);
    if (clockHit) {
      this.ball.destroy();
      this.reached++;
      console.log(this.reached)
      console.log(this.clocksArray.length)
      if (this.reached < this.totalClocks) {
        this.canFire = true;
      } else {
        game.time.events.add(Phaser.Timer.SECOND * 1, function() {
          level = (level + 1) % 10;
          game.state.start("PlayGame");
        });
      }
    }
  },
  placeClock: function(clockObj, prefix) {
    var clockSprite = game.add.sprite(clockObj.x * gridSize, clockObj.y * gridSize, prefix + "clock");
    clockSprite.anchor.set(0.5);
    game.physics.enable(clockSprite, Phaser.Physics.ARCADE);
    var faceSprite = game.add.sprite(0, 0, prefix + "clockface");
    faceSprite.anchor.set(0.5);
    faceSprite.visible = false;
    clockSprite.addChild(faceSprite);
    var handSprite = game.add.sprite(0, 0, prefix + "hand");
    handSprite.anchor.set(0.5);
    handSprite.tint = 0x2babca;
    handSprite.angle = game.rnd.between(0, 359);
    game.physics.enable(handSprite, Phaser.Physics.ARCADE);
    handSprite.body.angularVelocity = game.rnd.between(levels[level].clockSpeed[0], levels[level].clockSpeed[1]) * (1 - 2 * game.rnd.between(0, 1));
    clockSprite.addChild(handSprite);
    this.clockGroup.add(clockSprite);
    this.totalClocks++;
    return clockSprite;
  },
  fireBall: function() {
    if (this.canFire) {
      this.canFire = false;
      var handAngle = this.activeClock.children[1].angle;
      this.ball = game.add.sprite(this.activeClock.x, this.activeClock.y, "ball");
      this.ball.anchor.set(0.5);
      game.physics.enable(this.ball, Phaser.Physics.ARCADE);
      this.ball.checkWorldBounds = true;
      this.ball.events.onOutOfBounds.add(function() {
        game.state.start("PlayGame");
      });
      this.ballGroup.add(this.ball);
      this.ball.body.velocity = game.physics.arcade.velocityFromAngle(handAngle, ballSpeed);
      this.activeClock.destroy();
    }
  }
}
var levels = [
  // level 1
  {
    clockSpeed: [200, 450],
    tiledOutput: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  // level 2
  {
    clockSpeed: [200, 450],
    tiledOutput: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  // level 3
  {
    clockSpeed: [200, 450],
    tiledOutput: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  // level 4
  {
    clockSpeed: [200, 450],
    tiledOutput: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  // level 5
  {
    clockSpeed: [200, 450],
    tiledOutput: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  // level 6
  {
    clockSpeed: [200, 450],
    tiledOutput: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  // level 7
  {
    clockSpeed: [200, 450],
    tiledOutput: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  // level 8
  {
    clockSpeed: [200, 450],
    tiledOutput: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  // level 9
  {
    clockSpeed: [200, 450],
    tiledOutput: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0]
  },
  // level 10
  {
    clockSpeed: [200, 450],
    tiledOutput: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0]
  }
]