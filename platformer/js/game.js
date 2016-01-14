var game = new Phaser.Game(
  800,
  600,
  Phaser.AUTO,
  'game',
  {
    preload: preload,
    create: create,
    update: update
  }
);

function preload() {
  // load assets
  game.load.image('sky', 'assets/sky.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;

function create() {
  // set physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // set sky
  game.add.sprite(0, 0, 'sky');

  // set platforms
  platforms = game.add.group();
  platforms.enableBody = true;

  // set ground
  var ground;
  ground = platforms.create(0, game.world.height - 64, 'ground');
  ground.scale.setTo(2, 2);
  ground.body.immovable = true;

  // set ledges
  var ledge;
  ledge = platforms.create(400, 400, 'ground');
  ledge.body.immovable = true;
  ledge = platforms.create(-150, 250, 'ground');
  ledge.body.immovable = true;

  // set player
  player = game.add.sprite(32, game.world.height - 150, 'dude');
  game.physics.arcade.enable(player);
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);

  // set star
  stars = game.add.group();
  stars.enableBody = true;

  // generate starts
  for (var i = 0; i < 12; i++) {
    var star;
    star = stars.create(i * 70, 0, 'star');
    star.body.gravity.y = 300;
    star.body.bounce.y = 0.7 + Math.random() * 0.2;
  }

  // set score
  scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  // set controll
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  // collide
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(stars, platforms);

  // check collision
  game.physics.arcade.overlap(player, stars, collectStar, null, this);

  // reset player v x
  player.body.velocity.x = 0;

  // move left
  if (cursors.left.isDown) {
    player.body.velocity.x = -150;
    player.animations.play('left');

  // move right
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150;
    player.animations.play('right');

  // idle
  } else {
    player.animations.stop();
    player.frame = 4;
  }
  
  // Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -350;
  }
}

function collectStar(player, star) {
  // remove star
  star.kill();

  // increase score
  score += 10;
  scoreText.text = 'Score: ' + score;
}
