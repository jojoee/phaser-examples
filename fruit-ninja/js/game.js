var w = window.innerWidth,
  h = window.innerHeight;
var game = new Phaser.Game(w, h, Phaser.AUTO, 'game', {
  preload: preload,
  create: create,
  update: update,
  render: render
});

function preload() {
  var bmd = game.add.bitmapData(100, 100);
  bmd.ctx.fillStyle = '#00ff00';
  bmd.ctx.arc(50, 50, 50, 0, Math.PI * 2);
  bmd.ctx.fill();
  game.cache.addBitmapData('good', bmd);
  var bmd = game.add.bitmapData(64, 64);
  bmd.ctx.fillStyle = '#ff0000';
  bmd.ctx.arc(32, 32, 32, 0, Math.PI * 2);
  bmd.ctx.fill();
  game.cache.addBitmapData('bad', bmd);
}
var good_objects,
  bad_objects,
  slashes,
  line,
  scoreLabel,
  score = 0,
  points = [];
var fireRate = 1000;
var nextFire = 0;

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = 300;
  good_objects = createGroup(4, game.cache.getBitmapData('good'));
  bad_objects = createGroup(4, game.cache.getBitmapData('bad'));
  slashes = game.add.graphics(0, 0);
  scoreLabel = game.add.text(10, 10, 'Tip: get the green ones!');
  scoreLabel.fill = 'white';
  emitter = game.add.emitter(0, 0, 300);
  emitter.makeParticles('parts');
  emitter.gravity = 300;
  emitter.setYSpeed(-400, 400);
  throwObject();
}

function createGroup(numItems, sprite) {
  var group = game.add.group();
  group.enableBody = true;
  group.physicsBodyType = Phaser.Physics.ARCADE;
  group.createMultiple(numItems, sprite);
  group.setAll('checkWorldBounds', true);
  group.setAll('outOfBoundsKill', true);
  return group;
}

function throwObject() {
  if (game.time.now > nextFire && good_objects.countDead() > 0 && bad_objects.countDead() > 0) {
    nextFire = game.time.now + fireRate;
    throwGoodObject();
    if (Math.random() > .5) {
      throwBadObject();
    }
  }
}

function throwGoodObject() {
  var obj = good_objects.getFirstDead();
  obj.reset(game.world.centerX + Math.random() * 100 - Math.random() * 100, 600);
  obj.anchor.setTo(0.5, 0.5);
  //obj.body.angularAcceleration = 100;
  game.physics.arcade.moveToXY(obj, game.world.centerX, game.world.centerY, 530);
}

function throwBadObject() {
  var obj = bad_objects.getFirstDead();
  obj.reset(game.world.centerX + Math.random() * 100 - Math.random() * 100, 600);
  obj.anchor.setTo(0.5, 0.5);
  //obj.body.angularAcceleration = 100;
  game.physics.arcade.moveToXY(obj, game.world.centerX, game.world.centerY, 530);
}

function update() {
  throwObject();
  points.push({
    x: game.input.x,
    y: game.input.y
  });
  points = points.splice(points.length - 10, points.length);
  //game.add.sprite(game.input.x, game.input.y, 'hit');
  if (points.length < 1 || points[0].x == 0) {
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
    good_objects.forEachExists(checkIntersects);
    bad_objects.forEachExists(checkIntersects);
  }
}
var contactPoint = new Phaser.Point(0, 0);

function checkIntersects(fruit, callback) {
  var l1 = new Phaser.Line(fruit.body.right - fruit.width, fruit.body.bottom - fruit.height, fruit.body.right, fruit.body.bottom);
  var l2 = new Phaser.Line(fruit.body.right - fruit.width, fruit.body.bottom, fruit.body.right, fruit.body.bottom - fruit.height);
  l2.angle = 90;
  if (Phaser.Line.intersects(line, l1, true) ||
    Phaser.Line.intersects(line, l2, true)) {
    contactPoint.x = game.input.x;
    contactPoint.y = game.input.y;
    var distance = Phaser.Point.distance(contactPoint, new Phaser.Point(fruit.x, fruit.y));
    if (Phaser.Point.distance(contactPoint, new Phaser.Point(fruit.x, fruit.y)) > 110) {
      return;
    }
    if (fruit.parent == good_objects) {
      killFruit(fruit);
    } else {
      resetScore();
    }
  }
}

function resetScore() {
  var highscore = Math.max(score, localStorage.getItem("highscore"));
  localStorage.setItem("highscore", highscore);
  good_objects.forEachExists(killFruit);
  bad_objects.forEachExists(killFruit);
  score = 0;
  scoreLabel.text = 'Game Over!\nHigh Score: ' + highscore;
  // Retrieve
}

function render() {}

function killFruit(fruit) {
  emitter.x = fruit.x;
  emitter.y = fruit.y;
  emitter.start(true, 2000, null, 4);
  fruit.kill();
  points = [];
  score++;
  scoreLabel.text = 'Score: ' + score;
}