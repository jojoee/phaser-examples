window.onload = function() {
  //be cool, support game development!
  var supportTimer = setTimeout((function() {
    $('#fi').removeClass('hide');
  }), 3000);
  var game, gameState

  function removeCover() {
    $('#gameCover').css('display', 'none');
  }
  game = new Phaser.Game(500, 320, Phaser.CANVAS, 'game');
  gameState = function(game) {};
  gameState.prototype = {
    init: function(data) {
      if (typeof data.initFunc == 'function') {
        this.initFunc = data.initFunc;
      }
    },
    preload: function() {
      var backgroundImage = new Image();
      var midGroundImage = new Image();
      var rockImage = new Image();
      var backgroundImageUri = imagesData[0];
      var midGroundImageUri = imagesData[1];
      var rockImageUri = imagesData[2];
      backgroundImage.src = backgroundImageUri;
      midGroundImage.src = midGroundImageUri;
      rockImage.src = rockImageUri;
      this.game.cache.addImage('backgroundData', backgroundImageUri, backgroundImage);
      this.game.cache.addImage('midGroundData', midGroundImageUri, midGroundImage);
      this.game.cache.addImage('rockData', rockImageUri, rockImage);
      var cachedBackgroundImage = this.game.cache.getImage('backgroundData').src;
      var cachedMidGroundImage = this.game.cache.getImage('midGroundData').src;
      var cachedRockImage = this.game.cache.getImage('rockData').src;
      this.game.load.image('background', cachedBackgroundImage);
      this.game.load.image('midground', cachedMidGroundImage);
      this.game.load.image('rock', cachedRockImage);
    },
    create: function() {
      this.game.stage.backgroundColor = "#7c8b92";
      //world
      this.world.setBounds(0, 0, 1000, this.game.height);
      //physics
      //arcade for debris
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.game.physics.p2.gravity.y = 1000;
      this.game.physics.p2.world.defaultContactMaterial.friction = 0.3;
      this.game.physics.p2.world.setGlobalStiffness(1e5);
      //controls
      this.cursor = this.game.input.keyboard.createCursorKeys();
      //game settings
      this.platformHeightIncrement = 10;
      this.defaultPlatformY = 250;
      this.defaultPlatformWidth = 200;
      this.initialSpeed = 150;
      this.currentWorldSpeed = this.initialSpeed;
      this.platformDeathPoint = -100;
      this.platformSpawnPoint = 400;
      this.spawningPlatform = false;
      this.previousPlatform = {};
      this.chanceOfSkip = 0
      //groups
      this.background = this.game.add.group();
      this.midground = this.game.add.group();
      this.garbage = this.game.add.group();
      this.entities = this.game.add.group();
      this.collectables = this.game.add.group();
      this.platforms = this.game.add.group();
      this.textLayer = this.game.add.group();
      this.renderGroup = this.game.add.group();
      this.scoreText = this.game.add.text(50, 30, "", {
        fill: "#005a5a",
        font: "bold 10px 'Press Start 2P', sans-serif"
      });
      this.scoreText.anchor.setTo(0, 0);
      this.scoreText.stroke = "#FFFFFF";
      this.scoreText.strokeThickness = 3;
      this.scoreText.setShadow(0, 5, "rgba(0,0,0,0.1)", 1);
      this.textLayer.add(this.scoreText);
      //background
      this.backgroundImage = this.game.add.tileSprite(0, -70, 1028, 256, 'background');
      this.background.add(this.backgroundImage);
      this.midgroundImage = this.game.add.tileSprite(0, 0, 700, 400, 'midground');
      this.midgroundImage2 = this.game.add.tileSprite(this.midgroundImage.x + this.midgroundImage.width, 0, 700, 400, 'midground');
      this.midground.add(this.midgroundImage);
      this.midground.add(this.midgroundImage2);
      this.game.physics.arcade.enable(this.midgroundImage)
      this.game.physics.arcade.enable(this.midgroundImage2)
      //entites
      this.player = new Player(this.game, this, 50, 50, '');
      this.entities.add(this.player)
      //platforms
      for (var i = 0; i < 30; i++) {
        var p = new Platform(this.game, this, 1000, 0);
        this.platforms.add(p);
        p.kill();
      }
      //rocks to trip up the player
      for (var i = 0; i < 30; i++) {
        var r = this.game.add.sprite(1000, 0, 'rock');
        r.height = 10;
        r.width = 25;
        r.anchor.setTo(0.5, 0);
        if (this.randomBool) {
          r.scale.x = -1;
        }
        this.game.physics.arcade.enable(r, true);
        r.body.collideWorldBounds = false;
        r.body.immovable = true;
        this.garbage.add(r);
        r.kill();
      }
      //collectables
      for (var i = 0; i < 50; i++) {
        var c = this.game.add.sprite(1000, 0, '');
        c.width = 10;
        c.height = 10;
        c.skin = this.game.add.graphics(c.x, c.y);
        c.skin.beginFill(0x00FFFF, 1);
        c.skin.drawEllipse(0, 0, 10, 10);
        c.skin.endFill
        c.anchor.setTo(0.5);
        this.game.physics.enable(c);
        c.body.immovable = true;
        this.collectables.add(c);
        this.entities.add(c.skin)
        c.kill();
      }
      //set initial platforms
      for (var i = 0; i < 5; i++) {
        this.spawnPlatform(i * this.defaultPlatformWidth, this.defaultPlatformY, 0, 0)
      }
      //renderGroups
      this.renderGroup.add(this.background)
      this.renderGroup.add(this.midground)
      this.renderGroup.add(this.garbage)
      this.renderGroup.add(this.platforms)
      this.renderGroup.add(this.entities)
      this.renderGroup.add(this.collectables)
      this.renderGroup.add(this.textLayer)
      if (this.initFunc) {
        this.initFunc.call();
      }
      //timer
      this.platformSkipTimer = Date.now();
      this.gameTimer = Date.now();
    },
    spawnPlatform: function(x, y, h, rotation) {
      var p = this.platforms.getFirstExists(false);
      var ny = y + (p.height / 2) - h;
      var nx = x + (p.width / 2)
      p.reset(nx, ny);
      p.body.rotation = 0;
      if (typeof rotation !== 'undefined') {
        p.body.rotation = rotation;
      } else {
        if (Math.random() < 0.5) {
          var left = this.randomBool();
          p.body.rotation = left ? 30 : -30
        } else {
          p.body.rotation = 0;
        }
      }
      this.previousPlatform = p;
      //add rocks?
      //for now, rocks can be inside their platforms
      //I'll adjust for slopes later.
      p.rock = this.garbage.getFirstExists(false);
      if (Math.random() < 0.3) {
        var rx = p.x - p.width / 2;
        var ry = p.y - p.height / 2 - p.rock.height;
        if (p.body.rotation < 0) {
          ry += 15;
        }
        if (p.body.rotation > 0) {
          ry -= 15;
        }
        p.rock.reset(rx, ry)
      }
      //throw in some collects
      //TODO
      if (Math.random() < 0.5) {
        var numCollects = this.randomInt(2, 6);
        var interval = this.defaultPlatformWidth / numCollects;
        console.log(interval)
        for (var i = 0; i < numCollects; i++) {
          var c = this.collectables.getFirstExists(false);
          c.reset(p.x - (p.width / 2) + (i * interval), p.y - (p.height / 2) - 50)
          c.y -= Math.random() * 50;
          c.body.velocity.x = -(this.currentWorldSpeed);
        }
      }
      return p.body.rotation;
      // p.move();
    },
    random: function(min, max) {
      return (min + (Math.random() * (max - min)));
    },
    randomInt: function(min, max) {
      return Math.round(this.random(min, max));
    },
    randomChoice: function(choices) {
      return choices[this.randomInt(0, choices.length - 1)];
    },
    randomBool: function() {
      return this.randomChoice([true, false]);
    },
    update: function() {
      this.platformCheck = [];
      this.doCollisions();
      this.platforms.forEach((function(platform) {
        //check for spawn
        if (platform.x > this.platformSpawnPoint && platform.left < 900) {
          this.platformCheck.push(platform)
        }
        platform.speed = this.currentWorldSpeed;
        if (platform.rock) {
          platform.rock.body.velocity.x = -this.currentWorldSpeed;
        }
        if (platform.x < this.platformDeathPoint) {
          platform.x = 1000;
          platform.kill();
        }
      }), this);
      this.collectables.forEach((function(c) {
        c.skin.x = c.x;
        c.skin.y = c.y
        if (c.x < -50) {
          c.x = 1000;
          c.kill();
        }
      }), this)
      this.garbage.forEach((function(g) {
        if (g.x < -50) {
          g.x = 1000;
          g.kill();
        }
      }), this)
      if (this.platformCheck.length < 2 && !this.spawningPlatform) {
        this.spawningPlatform = true;
        var pr = this.previousPlatform.body.rotation;
        //var x = this.platformSpawnPoint + this.defaultPlatformWidth + (this.defaultPlatformWidth / 2);
        var r = this.randomChoice([-30, 0, 30]);
        if (pr != 0) {
          r = 0;
        } else {
          if (this.previousPlatform.y > this.defaultPlatformY + 100) {
            r = -30;
          }
          if (this.previousPlatform.y < 220) {
            r = 30;
          }
        }
        var x = this.previousPlatform.x + (this.previousPlatform.width / 2);
        var y = this.previousPlatform.y - (this.previousPlatform.height / 2)
        if (r < 0) {
          x += 15;
          y -= 15;
        } else if (r > 0) {
          x -= 15;
          y += 15;
        } else {
          if (pr > 0) {
            y += 16
            x += 15
          }
          if (pr < 0) {
            y -= 14
            x -= 15
          }
        }
        var h = 0;
        var sp = this.spawnPlatform(x, y, h, r)
        this.game.time.events.add(300, (function() {
          this.spawningPlatform = false;
        }), this)
      }
      //scroll background
      if (this.midgroundImage.x + this.midgroundImage.width < 0) {
        this.midgroundImage.x = this.midgroundImage2.x + this.midgroundImage2.width;
      }
      if (this.midgroundImage2.x + this.midgroundImage2.width < 0) {
        this.midgroundImage2.x = this.midgroundImage.x + this.midgroundImage.width;
      }
      this.midgroundImage.body.velocity.x = -(this.currentWorldSpeed * 0.5);
      this.midgroundImage2.body.velocity.x = -(this.currentWorldSpeed * 0.5);
      this.player.speed = 7; //because magic!!
      this.scoreText.setText("collected: " + this.player.score);
      this.gameTimer = Date.now();
    },
    doCollisions: function() {
      this.game.physics.arcade.overlap(this.player.arcadeCollider, this.garbage, (function(player, garbage) {
        this.player.trip();
      }), null, this);
      this.game.physics.arcade.overlap(this.player.arcadeCollider, this.collectables, (function(player, c) {
        this.player.collectItem(1);
        c.x = 1000;
        c.kill();
      }), null, this);
    },
    render: function() {
      this.game.debug.body(this.player.arcadeCollider)
    }
  }
  game.state.add('gameState', gameState);
  game.state.start('gameState', false, false, {
    initFunc: removeCover
  });
}
var Player = function(game, scene, x, y, spritesheet) {
  Phaser.Sprite.call(this, game, x, y, spritesheet)
  this.scene = scene;
  this.cursor = this.scene.cursor;
  this.game.input.keyboard.callbackContext = this;
  this.width = 25;
  this.height = 30;
  this.left = 0;
  this.right = 0;
  this.game.physics.p2.enable(this);
  this.anchor.setTo(0.5, 1)
  this.body.fixedRotation = true;
  this.body.damping = 0.8;
  this.speed = 100;
  this.speedMod = 0;
  this.score = 0;
  this.currentSpeed = this.speed;
  this.holdingJump = false;
  this.tripped = false;
  this.tripTimer = Date.now();
  //for collisions with crap
  this.arcadeCollider = this.game.add.sprite(this.x, this.y, '');
  this.arcadeCollider.anchor.setTo(0.5);
  this.game.physics.arcade.enable(this.arcadeCollider);
  //drawn skin
  this.skin = this.game.add.graphics(this.x, this.y);
  this.skin.beginFill(0x0000FF, 1);
  this.skin.drawRect(-(this.width / 2), -(this.height / 2), this.width, this.height);
  this.jumpTimer = Date.now()
}
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player
Player.prototype.update = function() {
  this.movePlayer();
  if (this.scene.gameTimer < this.jumpTimer && !this.holdingJump) {
    this.body.velocity.y = 100;
  }
  if (this.tripped && this.scene.gameTimer > this.tripTimer) {
    this.tripped = false;
  }
  if (this.tripped) {
    this.body.rotation += 0.05;
    this.speedMod = -50
  } else {
    this.body.rotation = 0;
  }
  this.currentSpeed = this.speed + this.speedMod
  this.body.moveRight(this.currentSpeed);
  this.skin.x = this.x;
  this.skin.y = this.y;
  this.left = this.skin.x;
  this.right = this.skin.x + this.width;
  this.arcadeCollider.x = this.x;
  this.arcadeCollider.y = this.y;
}
Player.prototype.movePlayer = function() {
  if (this.cursor.up.isDown && this.canJump(this) && this.scene.gameTimer > this.jumpTimer) {
    this.holdingJump = true;
    this.jumpTimer = Date.now() + 300
    this.body.moveUp(500)
  }
  if (this.cursor.right.isDown) {
    this.speedMod = 45;
  } else if (this.cursor.left.isDown) {
    this.speedMod = -45;
  } else {
    this.speedMod = 0;
  }
  this.game.input.keyboard.onUpCallback = (function(e) {
    var key = e.keyCode;
    if (key == this.cursor.up.keyCode) {
      this.holdingJump = false;
    }
  })
}
Player.prototype.trip = function() {
  this.tripped = true;
  this.tripTimer = Date.now() + 1000;
}
Player.prototype.canJump = function(someone) {
  var yAxis = p2.vec2.fromValues(0, 1);
  var result = false;
  for (var i = 0; i < this.game.physics.p2.world.narrowphase.contactEquations.length; i++) {
    var c = this.game.physics.p2.world.narrowphase.contactEquations[i]; // cycles through all the contactEquations until it finds our "someone"
    if (c.bodyA === someone.body.data || c.bodyB === someone.body.data) {
      var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
      if (c.bodyA === someone.body.data) d *= -1;
      if (d > 0.5) result = true;
    }
  }
  return result;
}
Player.prototype.collectItem = function(points) {
    this.score += points;
  }
  //-------END OF PLAYER ------------//
