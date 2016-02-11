var game = new Phaser.Game(800, 600, Phaser.AUTO, "", {
  preload: preload,
  create: create
});
var manager = null;
var emitter = null;

function preload() {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.setScreenSize = true;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.forceSingleUpdate = true;
  game.load.image('sky', 'assets/sky10.png');
  game.load.image('cloud', 'assets/cloud.png');
  game.load.image('star', 'assets/star.png');
  game.load.image('phaser', 'assets/phaser.png');
}

function create() {
  game.add.image(0, 0, 'sky');
  game.add.image(328, 240, 'phaser');
  manager = this.game.plugins.add(Phaser.ParticleStorm);
  var data = {
    ignoreForce: true,
    lifespan: 5000,
    image: 'cloud',
    scale: {
      min: 0.25,
      max: 1.5
    }
  };
  //  The stars have ignoreScrollSpeed set, which will disable
  //  them from being influenced by the emitters scroll speed.
  var stars = {
    ignoreScrollSpeed: true,
    lifespan: 3000,
    image: 'star',
    sendToBack: true,
    vx: {
      min: -1.5,
      max: 1.5
    },
    vy: -3
  };
  manager.addData('basic', data);
  manager.addData('stars', stars);
  line = manager.createLineZone(328, 240, 472, 240);
  manager.addData('basic', data);
  emitter = manager.createEmitter();
  //  The Scroll Speed adds a value to the particles x and y
  //  coordinates every frame. It doesn't adjust their velocities
  //  or acceleration, just their final positions each frame.
  emitter.scrollSpeed.y = -3;
  //  The force adjust acceleration
  emitter.force.y = 0.1;
  emitter.addToWorld();
  emitter.emit('basic', [0, 800], 700, {
    repeat: -1,
    frequency: 2000
  });
  emitter.emit('stars', 0, 0, {
    zone: line,
    total: 6,
    repeat: -1,
    frequency: 150
  });
  //game.add.image(432, 487, 'logo');
}