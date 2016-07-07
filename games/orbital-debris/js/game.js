var game = new Phaser.Game(800, 800, Phaser.CANVAS, 'wg-spacejunk');
var gameState;
var GAMESTATE_NOTSTARTED = 'GAMESTATE_NOTSTARTED';
var GAMESTATE_PLAYING = 'GAMESTATE_PLAYING';
var GAMESTATE_DIED = 'GAMESTATE_DIED';
var GAMESTATE_GAMEOVER = 'GAMESTATE_GAMEOVER';
var playedOnce = false;
var firstSatellite;
var timeAlive;
var STATION_ALTITUDE_RATE = 0.05;
var STATION_ALTITUDE_RATE_MAX = 0.8;
var STATION_ALTITUDE_RATE_WITHPOWERUP = 0.3;
var STATION_ALTITUDE_RATE_WITHPOWERUP_MAX = 1.2;
var SATELLITE_SPAWN_RATE_START = 5.0;
var SATELLITE_SPAWN_RATE_MULT = 0.96;
var nextSatelliteSpawnTimerTime;
var satelliteTimer;
var powerupShieldTimer;
var powerupSpeedTimer;
var powerupSlowTimer;
var station;
var stationTrajectory;
var stationFire;
var astronaut;
var orbiterGroup;
var pickupGroup;
var powerupShield;
var powerupSpeed;
var hudImgLogo;
var hudImgYouCallout;
var hudTxtTimeAlive;
var hudTxtBurnWarning;
var hudTxtGameOver;
var hudTxtPowerupShield;
var hudTxtPowerupSpeed;
var hudTxtPowerupSlow;
var hudTxtCredits;
var hudBtnPlay;
var hudBtnPlayAgain;
var hudBtnMute;
var music;
var powerupTweenShield;
var powerupTweenSpeed;
var powerupSlowActive;
var tweenPowerupText;
var IMAGE_BG = "bg";
var IMAGE_LOGO = "logo";
var IMAGE_STATION = "station";
var IMAGE_ASTRONAUT = "astronaut";
var IMAGE_STATION_FIRE = "stationFire";
var IMAGE_YOUCALLOUT = "youCallout";
var IMAGE_PICKUP_SHIELD = "pickupShield";
var IMAGE_PICKUP_SPEED = "pickupSpeed";
var IMAGE_PICKUP_SLOW = "pickupSlow";
var IMAGE_POWERUP_SHIELD = "powerupShield";
var IMAGE_POWERUP_SPEED = "powerupSpeed";
var IMAGE_JUNK1 = "junk1";
var IMAGE_JUNK2 = "junk2";
var IMAGE_JUNK3 = "junk3";
var IMAGE_SATELLITE1 = "satellite1";
var IMAGE_SATELLITE1B = "satellite1B";
var IMAGE_SATELLITE2 = "satellite2";
var IMAGE_SATELLITE2B = "satellite2B";
var IMAGE_BTN_PLAY = "btnPlay";
var IMAGE_BTN_PLAYAGAIN = "btnPlayAgain";
var IMAGE_BTN_MUTE = "btnMute";
var IMAGE_PARTICLES_BURN = "burnParticles";
var IMAGES_JUNK = [IMAGE_JUNK1, IMAGE_JUNK2, IMAGE_JUNK3];
var IMAGES_SATELLITES = [IMAGE_SATELLITE1, IMAGE_SATELLITE1B, IMAGE_SATELLITE2, IMAGE_SATELLITE2B];
var AUDIO_MUSIC = "music";
var statePlay = {
  preload: function() {
    loadImage(IMAGE_BG);
    loadImage(IMAGE_LOGO);
    loadImage(IMAGE_STATION);
    loadImage(IMAGE_ASTRONAUT);
    loadImage(IMAGE_STATION_FIRE);
    loadImage(IMAGE_PICKUP_SHIELD);
    loadImage(IMAGE_PICKUP_SPEED);
    loadImage(IMAGE_PICKUP_SLOW);
    loadImage(IMAGE_POWERUP_SHIELD);
    loadImage(IMAGE_POWERUP_SPEED);
    loadImage(IMAGE_YOUCALLOUT);
    game.load.spritesheet(IMAGE_PARTICLES_BURN, 'assets/art/' + IMAGE_PARTICLES_BURN + '.png', 2, 2);
    game.load.spritesheet(IMAGE_BTN_PLAY, 'assets/art/' + IMAGE_BTN_PLAY + '.png', 170, 76);
    game.load.spritesheet(IMAGE_BTN_PLAYAGAIN, 'assets/art/' + IMAGE_BTN_PLAYAGAIN + '.png', 170, 76);
    game.load.spritesheet(IMAGE_BTN_MUTE, 'assets/art/' + IMAGE_BTN_MUTE + '.png', 34, 34);
    loadArrayImages(IMAGES_JUNK);
    loadArrayImages(IMAGES_SATELLITES);
    game.load.audio(AUDIO_MUSIC, ['assets/audio/dreamculture.mp3', 'assets/audio/dreamculture.ogg']);
  },
  create: function() {
    game.stage.scale.pageAlignHorizontally = true;
    game.stage.scale.pageAlignVertically = true;
    game.stage.scale.refresh();
    game.input.keyboard.addKey(Phaser.Keyboard.UP);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    if (music == null) {
      music = game.add.audio(AUDIO_MUSIC, 1.0, true);
      music.play('', 0, 1, true);
    }
    game.add.sprite(0, 0, IMAGE_BG);
    stationTrajectory = game.add.graphics(0, 0);
    pickupGroup = game.add.group();
    powerupShield = game.add.sprite(0, 0, IMAGE_POWERUP_SHIELD);
    powerupShield.anchor.setTo(0.5, 0.5);
    powerupShield.visible = false;
    powerupSpeed = game.add.sprite(0, 0, IMAGE_POWERUP_SPEED);
    powerupSpeed.anchor.setTo(0.5, 0.5);
    powerupSpeed.visible = false;
    orbiterGroup = game.add.group();
    station = spawnNewOrbiter(IMAGE_STATION);
    stationFire = game.add.sprite(0, 0, IMAGE_STATION_FIRE);
    stationFire.alpha = 0;
    stationFire.anchor.setTo(0.5, 0.5);
    station.isStation = true;
    station.body.setRectangle(14, 14, station.width / 2 - 7, station.height / 2 - 7);
    station.moveData.altitude = 120;
    station.moveData.altitudeMin = 80;
    station.moveData.altitudeMax = 320;
    station.moveData.orbit = 270;
    station.moveData.orbitRate = 0.5;
    hudImgYouCallout = game.add.sprite(0, 0, IMAGE_YOUCALLOUT);
    hudImgYouCallout.anchor.setTo(0.5, 1);
    var style = {
      font: "30px Arial",
      fill: "#ffffff"
    };
    hudTxtTimeAlive = game.add.text(20, 20, "00.00", style);
    hudTxtTimeAlive.x = game.world.centerX - hudTxtTimeAlive.width / 2;
    hudTxtTimeAlive.visible = false;
    style = {
      font: "14px Arial",
      fill: "#ffffff"
    };
    hudTxtCredits = game.add.text(0, 775, 'Music: "Dream Culture" Kevin MacLeod (incompetech.com).     Earth Photograph: NASA.', style);
    hudTxtCredits.x = game.world.centerX - hudTxtCredits.width / 2;
    style = {
      font: "28px Arial",
      fill: "#ff5400",
      align: "center"
    };
    hudTxtBurnWarning = game.add.text(0, 180, "WARNING - TOO CLOSE TO EARTH - OVERHEATING", style);
    hudTxtBurnWarning.x = game.world.width / 2 - hudTxtBurnWarning.width / 2;
    hudTxtBurnWarning.visible = false;
    style = {
      font: "28px Arial",
      fill: "#ffffff",
      align: "center"
    };
    hudTxtPowerupShield = game.add.text(0, 100, "SHIELD ACTIVATED", style);
    hudTxtPowerupShield.x = game.world.width / 2 - hudTxtPowerupShield.width / 2;
    hudTxtPowerupShield.visible = false;
    hudTxtPowerupSpeed = game.add.text(0, 100, "SPEED BOOST", style);
    hudTxtPowerupSpeed.x = game.world.width / 2 - hudTxtPowerupSpeed.width / 2;
    hudTxtPowerupSpeed.visible = false;
    hudTxtPowerupSlow = game.add.text(0, 100, "JUNK SLOWED", style);
    hudTxtPowerupSlow.x = game.world.width / 2 - hudTxtPowerupSlow.width / 2;
    hudTxtPowerupSlow.visible = false;
    style = {
      font: "26px Arial",
      fill: "#ffffff",
      align: "center"
    };
    hudTxtGameOver = game.add.text(0, 90, "GAME OVER.\n\nIn space, nobody can hear you scream.\n\nYou survived for " + roundTimeAlive() + " seconds.", style);
    hudTxtGameOver.x = game.world.width / 2 - hudTxtGameOver.width / 2;
    hudTxtGameOver.visible = false;
    hudImgLogo = game.add.sprite(0, 97, IMAGE_LOGO);
    hudImgLogo.x = game.world.centerX - hudImgLogo.width / 2;
    hudBtnMute = game.add.button(752, 13, IMAGE_BTN_MUTE, onBtnMute, this, 1, 0, 1);
    hudBtnPlay = game.add.button(0, 564, IMAGE_BTN_PLAY, onBtnPlay, this, 1, 0, 1);
    hudBtnPlay.x = game.world.width / 2 - hudBtnPlay.width / 2;
    hudBtnPlayAgain = game.add.button(0, 564, IMAGE_BTN_PLAYAGAIN, onBtnPlayAgain, this, 1, 0, 1);
    hudBtnPlayAgain.x = game.world.width / 2 - hudBtnPlayAgain.width / 2;
    hudBtnPlayAgain.visible = false;
    hudBtnPlayAgain.active = false;
    powerupSlowActive = false;
    firstSatellite = true;
    timeAlive = 0;
    gameState = GAMESTATE_NOTSTARTED;
    if (playedOnce) {
      onBtnPlay();
    }
  },
  update: function() {
    if (gameState == GAMESTATE_PLAYING) {
      processInput();
    }
    updateOrbiterMovement();
    updateStationTrajectory();
    if (gameState == GAMESTATE_NOTSTARTED) {
      hudImgYouCallout.x = station.x;
      hudImgYouCallout.y = station.y - 20;
    }
    if (gameState == GAMESTATE_PLAYING) {
      game.physics.overlap(station, pickupGroup, onPickupOverlap);
      powerupShield.x = station.x;
      powerupShield.y = station.y;
      powerupShield.angle = station.angle;
      powerupSpeed.x = station.x;
      powerupSpeed.y = station.y;
      powerupSpeed.angle = station.angle;
      updateStationBurn();
      timeAlive += (game.time.elapsed / 1000);
      hudTxtTimeAlive.content = roundTimeAlive();
    }
    if (gameState == GAMESTATE_DIED || gameState == GAMESTATE_GAMEOVER) {
      positionYouCalloutOnAstronaut();
    }
    game.physics.overlap(orbiterGroup, orbiterGroup, onOrbiterOverlap);
  }
}

