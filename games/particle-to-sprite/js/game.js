var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-demo', {
  preload: preload,
  create: create,
  update: update
});
var sprite, particle, emitter;

function preload() {
  game.load.crossOrigin = "Anonymous";
  game.load.image('fireblob', 'assets/fireblob.png');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  var text = game.add.text(10, 10, 'Click or touch to move ship', {
      fill: 'white'
    })
    // create the sprite's primative
  var bmd = game.add.bitmapData(32, 32);
  drawTriangle(bmd);
  // create the sprite
  sprite = game.add.sprite(game.width / 2, game.height / 2, bmd);
  // create the physics body -before- attaching an emitter to the sprite
  game.physics.arcade.enableBody(sprite);
  sprite.body.collideWorldBounds = true;
  sprite.anchor.setTo(0.5, 0.5);
  //create an emitter
  emitter = game.add.emitter(0, 0, 1000);
  emitter.makeParticles('fireblob');
  // Attach the emitter to the sprite
  sprite.addChild(emitter);
  //position the emitter relative to the sprite's anchor location
  emitter.y = 0;
  emitter.x = -16;
  // setup options for the emitter
  emitter.lifespan = 500;
  emitter.maxParticleSpeed = new Phaser.Point(-100, 50);
  emitter.minParticleSpeed = new Phaser.Point(-200, -50);
}

function update() {
  sprite.rotation = game.physics.arcade.angleToPointer(sprite);
  if (game.input.activePointer.isDown) {
    game.physics.arcade.accelerateToPointer(sprite);
    sprite.body.drag.setTo(0, 0);
    // emit a single particle every frame that the mouse is down
    emitter.emitParticle();
  } else {
    sprite.body.acceleration.set(0, 0);
    sprite.body.drag.setTo(25, 25);
  }
}

function drawTriangle(bmd) {
  bmd.ctx.fillStyle = 'white';
  bmd.ctx.strokeStyle = '#999';
  bmd.ctx.lineWidth = 2;
  bmd.ctx.beginPath();
  // Start from the top-left point.
  bmd.ctx.moveTo(0, 0); // give the (x,y) coordinates
  bmd.ctx.lineTo(bmd.width, bmd.height / 2);
  bmd.ctx.lineTo(0, bmd.height);
  bmd.ctx.lineTo(0, 0);
  // Done! Now fill the shape, and draw the stroke.
  // Note: your shape will not be visible until you call any of the two methods.
  bmd.ctx.fill();
  bmd.ctx.stroke();
  bmd.ctx.closePath();
}