var Platform = function(game, scene, x, y) {
  this.defaultSectionWidth = scene.defaultPlatformWidth;
  this.defaultHeight = 200;
  this.speed = 100;
  var ny = (y + (this.defaultHeight / 2));
  var nx = (x + (this.defaultSectionWidth / 2));
  Phaser.Sprite.call(this, game, nx, ny, '');
  this.width = this.defaultSectionWidth;
  this.height = this.defaultHeight;
  this.game.physics.p2.enable(this, true);
  this.body.static = true;
  this.rock = false;
  //platform drawn skin
  this.skin = this.game.add.graphics(this.x, this.y);
  var skinPoly = new Phaser.Polygon()
  skinPoly.setTo([
    new Phaser.Point(0 - (this.width / 2) - 5, 0 - this.height / 2),
    new Phaser.Point(0 + (this.width / 2) + 5, 0 - this.height / 2),
    new Phaser.Point(0 + this.width, 0 + this.height / 2),
    new Phaser.Point(0 - this.width, this.y + this.height / 2)
  ]);
  this.skin.beginFill(0xFFFFFF, 1); //don't need right now
  this.skin.drawPolygon(skinPoly.points);
}
Platform.prototype = Object.create(Phaser.Sprite.prototype)
Platform.prototype.constructor = Platform
Platform.prototype.update = function() {
  if (this.alive) {
    this.move();
  }
  this.skin.x = this.x;
  this.skin.y = this.y;
  this.skin.angle = this.body.rotation / 3.5
}
Platform.prototype.move = function() {
  this.body.moveLeft(this.speed);
}