var game = new Phaser.Game(1000, 700, Phaser.AUTO, 'phaser-example', {
  preload: preload,
  create: create,
  update: update,
  render: render
});

function preload() {
  var bmd = game.add.bitmapData(64, 64);
  bmd.ctx.fillStyle = '#ffee00';
  bmd.ctx.arc(32, 32, 32, 0, Math.PI * 2);
  bmd.ctx.fill();
  game.cache.addBitmapData('circle', bmd);
}
var objects,
  slashes,
  line,
  scoreLabel,
  score = 0,
  points = [];

function create() {
  //var blurX = game.add.filter('BlurX');
  //var blurY = game.add.filter('BlurY');
  //slashes.filters = [blurX, blurY];
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = 200;
  objects = game.add.group();
  objects.enableBody = true;
  objects.physicsBodyType = Phaser.Physics.ARCADE;
  objects.createMultiple(4, game.cache.getBitmapData('circle'));
  objects.setAll('checkWorldBounds', true);
  objects.setAll('outOfBoundsKill', true);
  slashes = game.add.graphics(0, 0);
  game.physics.enable(slashes, Phaser.Physics.ARCADE);
  game.physics.enable(objects, Phaser.Physics.ARCADE);
  scoreLabel = game.add.text(10, 10, 'Score');
  scoreLabel.fill = 'white';
  throwObject()
}
var fireRate = 1000;
var nextFire = 0;

function throwObject() {
  if (game.time.now > nextFire && objects.countDead() > 0) {
    nextFire = game.time.now + fireRate;
    var obj = objects.getFirstDead();
    obj.reset(game.world.centerX + Math.random() * 100 - Math.random() * 100, 600);
    game.physics.arcade.moveToXY(obj, game.world.centerX, game.world.centerY, 430);
  }
}

function update() {
  throwObject();
  points.push({
    x: game.input.activePointer.position.x,
    y: game.input.activePointer.position.y
  });
  points = points.splice(points.length - 10, points.length);
}

function render() {
  if (points.length < 2) {
    return;
  }
  slashes.clear();
  slashes.beginFill(0xFFFFFF);
  slashes.alpha = .5;
  slashes.moveTo(points[0].x, points[0].y);
  for (var i = 1; i < points.length; i++) {
    slashes.lineTo(points[i].x, points[i].y);
  }
  slashes.endFill();
  for (var i = 1; i < points.length; i++) {
    line = new Phaser.Line(points[i].x, points[i].y, points[i - 1].x, points[i - 1].y);
    game.debug.geom(line);
    objects.forEachExists(function(fruit) {
      var fruitLine = new Phaser.Line(fruit.body.right - fruit.width, fruit.body.bottom - fruit.body.height, fruit.body.right, fruit.body.bottom);
      game.debug.geom(fruitLine);
      if (Phaser.Line.intersects(line, fruitLine)) {
        score++;
        scoreLabel.text = 'Score: ' + score;
        fruit.kill();
      }
    });
  }
}