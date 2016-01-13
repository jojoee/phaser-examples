var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game-canvas');

var mainState = {
  init: function() {
    game.stage.backgroundColor = '#71c5cf';
  },
  preload: function() {
    // load img
    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');

    // Load sound
    game.load.audio('jump', 'assets/jump.wav');
  },
  create: function() {
    // set physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // set pipe
    this.pipes = game.add.group();
    this.pipes.enableBody = true;
    this.pipes.createMultiple(20, 'pipe');
    this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

    // set bird
    this.bird = this.game.add.sprite(100, 245, 'bird');
    game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 1000;
    this.bird.anchor.setTo(-0.2, 0.5); // started bird's position
  
    // receive input (spacebar)
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    // set score
    this.score = 0;
    this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });

    // set sound
    this.jumpSound = this.game.add.audio('jump');
  },
  update: function() {
    if (this.bird.inWorld == false) {
      this.restartGame();

    } else {
      // check collision
      game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);

      // rotate angle if bird downward
      if (this.bird.angle < 20) {
        this.bird.angle += 1;
      }
    }
  },
  jump: function() {
    // if die
    if (this.bird.alive == false) {
      return;

    } else {
      // set v
      this.bird.body.velocity.y = -350;

      // set animatation
      game.add.tween(this.bird).to({angle: -20}, 100).start();

      // play sound
      this.jumpSound.play();
    }
  },
  hitPipe: function() {
    if (this.bird.alive == false) {
      return;

    } else {
      // set alive
      this.bird.alive = false;

      // prevent new pipes from appearing
      this.game.time.events.remove(this.timer);
    
      // Go through all the pipes, and stop their movement
      this.pipes.forEachAlive(function(p) {
        p.body.velocity.x = 0;
      }, this);
    }
  },
  restartGame: function() {
    game.state.start('main');
  },
  addOnePipe: function(x, y) {
    var pipe = this.pipes.getFirstDead();

    pipe.reset(x, y);
    pipe.body.velocity.x = -200;  
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  },
  addRowOfPipes: function() {
    var hole = Math.floor(Math.random() * 5) + 1;
    
    for (var i = 0; i < 8; i++) {
      if (i != hole && i != hole + 1) {
        this.addOnePipe(400, i * 60 + 10);
      }
    }
  
    this.score += 1;
    this.labelScore.text = this.score;
  },
};

game.state.add('main', mainState);  
game.state.start('main'); 