function loadImage(image) {
  game.load.image(image, 'assets/art/' + image + '.png');
}

function loadArrayImages(imageArray) {
  for (var i = 0; i < imageArray.length; i++) {
    loadImage(imageArray[i]);
  }
}

function processInput() {
  var altitudeChangeRate;
  var altitudeChangeRateMax;
  if (powerupSpeed.visible) {
    altitudeChangeRate = STATION_ALTITUDE_RATE_WITHPOWERUP;
    altitudeChangeRateMax = STATION_ALTITUDE_RATE_WITHPOWERUP_MAX;
  } else {
    altitudeChangeRate = STATION_ALTITUDE_RATE;
    altitudeChangeRateMax = STATION_ALTITUDE_RATE_MAX;
  }
  if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    station.moveData.altitudeChangeRate += altitudeChangeRate;
  }
  if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    station.moveData.altitudeChangeRate -= altitudeChangeRate;
  }
  station.moveData.altitudeChangeRate = Phaser.Math.clamp(station.moveData.altitudeChangeRate, -altitudeChangeRateMax, altitudeChangeRateMax);
}

function updateStationBurn() {
  var STATION_BURN_ALTITUDE = 95;
  var STATION_BURN_RATE = 0.005;
  var STATION_COOL_RATE = 0.01;
  if (station.moveData.altitude <= STATION_BURN_ALTITUDE) {
    stationFire.alpha = Phaser.Math.clamp(stationFire.alpha + STATION_BURN_RATE, 0, 1);
    if (stationFire.alpha == 1) {
      orbiterWasHit(station);
    }
    hudTxtBurnWarning.visible = true;
  } else if (stationFire.alpha > 0) {
    stationFire.alpha = Phaser.Math.clamp(stationFire.alpha - STATION_COOL_RATE, 0, 1);
    hudTxtBurnWarning.visible = false;
  }
  stationFire.x = station.x;
  stationFire.y = station.y;
  stationFire.angle = station.angle;
}

