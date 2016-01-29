var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', {
  create: function onCreate() {

    // by plugin
    this.game.plugins.screenShake = this.game.plugins.add(Phaser.Plugin.ScreenShake);

    var g = this.game.add.graphics(this.world.centerX, this.world.centerY);
    g.beginFill(0x00FF00);
    g.drawRect(-25, -25, 50, 50);
    g.endFill();
    g.beginFill(0xFF0000);
    g.drawCircle(-100, -150, 75);
    g.endFill();
    g.beginFill(0x0000FF);
    g.drawCircle(125, -100, 75);
    g.endFill();
    var s = this.game.add.sprite();
    s.addChild(g);
    s.inputEnabled = true;
    s.events.onInputDown.add(function(sprite, pointer) {
      
      // shake
      this.game.plugins.screenShake.shake(10);
    });
    var message = 'Click a shape for screenshake';
    var style = {
      font: '14px Helvetica',
      fill: '#ffffff'
    };
    var text = this.game.add.text(this.world.centerX, this.world.centerY + 50, message, style);
    text.anchor.setTo(0.5);
  }
});