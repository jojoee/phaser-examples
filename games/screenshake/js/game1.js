function Screenshake(game, parent) {
  Phaser.Plugin.call(this, game, parent);
  this.timer = this.game.time.create(false);
  this.timer.start();
  this.shakeCount = 0;
  this.shakeAmount = 1;
  this._initialBounds = this.game.camera.bounds;
  this.game.camera.bounds = null;
  this._cameraPosCache = [this.game.camera.x, this.game.camera.y];
}
Screenshake.prototype = Object.create(Phaser.Plugin.prototype);
Screenshake.prototype.constructor = Screenshake;
Screenshake.prototype.update = function() {
  if (this.shakeCount > 0) {
    var t = 2 * Math.PI * this.game.rnd.frac();
    var u = this.game.rnd.frac() + this.game.rnd.frac();
    var r = (u > 1 ? 2 - u : u) * this.shakeAmount;
    this.game.camera.x = r * Math.cos(t);
    this.game.camera.y = r * Math.sin(t);
  }
};
Screenshake.prototype.shake = function(duration, amount) {
  if (this.shakeCount === 0) {
    this._cameraPosCache[0] = this.game.camera.x;
    this._cameraPosCache[1] = this.game.camera.y;
  }
  this.shakeCount++;
  this.shakeAmount = amount || 1;
  this.timer.add(duration || 100, this.shakedown, this);
};
Screenshake.prototype.shakedown = function() {
  this.shakeCount--;
  if (this.shakeCount === 0) {
    this.game.camera.setPosition(this._cameraPosCache[0], this._cameraPosCache[1]);
  }
};
Phaser.Plugin.Screenshake = Screenshake;
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', {
  create: function onCreate() {
    this.game.plugins.screenshake = this.game.plugins.add(Phaser.Plugin.Screenshake);
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
      this.game.plugins.screenshake.shake(250, 5);
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