function updateStationTrajectory() {
  stationTrajectory.clear();
  stationTrajectory.lineStyle(1, 0x55FFAA, 0.5);
  stationTrajectory.drawCircle(game.world.width / 2, game.world.height / 2, station.moveData.altitude);
}

function updateOrbiterMovement() {
  orbiterGroup.forEach(function(orbiter) {
    if (orbiter.alive) {
      updateOrbiterOrbit(orbiter);
      updateOrbiterAltitude(orbiter);
    }
  });
}

function updateOrbiterOrbit(orbiter) {
  var orbitRate = orbiter.moveData.orbitRate;
  if (!orbiter.isStation && powerupSlowActive) {
    orbitRate *= 0.3;
  }
  if (orbiter.moveData.orbitRate != 0) {
    orbiter.moveData.orbit += orbitRate;
    if (orbiter.moveData.orbit >= 360) {
      orbiter.moveData.orbit -= 360;
    }
  }
  var orbitRad = Phaser.Math.degToRad(orbiter.moveData.orbit);
  orbiter.x = game.world.width / 2 + orbiter.moveData.altitude * Math.cos(orbitRad);
  orbiter.y = game.world.height / 2 + orbiter.moveData.altitude * Math.sin(orbitRad);
  if (!orbiter.isJunk) {
    orbiter.angle = orbiter.moveData.orbit - 90;
  } else {
    orbiter.angle += orbiter.tumbleRate;
  }
}

