var game;
// panda speed, in pixels per second
var pandaSpeed = 200;
// panda max horizontal movement before the game scrolls
var pandaXLimit = 160;
// pixels range between a spike and next spike
var spikeGap = [70, 200];
window.onload = function() {
  game = new Phaser.Game(480, 320, Phaser.AUTO, "");
  game.state.add("PlayGame", playGame);
  game.state.start("PlayGame");
}
var playGame = function(game) {};
playGame.prototype = {
  preload: function() {
    game.load.image("ground", "assets/ground.png");
    game.load.image("panda", "assets/panda.png");
    game.load.image("spike", "assets/spike.png");
  },
  create: function() {
    // group which will contain all spikes 
    this.spikeGroup = game.add.group();
    game.stage.backgroundColor = "#6cc9bf";
    game.add.image(0, game.height - 40, "ground");
    this.panda = game.add.sprite(40, game.height - 40, "panda");
    this.panda.anchor.set(0.5, 1);
    // the panda can move only until it reaches pandaXLimit. Then the
    // whole game will move towards the panda
    this.panda.canMove = true;
    // isMoving tells if the panda or the whole game are moving. In other
    // words if the player wants to move the panda, no matter what is
    // actually being moved
    this.panda.isMoving = false;
    // adding the panda to ARCADE physics system
    game.physics.enable(this.panda, Phaser.Physics.ARCADE);
    // moving the panda when an input is pressed
    game.input.onDown.add(this.movePanda, this);
    // stopping the panda when an input is released
    game.input.onUp.add(this.stopPanda, this);
    // the first spike is added in the middle of the canvas
    this.addSpike(game.width / 2);
  },
  movePanda: function() {
    // the idea is: if the panda can move, then move the panda, else
    // move all spikes towards the panda. Then set isMoving to true
    if (this.panda.canMove) {
      this.panda.body.velocity.x = pandaSpeed;
    } else {
      for (var i = 0; i < this.spikeGroup.length; i++) {
        this.spikeGroup.getChildAt(i).body.velocity.x = -pandaSpeed;
      }
    }
    this.panda.isMoving = true;
  },
  stopPanda: function() {
    // the idea is: stop the panda and all spikes, set isMoving to false
    this.panda.body.velocity.x = 0;
    for (var i = 0; i < this.spikeGroup.length; i++) {
      this.spikeGroup.getChildAt(i).body.velocity.x = 0;
    }
    this.panda.isMoving = false;
  },
  addSpike: function(posX) {
    // to add a spike we will create a new Spike instance, assigning it
    // a velocity if the panda is moving
    var spike = new Spike(game, posX);
    game.add.existing(spike);
    if (this.panda.isMoving) {
      spike.body.velocity.x = -pandaSpeed;
    }
    // each spike is added to the group
    this.spikeGroup.add(spike);
    // this will recursively add new spikes until there are enough spikes
    // to cover at least twice the screen width
    if (posX < game.width * 2) {
      posX = posX + game.rnd.between(spikeGap[0], spikeGap[1]);
      this.addSpike(posX);
    }
  },
  update: function() {
    // this is how I make the panda stop when it reaches its maximum
    // horizontal position and start moving the environment instead
    if (this.panda.canMove && this.panda.x > pandaXLimit) {
      this.panda.canMove = false;
      this.panda.body.velocity.x = 0;
      this.movePanda();
    }
    // the child with the highest index in spikeGroup group is the latest
    // added spike, which is always the righmost. I am checking if we are 
    // running out of spikes by checking its position, and adding new spikes
    // if needed
    if (this.spikeGroup.getChildAt(this.spikeGroup.length - 1).x < game.width) {
      this.addSpike(game.width + game.rnd.between(spikeGap[0], spikeGap[1]));
    }
    // making the game restart if the panda hits a spike
    game.physics.arcade.collide(this.panda, this.spikeGroup, null, function(s, b) {
      game.state.start("PlayGame");
    }, this);
  }
}
Spike = function(game, posX) {
  Phaser.Sprite.call(this, game, posX, game.height - game.rnd.between(0, 40), "spike");
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.anchor.set(0, 1);
  this.body.immovable = true;
  // this is the core of the class: the tween which handles spike movement.     
  game.add.tween(this).to({
    y: game.height + 20
  }, 150 + game.rnd.between(0, 50), Phaser.Easing.Quintic.In, true, 0, -1).yoyo(true, game.rnd.between(600, 1200));
  // this is how it works:
  // 1 - The spike starts outside the terrain at a random height
  // 2 - The tween itself makes it completely disappear into the terrain at a random speed
  // 3 - The Quintic easing makes the movement not linear
  // 4 - The movement is repeated forever
  // 5 - There is a yoyo effect with a random delay. Such delay is when your panda can safely pass   
};
Spike.prototype = Object.create(Phaser.Sprite.prototype);
Spike.prototype.constructor = Spike;
Spike.prototype.update = function() {
  if (this.x < -40) {
    this.destroy();
  }
}