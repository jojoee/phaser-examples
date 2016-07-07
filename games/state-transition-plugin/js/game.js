window.onload = function() {
  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');
  game.state.add('boot', boot);
  game.state.add('stateWithoutPreloadA', stateWithoutPreloadA);
  game.state.add('stateWithoutPreloadB', stateWithoutPreloadB);
  game.state.add('stateWithPreloadC', stateWithPreloadC);
  game.state.start('boot');
};

function boot() {
  this.init = function() {
    // Configures ScaleManager
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.forceOrientation(true);
    // Initializes StateTransition Plugin
    this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);
    this.game.stateTransition.configure({
      duration: Phaser.Timer.SECOND * 0.8,
      ease: Phaser.Easing.Exponential.InOut,
      properties: {
        alpha: 0,
        scale: {
          x: 1.4,
          y: 1.4
        }
      }
    });
  };
  this.preload = function() {
    this.load.image('preloader', 'assets/preloader.png');
    this.load.image('blue', 'assets/element_blue.png');
    this.load.image('red', 'assets/element_red.png');
    this.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
  };
  this.create = function() {
    this.state.start('stateWithoutPreloadA');
  };
}

function stateWithoutPreloadA() {
  this.create = function() {
    this.tile = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'blue');
    this.game.add.button(100, 100, 'button', function() {
      this.game.stateTransition.to('stateWithoutPreloadB');
    }, this, 2, 1, 0);
    this.game.add.text(10, 10, 'stateWithoutPreloadA');
  };
  this.update = function() {
    this.tile.tilePosition.x -= 1;
  };
}

function stateWithoutPreloadB() {
  this.create = function() {
    this.tile = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'blue');
    this.game.add.button(250, 250, 'button', function() {
      this.game.stateTransition.to('stateWithPreloadC');
    }, this, 2, 1, 0);
    this.game.add.text(10, 10, 'stateWithoutPreloadB');
  };
  this.update = function() {
    this.tile.tilePosition.x -= 1;
  };
}

function stateWithPreloadC() {
  this.preload = function() {
    this.preloader = this.add.sprite(this.world.centerX, this.world.centerY + 100, 'preloader');
    this.preloader.anchor.set(0.5);
    this.load.setPreloadSprite(this.preloader);
    this.load.audio('intro_of_dragons', 'assets/intro_of_dragons.mp3', true);
  };
  this.create = function() {
    this.game.sound.play('intro_of_dragons', 0.6, true);
    this.tile = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'red');
    this.game.add.button(400, 400, 'button', function() {
      this.game.stateTransition.to('stateWithoutPreloadA');
    }, this, 2, 1, 0);
    this.game.add.text(10, 10, 'stateWithPreloadC');
  };
  this.update = function() {
    this.tile.tilePosition.x -= 1;
  };
  this.shutdown = function() {
    this.game.sound.stopAll();
  };
}