function updateOrbiterAltitude(orbiter) {
  if (orbiter.moveData.altitudeChangeRate != 0) {
    orbiter.moveData.altitude = Phaser.Math.clamp(orbiter.moveData.altitude + orbiter.moveData.altitudeChangeRate, orbiter.moveData.altitudeMin, orbiter.moveData.altitudeMax);
    if (orbiter.moveData.altitudeTarget != 0) {
      if (orbiter.moveData.altitude >= orbiter.moveData.altitudeTarget) {
        orbiter.moveData.altitudeMin = 60;
        orbiter.moveData.altitudeChangeRate = 0;
        orbiter.moveData.altitudeTarget = 0;
      }
    }
  }
  if (orbiter.moveData.altitude < 70 && orbiter.moveData.altitudeTarget == 0) {
    orbiterBurnedUpInAtmosphere(orbiter);
  }
}

function orbiterBurnedUpInAtmosphere(orbiter) {
  var emitter = game.add.emitter(orbiter.x, orbiter.y, 10);
  emitter.makeParticles(IMAGE_PARTICLES_BURN, [0, 1, 2]);
  emitter.minParticleSpeed.setTo(-35, -35);
  emitter.maxParticleSpeed.setTo(35, 35);
  emitter.gravity = 0;
  emitter.start(true, 450, 0, game.rnd.integerInRange(8, 16));
  if (orbiter.isAstronaut) {
    hudImgYouCallout.visible = false;
  }
  orbiter.kill();
}

