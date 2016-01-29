(function(Phaser){
  'use strict';

  function bootState(){
    this.gameMinWidth = 320;
    this.gameMinHeight = 218;
    this.gameMaxWidth = 1024;
    this.gameMaxHeight = 696;
  }

  bootState.prototype = {

    preload: function(){
      this.game.load.image('progressBar', 'assets/images/progressBar.png');
    },

    create: function(){
      this.game.stage.backgroundColor = '#3498db';
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      if(!this.game.device.desktop){
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.game.scale.minWidth = this.gameMinWidth;
        this.game.scale.minHeight = this.gameMinHeight;
        this.game.scale.maxWidth = this.gameMaxWidth;
        this.game.scale.maxHeight = this.gameMaxHeight;
      }
      else{
        window.onresize = function(){
          this.windowResizeHandler();
        }.bind(this);
      }

      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;
      this.game.scale.setScreenSize(true);

      this.game.state.start('load');
    },

    windowResizeHandler: function(){
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

      if(window.innerWidth === screen.width){
        this.game.scale.minWidth = this.gameMinWidth;
        this.game.scale.minHeight = this.gameMinHeight;
        this.game.scale.maxWidth = screen.width;
        this.game.scale.maxHeight = screen.height - 24;
      }
      else{
        this.game.scale.minWidth = this.gameMinWidth;
        this.game.scale.minHeight = this.gameMinHeight;
        this.game.scale.maxWidth = this.game.width;
        this.game.scale.maxHeight = this.game.height;
      }

      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;
      this.game.scale.setScreenSize(true);
    }

  };

  window['super-coin-box'] = window['super-coin-box'] || {};
  window['super-coin-box'].bootState = bootState;

})(Phaser);
