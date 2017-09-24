var game;
var gameOptions = {
  gameWidth: 800,
  floorStart: 1 / 8 * 5,
  floorGap: 250,
  playerGravity: 10000,
  playerSpeed: 450,
  climbSpeed: 450,
  playerJump: 1800,
  diamondRatio: 2,
  doubleSpikeRatio: 1,
  skyColor: 0xaaeaff,
  safeRadius: 180,
  localStorageName: "climbgame",
  versionNumber: "1.0"
}
window.onload = function () {
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  if (windowWidth > windowHeight) {
    windowHeight = windowWidth * 1.8
  }
  game = new Phaser.Game(gameOptions.gameWidth, windowHeight * gameOptions.gameWidth / windowWidth);
  game.state.add("PreloadGame", preloadGame);
  game.state.add("PlayGame", playGame);
  game.state.start("PreloadGame");
}
var preloadGame = function (game) {}
preloadGame.prototype = {
  preload: function () {
    game.stage.backgroundColor = gameOptions.skyColor;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.disableVisibilityChange = true;
    game.load.image("floor", "assets/floor.png");
    game.load.image("hero", "assets/hero.png");
    game.load.image("ladder", "assets/ladder.png");
    game.load.image("diamond", "assets/diamond.png");
    game.load.image("diamondparticle", "assets/diamondparticle.png");
    game.load.image("spike", "assets/spike.png");
    game.load.image("cloud", "assets/cloud.png");
    game.load.image("tap", "assets/tap.png");
    game.load.bitmapFont("font", "assets/font.png", "assets/font.fnt");
  },
  create: function () {
    game.state.start("PlayGame");
  }
}
var playGame = function (game) {}
playGame.prototype = {
  create: function () {
    this.savedData = localStorage.getItem(gameOptions.localStorageName) == null ? {
      score: 0
    } : JSON.parse(localStorage.getItem(gameOptions.localStorageName));
    this.gameOver = false;
    this.reachedFloor = 0;
    this.collectedDiamonds = 0;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.canJump = true;
    this.isClimbing = false;
    this.defineGroups();
    this.emitter = game.add.emitter(0, 0, 80);
    this.emitter.makeParticles("diamondparticle");
    this.emitter.setAlpha(0.4, 0.6);
    this.emitter.setScale(0.4, 0.6, 0.4, 0.6);
    this.gameGroup.add(this.emitter);
    this.drawLevel();
    this.defineTweens();
    this.createMenu();
    this.createOverlay();
    game.input.onTap.add(this.handleTap, this);
  },
  createOverlay: function () {
    var cloud = game.add.sprite(0, game.height, "cloud");
    cloud.anchor.set(0, 1);
    cloud.tint = gameOptions.skyColor;
    this.overlayGroup.add(cloud);
    var highScoreText = game.add.bitmapText(game.width - 10, game.height - 10, "font", "Best Score: " + this.savedData.score.toString(), 30);
    highScoreText.anchor.set(1, 1);
    this.overlayGroup.add(highScoreText);
    this.scoreText = game.add.bitmapText(10, game.height - 10, "font", "Score: 0", 30);
    this.scoreText.anchor.set(0, 1);
    this.overlayGroup.add(this.scoreText);
  },
  createMenu: function () {
    var tap = game.add.sprite(game.width / 2, game.height - 150, "tap");
    tap.anchor.set(0.5);
    this.menuGroup.add(tap);
    tapTween = game.add.tween(tap).to({
      alpha: 0
    }, 200, Phaser.Easing.Cubic.InOut, true, 0, -1, true);
    var tapText = game.add.bitmapText(game.width / 2, tap.y - 120, "font", "Tap to jump", 45);
    tapText.anchor.set(0.5);
    this.menuGroup.add(tapText);
    var titleText = game.add.bitmapText(game.width / 2, tap.y - 200, "font", "LADDERZ", 90);
    titleText.anchor.set(0.5);
    this.menuGroup.add(titleText);
  },
  drawLevel: function () {
    this.currentFloor = 0;
    this.highestFloorY = game.height * gameOptions.floorStart;
    this.floorsBeforeDisappear = Math.ceil((game.height - game.height * (gameOptions.floorStart)) / gameOptions.floorGap) + 1;
    this.floorPool = [];
    this.ladderPool = [];
    this.diamondPool = [];
    this.spikePool = [];
    while (this.highestFloorY > -2 * gameOptions.floorGap) {
      this.addFloor();
      if (this.currentFloor > 0) {
        this.addLadder();
        this.addDiamond();
        this.addSpike();
      }
      this.highestFloorY -= gameOptions.floorGap;
      this.currentFloor++;
    }
    this.highestFloorY += gameOptions.floorGap;
    this.currentFloor = 0;
    this.addHero();
  },
  addFloor: function () {
    if (this.floorPool.length > 0) {
      var floor = this.floorPool.pop();
      floor.y = this.highestFloorY;
      floor.revive();
    } else {
      var floor = game.add.sprite(0, this.highestFloorY, "floor");
      this.floorGroup.add(floor);
      game.physics.enable(floor, Phaser.Physics.ARCADE);
      floor.body.immovable = true;
      floor.body.checkCollision.down = false;
    }
  },
  addLadder: function () {
    var ladderXPosition = game.rnd.integerInRange(50, game.width - 50);
    if (this.ladderPool.length > 0) {
      var ladder = this.ladderPool.pop();
      ladder.x = ladderXPosition;
      ladder.y = this.highestFloorY;
      ladder.revive();
    } else {
      var ladder = game.add.sprite(ladderXPosition, this.highestFloorY, "ladder");
      this.ladderGroup.add(ladder);
      ladder.anchor.set(0.5, 0);
      game.physics.enable(ladder, Phaser.Physics.ARCADE);
      ladder.body.immovable = true;
    }
    this.safeZone = [];
    this.safeZone.length = 0;
    this.safeZone.push({
      start: ladderXPosition - gameOptions.safeRadius,
      end: ladderXPosition + gameOptions.safeRadius
    });
  },
  addDiamond: function () {
    if (game.rnd.integerInRange(0, gameOptions.diamondRatio) != 0) {
      var diamondX = game.rnd.integerInRange(50, game.width - 50);
      if (this.diamondPool.length > 0) {
        var diamond = this.diamondPool.pop();
        diamond.x = diamondX;
        diamond.y = this.highestFloorY - gameOptions.floorGap / 2;
        diamond.revive();
      } else {
        var diamond = game.add.sprite(diamondX, this.highestFloorY - gameOptions.floorGap / 2, "diamond");
        diamond.anchor.set(0.5);
        game.physics.enable(diamond, Phaser.Physics.ARCADE);
        diamond.body.immovable = true;
        this.diamondGroup.add(diamond);
      }
    }
  },
  addSpike: function () {
    var spikes = 1;
    if (game.rnd.integerInRange(0, gameOptions.doubleSpikeRatio) == 0) {
      spikes = 2;
    }
    for (var i = 1; i <= spikes; i++) {
      var spikeXPosition = this.findSpikePosition();
      if (spikeXPosition) {
        if (this.spikePool.length > 0) {
          var spike = this.spikePool.pop();
          spike.x = spikeXPosition;
          spike.y = this.highestFloorY - 20;
          spike.revive();
        } else {
          var spike = game.add.sprite(spikeXPosition, this.highestFloorY - 20, "spike");
          spike.anchor.set(0.5, 0);
          game.physics.enable(spike, Phaser.Physics.ARCADE);
          spike.body.immovable = true;
          this.spikeGroup.add(spike);
        }
      }
    }
  },
  findSpikePosition: function () {
    var attempts = 0;
    do {
      attempts++;
      var posX = game.rnd.integerInRange(150, game.width - 150)
    } while (!this.isSafe(posX) && attempts < 10);
    if (this.isSafe(posX)) {
      this.safeZone.push({
        start: posX - gameOptions.safeRadius,
        end: posX + gameOptions.safeRadius
      })
      return posX;
    }
    return false;
  },
  isSafe: function (n) {
    for (var i = 0; i < this.safeZone.length; i++) {
      if (n > this.safeZone[i].start && n < this.safeZone[i].end) {
        return false;
      }
    }
    return true;
  },
  addHero: function () {
    this.hero = game.add.sprite(game.width / 2, game.height * gameOptions.floorStart - 40, "hero");
    this.gameGroup.add(this.hero)
    this.hero.anchor.set(0.5, 0);
    game.physics.enable(this.hero, Phaser.Physics.ARCADE);
    this.hero.body.collideWorldBounds = true;
    this.hero.body.gravity.y = gameOptions.playerGravity;
    this.hero.body.velocity.x = gameOptions.playerSpeed;
    this.hero.body.onWorldBounds = new Phaser.Signal();
    this.hero.body.onWorldBounds.add(function (sprite, up, down, left, right) {
      if (left) {
        this.hero.body.velocity.x = gameOptions.playerSpeed;
        this.hero.scale.x = 1;
      }
      if (right) {
        this.hero.body.velocity.x = -gameOptions.playerSpeed;
        this.hero.scale.x = -1;
      }
      if (down) {
        var score = this.reachedFloor * this.collectedDiamonds;
        localStorage.setItem(gameOptions.localStorageName, JSON.stringify({
          score: Math.max(score, this.savedData.score)
        }));
        game.state.start("PlayGame");
      }
    }, this)
  },
  defineTweens: function () {
    this.tweensToGo = 0;
    this.scrollTween = game.add.tween(this.gameGroup);
    this.scrollTween.to({
      y: gameOptions.floorGap
    }, 500, Phaser.Easing.Cubic.Out);
    this.scrollTween.onComplete.add(function () {
      this.gameGroup.y = 0;
      this.gameGroup.forEach(function (item) {
        if (item.length > 0) {
          item.forEach(function (subItem) {
            subItem.y += gameOptions.floorGap;
            if (subItem.y > game.height) {
              switch (subItem.key) {
                case "floor":
                  this.killFloor(subItem);
                  break;
                case "ladder":
                  this.killLadder(subItem);
                  break;
                case "diamond":
                  this.killDiamond(subItem);
                  break;
                case "spike":
                  this.killSpike(subItem);
                  break;
              }
            }
          }, this);
        } else {
          item.y += gameOptions.floorGap;
        }
      }, this);
      this.addFloor();
      this.addLadder();
      this.addDiamond();
      this.addSpike();
      if (this.tweensToGo > 0) {
        this.tweensToGo--;
        this.scrollTween.start();
      }
    }, this);
  },
  defineGroups: function () {
    this.gameGroup = game.add.group();
    this.floorGroup = game.add.group();
    this.ladderGroup = game.add.group();
    this.diamondGroup = game.add.group();
    this.spikeGroup = game.add.group();
    this.overlayGroup = game.add.group();
    this.menuGroup = game.add.group();
    this.gameGroup.add(this.floorGroup);
    this.gameGroup.add(this.ladderGroup);
    this.gameGroup.add(this.diamondGroup);
    this.gameGroup.add(this.spikeGroup);
  },
  handleTap: function (pointer, doubleTap) {
    if (this.menuGroup != null) {
      this.menuGroup.destroy();
    }
    if (this.canJump && !this.isClimbing && !this.gameOver) {
      this.hero.body.velocity.y = -gameOptions.playerJump;
      this.canJump = false;
    }
  },
  update: function () {
    if (!this.gameOver) {
      this.checkFloorCollision();
      this.checkLadderCollision();
      this.checkDiamondCollision();
      this.checkSpikeCollision();
    }
  },
  checkFloorCollision: function () {
    game.physics.arcade.collide(this.hero, this.floorGroup, function () {
      this.canJump = true;
    }, null, this);
  },
  checkLadderCollision: function () {
    if (!this.isClimbing) {
      game.physics.arcade.overlap(this.hero, this.ladderGroup, function (player, ladder) {
        if (Math.abs(player.x - ladder.x) < 10) {
          this.ladderToClimb = ladder;
          this.hero.body.velocity.x = 0;
          this.hero.body.velocity.y = -gameOptions.climbSpeed;
          this.hero.body.gravity.y = 0;
          this.isClimbing = true;
          if (this.scrollTween.isRunning) {
            this.tweensToGo++;
          } else {
            this.scrollTween.start();
          }
        }
      }, null, this);
    } else {
      if (this.hero.y < this.ladderToClimb.y - 40) {
        this.hero.body.gravity.y = gameOptions.playerGravity;
        this.hero.body.velocity.x = gameOptions.playerSpeed * this.hero.scale.x;
        this.hero.body.velocity.y = 0;
        this.isClimbing = false;
        this.reachedFloor++;
        this.scoreText.text = (this.collectedDiamonds * this.reachedFloor).toString();
      }
    }
  },
  checkDiamondCollision: function () {
    game.physics.arcade.overlap(this.hero, this.diamondGroup, function (player, diamond) {
      this.emitter.x = diamond.x;
      this.emitter.y = diamond.y;
      this.emitter.start(true, 1000, null, 20);
      this.collectedDiamonds++;
      this.scoreText.text = (this.collectedDiamonds * this.reachedFloor).toString();
      this.killDiamond(diamond);
    }, null, this);
  },
  checkSpikeCollision: function () {
    game.physics.arcade.overlap(this.hero, this.spikeGroup, function () {
      this.gameOver = true;
      this.hero.body.velocity.x = game.rnd.integerInRange(-20, 20);
      this.hero.body.velocity.y = -gameOptions.playerJump;
      this.hero.body.gravity.y = gameOptions.playerGravity;
    }, null, this);
  },
  killFloor: function (floor) {
    floor.kill();
    this.floorPool.push(floor);
  },
  killLadder: function (ladder) {
    ladder.kill();
    this.ladderPool.push(ladder);
  },
  killDiamond: function (diamond) {
    diamond.kill();
    this.diamondPool.push(diamond);
  },
  killSpike: function (spike) {
    spike.kill();
    this.spikePool.push(spike);
  },
}