function onOrbiterOverlap(orbiterA, orbiterB) {
  if (!orbiterA.isJunk) {
    orbiterWasHit(orbiterA);
  } else if (orbiterB.isStation && powerupShield.visible) {
    orbiterA.kill();
  }
  if (!orbiterB.isJunk) {
    orbiterWasHit(orbiterB);
  } else if (orbiterA.isStation && powerupShield.visible) {
    orbiterB.kill();
  }
  if (orbiterA.isSatellite || orbiterB.isSatellite) {
    if (!orbiterA.isStation && !orbiterB.isStation) {
      maybeSpawnPickup(orbiterA, orbiterB);
    }
  }
}

function orbiterWasHit(orbiter) {
  if (orbiter.alive) {
    if (orbiter.isStation && powerupShield.visible) {
    } else {
      var junkQuantity;
      if (orbiter.isStation) {
        junkQuantity = 40;
      } else {
        var maxJunk = 3 + Phaser.Math.floor(timeAlive / 10);
        junkQuantity = game.rnd.integerInRange(2, maxJunk);
      }
      for (var i = 0; i < junkQuantity; i++) {
        var junk = spawnNewOrbiter(IMAGES_JUNK[game.rnd.integerInRange(0, IMAGES_JUNK.length)]);
        junk.moveData.altitude = orbiter.moveData.altitude;
        junk.moveData.altitudeMin = 60;
        junk.moveData.altitudeMax = 700;
        junk.moveData.altitudeChangeRate = game.rnd.realInRange(-1.0, 1.0);
        junk.moveData.orbit = orbiter.moveData.orbit;
        junk.moveData.orbitRate = game.rnd.realInRange(0.4, 1.2);
        if (orbiter.moveData.orbitRate < 0) {
          junk.moveData.orbitRate *= -1;
        }
        junk.tumbleRate = game.rnd.realInRange(-10, 10);
        junk.isJunk = true;
      }
      orbiter.kill();
      if (orbiter.isStation) {
        playerDied();
      }
    }
  }
}

function maybeSpawnPickup(orbiterA, orbiterB) {
  var POWERUP_SPAWN_CHANCE = 0.5;
  if (game.rnd.frac() <= POWERUP_SPAWN_CHANCE && gameState == GAMESTATE_PLAYING) {
    var pickupX = orbiterA.x + (orbiterB.x - orbiterA.x) / 2;
    var pickupY = orbiterA.y + (orbiterB.y - orbiterA.y) / 2;
    var pickupType;
    var rand = game.rnd.frac();
    if (rand <= 0.33) {
      pickupType = IMAGE_PICKUP_SPEED;
    } else if (rand <= 0.66) {
      pickupType = IMAGE_PICKUP_SHIELD;
    } else {
      pickupType = IMAGE_PICKUP_SLOW;
    }
    spawnPickup(pickupX, pickupY, pickupType);
  }
}

function spawnPickup(x, y, type) {
  var pickup = pickupGroup.create(0, 0, type);
  pickup.anchor.setTo(0.5, 0.5);
  pickup.x = x;
  pickup.y = y;
  pickup.type = type;
  var PICKUP_DESPAWN_RATE = 15;
  game.time.events.add(Phaser.Timer.SECOND * PICKUP_DESPAWN_RATE, function() {
    pickup.kill();
  }, this);
}

function onPickupOverlap(station, pickup) {
  if (station.alive && pickup.alive) {
    var POWERUP_DURATION_START = 5;
    if (pickup.type == IMAGE_PICKUP_SHIELD) {
      if (powerupTweenShield != null) {
        powerupTweenShield.stop();
      }
      if (powerupShieldTimer != null) {
        game.time.events.remove(powerupShieldTimer);
      }
      powerupShieldTimer = game.time.events.add(Phaser.Timer.SECOND * POWERUP_DURATION_START, powerupExpiredShield, this);
      powerupShield.visible = true;
      powerupShield.alpha = 1;
    } else if (pickup.type == IMAGE_PICKUP_SPEED) {
      if (powerupTweenSpeed != null) {
        powerupTweenSpeed.stop();
      }
      if (powerupSpeedTimer != null) {
        game.time.events.remove(powerupSpeedTimer);
      }
      powerupSpeedTimer = game.time.events.add(Phaser.Timer.SECOND * POWERUP_DURATION_START, powerupExpiredSpeed, this);
      powerupSpeed.visible = true;
      powerupSpeed.alpha = 1;
    } else if (pickup.type == IMAGE_PICKUP_SLOW) {
      if (powerupSlowTimer != null) {
        game.time.events.remove(powerupSlowTimer);
      }
      powerupSlowTimer = game.time.events.add(Phaser.Timer.SECOND * POWERUP_DURATION_START, powerupExpiredSlow, this);
      powerupSlowActive = true;
    }
    showPowerupText(pickup.type);
    pickup.kill();
  }
}

function showPowerupText(powerupType) {
  var powerupText;
  var powerupTexts = [hudTxtPowerupShield, hudTxtPowerupSpeed, hudTxtPowerupSlow];
  switch (powerupType) {
    case IMAGE_PICKUP_SHIELD:
      powerupText = hudTxtPowerupShield;
      break;
    case IMAGE_PICKUP_SPEED:
      powerupText = hudTxtPowerupSpeed;
      break;
    case IMAGE_PICKUP_SLOW:
      powerupText = hudTxtPowerupSlow;
      break;
  }
  for (var i = 0; i < powerupTexts.length; i++) {
    if (powerupTexts != powerupText) {
      powerupTexts[i].visible = false;
    }
  }
  powerupText.alpha = 1;
  powerupText.visible = true;
  if (tweenPowerupText != null) {
    tweenPowerupText.stop();
  }
  tweenPowerupText = game.add.tween(powerupText).to({
    alpha: 0
  }, 500, Phaser.Easing.Linear.None, true, 2000, 0, false);
}

function powerupExpiredShield() {
  if (powerupTweenShield != null) {
    powerupTweenShield.stop();
  }
  powerupShield.alpha = 1;
  powerupTweenShield = game.add.tween(powerupShield).to({
    alpha: 0
  }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
  powerupTweenShield.onComplete.add(removePowerupShield)
  game.time.events.remove(powerupShieldTimer);
}

function removePowerupShield() {
  powerupShield.visible = false;
}

function powerupExpiredSpeed() {
  if (powerupTweenSpeed != null) {
    powerupTweenSpeed.stop();
  }
  powerupSpeed.alpha = 1;
  powerupTweenSpeed = game.add.tween(powerupSpeed).to({
    alpha: 0
  }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
  powerupTweenSpeed.onComplete.add(removePowerupSpeed)
  game.time.events.remove(powerupSpeedTimer);
}

function removePowerupSpeed() {
  powerupSpeed.visible = false;
}

function powerupExpiredSlow() {
  powerupSlowActive = false;
}

function positionYouCalloutOnAstronaut() {
  hudImgYouCallout.x = astronaut.x;
  hudImgYouCallout.y = astronaut.y - 15;
}

function playerDied() {
  astronaut = spawnNewOrbiter(IMAGE_ASTRONAUT);
  astronaut.moveData.altitude = station.moveData.altitude;
  astronaut.moveData.altitudeMin = 60;
  astronaut.moveData.altitudeMax = 700;
  astronaut.moveData.altitudeChangeRate = game.rnd.realInRange(-0.5, 0.5);
  astronaut.moveData.orbit = station.moveData.orbit;
  astronaut.moveData.orbitRate = 0.5;
  if (station.moveData.orbitRate < 0) {
    astronaut.moveData.orbitRate *= -1;
  }
  astronaut.tumbleRate = 4;
  astronaut.isAstronaut = true;
  astronaut.isJunk = true;
  hudImgYouCallout.visible = true;
  positionYouCalloutOnAstronaut();
  game.time.events.remove(satelliteTimer);
  game.time.events.remove(powerupShieldTimer);
  game.time.events.remove(powerupSpeedTimer);
  powerupSpeed.kill();
  powerupShield.kill();
  game.world.remove(pickupGroup);
  pickupGroup.callAll('kill');
  game.world.remove(stationTrajectory);
  stationFire.kill();
  game.world.remove(hudTxtBurnWarning);
  hudTxtTimeAlive.visible = false;
  playedOnce = true;
  game.time.events.add(Phaser.Timer.SECOND * 4, gameOver, this);
  gameState = GAMESTATE_DIED;
}

function gameOver() {
  hudTxtGameOver.content = "GAME OVER\n\nIn space, nobody can hear you scream.\n\nYou survived for " + roundTimeAlive() + " seconds.";
  hudTxtGameOver.visible = true;
  hudTxtGameOver.alpha = 0;
  var tweenA = game.add.tween(hudTxtGameOver).to({
    alpha: 1
  }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
  tweenA.onComplete.add(function() {
    hudBtnPlayAgain.alpah = 0;
    hudBtnPlayAgain.visible = true;
    var tweenB = game.add.tween(hudBtnPlayAgain).to({
      alpha: 1
    }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
    tweenB.onComplete.add(function() {
      hudBtnPlayAgain.active = true;
    });
  });
  gameState = GAMESTATE_GAMEOVER;
}

function roundTimeAlive() {
  return Phaser.Math.floor(timeAlive * 100) / 100;
}

function launchNewSatellite() {
  var satellite = spawnNewOrbiter(IMAGES_SATELLITES[game.rnd.integerInRange(0, IMAGES_SATELLITES.length)]);
  satellite.moveData.altitudeMin = 40;
  satellite.moveData.altitudeMax = 325;
  satellite.moveData.altitude = 40;
  satellite.moveData.altitudeChangeRate = 1.0;
  satellite.moveData.altitudeTarget = game.rnd.integerInRange(90, satellite.moveData.altitudeMax);
  var minOrbitRate = 0.1 + Phaser.Math.floor(timeAlive / 15) / 10;
  var maxOrbitRate = 0.5 + Phaser.Math.floor(timeAlive / 10) / 10;
  if (firstSatellite) {
    satellite.moveData.orbit = station.moveData.orbit + 180;
  } else {
    satellite.moveData.orbit = game.rnd.integerInRange(0, 360);
  }
  satellite.moveData.orbitRate = game.rnd.realInRange(minOrbitRate, maxOrbitRate);
  if (game.rnd.integerInRange(0, 2) == 0) {
    satellite.moveData.orbitRate *= -1;
  }
  satellite.isSatellite = true;
  satelliteTimer = game.time.events.add(Phaser.Timer.SECOND * nextSatelliteSpawnTimerTime, launchNewSatellite, this);
  nextSatelliteSpawnTimerTime = Phaser.Math.clamp(nextSatelliteSpawnTimerTime * SATELLITE_SPAWN_RATE_MULT, 1.5, SATELLITE_SPAWN_RATE_START);
}

function spawnNewOrbiter(graphic) {
  var orbiter = game.add.sprite(0, 0, graphic);
  orbiter.anchor.setTo(0.5, 0.5);
  orbiter.moveData = {};
  orbiter.moveData.altitude = 0;
  orbiter.moveData.altitudeTarget = 0;
  orbiter.moveData.altitudeChangeRate = 0;
  orbiter.moveData.altitudeMin = 0;
  orbiter.moveData.altitudeMax = 0;
  orbiter.moveData.orbit = 0;
  orbiter.moveData.orbitRate = 0;
  orbiterGroup.add(orbiter);
  return orbiter;
}

function onBtnPlay() {
  hudBtnPlay.visible = false;
  hudBtnPlay.active = false;
  hudTxtTimeAlive.visible = true;
  hudImgYouCallout.visible = false;
  hudTxtCredits.visible = false;
  if (playedOnce) {
    hudImgLogo.visible = false;
  } else {
    var tween;
    tween = game.add.tween(hudImgLogo).to({
      alpha: 0
    }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
    tween.onComplete.add(function() {
      hudImgLogo.visible = false;
    });
  }
  nextSatelliteSpawnTimerTime = SATELLITE_SPAWN_RATE_START;
  launchNewSatellite();
  firstSatellite = false;
  gameState = GAMESTATE_PLAYING;
}

function onBtnPlayAgain() {
  startNewGame();
}

function onBtnMute() {
  if (music.isPlaying) {
    music.pause();
  } else {
    music.resume();
  }
}

function startNewGame() {
  game.state.start('play');
}
game.state.add('play', statePlay);
startNewGame();