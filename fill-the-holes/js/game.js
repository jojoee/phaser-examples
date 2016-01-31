Game = {};
var w = 500;
var h = 400;
var user_clicks = 0;

function rand(num) {
  return Math.floor(Math.random() * num)
};

function in_triangle(pt, a, b, c) {
  var b1 = sign(pt, a, b) < 0;
  var b2 = sign(pt, b, c) < 0;
  var b3 = sign(pt, c, a) < 0;
  return ((b1 == b2) && (b2 == b3));
};

function sign(pt, a, b) {
  return (pt.x - b.x) * (a.y - b.y) - (a.x - b.x) * (pt.y - b.y);
}
Game.Boot = function(game) {};
Game.Boot.prototype = {
  preload: function() {
    game.stage.backgroundColor = '#1abc9c';
    game.load.image('loading', 'images/loading.png');
    game.load.image('loading2', 'images/loading2.png');
  },
  create: function() {
    this.game.state.start('Load');
  }
};
Game.Load = function(game) {};
Game.Load.prototype = {
  preload: function() {
    // set label
    label2 = game.add.text(Math.floor(w / 2) + 0.5, Math.floor(h / 2) - 15 + 0.5, 'loading...', {
      font: '30px Arial',
      fill: '#fff'
    });
    label2.anchor.setTo(0.5, 0.5);

    // set preloading images
    preloading2 = game.add.sprite(w / 2, h / 2 + 15, 'loading2');
    preloading2.x -= preloading2.width / 2;
    preloading2.alpha = 0.5;
    preloading = game.add.sprite(w / 2, h / 2 + 15, 'loading');
    preloading.x -= preloading.width / 2;
    game.load.setPreloadSprite(preloading);

    // load all assets
    game.load.image('wall', 'images/wall.png');
    game.load.image('box', 'images/box.png');
    game.load.image('hole', 'images/hole.png');
    game.load.image('arrows', 'images/arrows.png');
    game.load.audio('hit', 'sounds/hit.wav');
    game.load.audio('next', 'sounds/next.wav');
    game.load.audio('music', 'sounds/music.wav');
  },
  create: function() {
    game.state.start('Menu');
  }
};
var map = [
  // EASY, 1 -> 6
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 2, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 3, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  // MEDIUM, 7 -> 10
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 2, 0, 3, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 3, 0, 0],
    [0, 0, 2, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 3, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 2, 1, 0, 0, 0, 1, 2, 0],
    [0, 0, 2, 0, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 2, 0, 0, 0, 0],
    [0, 2, 0, 0, 1, 1, 3, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 3, 0, 2, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  // HARD, 10 -> 15
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 0, 2, 0, 0, 0, 0],
    [0, 2, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 2, 2, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 2, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 1, 3, 1, 0, 3, 0],
    [0, 3, 0, 3, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 3, 1, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 3],
    [3, 0, 2, 0, 0, 2, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 2, 0],
    [0, 0, 0, 1, 1, 1, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 2, 0, 0, 0, 0],
    [3, 0, 0, 0, 0, 1, 0, 3, 0],
    [2, 0, 0, 1, 1, 1, 0, 0, 3],
    [2, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 2, 0, 2, 2]
  ],
  [
    [0, 0, 0, 0, 2, 0, 0, 0, 3],
    [0, 0, 0, 2, 1, 0, 0, 0, 0],
    [2, 2, 0, 1, 1, 1, 0, 3, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [3, 2, 0, 0, 1, 0, 0, 0, 2],
    [0, 0, 0, 0, 2, 0, 2, 0, 3]
  ],
  /*
  [[0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0]],
  */
];
var text = [
  // easy
  ["fill the hole by clicking on the up arrow in the box"],
  ["this time, fill two holes"],
  ["once a hole is filled, you can slide over it"],
  ["choose the right order"],
  ["the block on the right is a wall, you can use it"],
  ["now let's mix everything you learned"],
  // medium
  ["nice, now you are on your own"],
  [],
  [],
  [],
  // hard
  ["you're quite good, so let's put more holes"],
  ["and even more holes..."],
  ["and even more..."],
  ["and more!"],
  ["do you want to give up now?"]
];
Game.Menu = function(game) {};
Game.Menu.prototype = {
  create: function() {
    game_label = game.add.text(w / 2 + 0.5, 50, 'Fill the Holes', {
      font: '50px Arial',
      fill: '#fff'
    });
    game_label.anchor.setTo(0.5, 0.5);
    explanation_label = game.add.text(w / 2 + 0.5, h - 30 + 0.5, 'click on the box above to start', {
      font: '20px Arial',
      fill: '#fff',
      align: 'center'
    });
    explanation_label.anchor.setTo(0.5, 0.5);
    this.arrows = this.game.add.sprite(w / 2, h / 2, 'arrows');
    this.arrows.anchor.setTo(0.5, 0.5);
    game.add.tween(this.arrows.scale).to({
        x: 1.2,
        y: 1.2
      }, 1000, Phaser.Easing.Linear.None)
      .to({
        x: 1,
        y: 1
      }, 1000, Phaser.Easing.Linear.None).loop().start();
    box = this.game.add.sprite(w / 2, h / 2, 'box');
    box.inputEnabled = true;
    box.anchor.setTo(0.5, 0.5);
    box.input.useHandCursor = true;
    box.events.onInputUp.add(this.box_clicked, this);
    box.events.onOutOfBounds.add(function() {
      game.state.start('Play');
    });
  },
  box_clicked: function(box, pointer) {
    game.add.tween(this.arrows).to({
      alpha: 0
    }, 400, Phaser.Easing.Linear.None).start();
    var center = {
      x: box.x,
      y: box.y
    };
    var speed = 300;
    if (in_triangle(game.input, box.topLeft, box.topRight, center))
      box.body.velocity.y = -speed;
    else if (in_triangle(game.input, box.bottomLeft, box.bottomRight, center))
      box.body.velocity.y = speed;
    else if (in_triangle(game.input, box.bottomLeft, box.topLeft, center))
      box.body.velocity.x = -speed;
    else
      box.body.velocity.x = speed;
    game.stage.canvas.style.cursor = "default";
  },
};
var tile_size = 50;
var offset = {
  x: 25,
  y: 50
};
Game.Play = function(game) {};
Game.Play.prototype = {
  create: function() {
    this.holes = game.add.group();
    this.holes.createMultiple(10, 'hole');
    this.boxes = game.add.group();
    this.boxes.createMultiple(10, 'box');
    this.boxes.setAll('outOfBoundsKill', true);
    this.boxes.setAll('inputEnabled', true);
    this.walls = game.add.group();
    this.walls.createMultiple(10, 'wall');
    this.walls.setAll('body.immovable', true);
    this.reset_button = this.game.add.sprite(w - 80, 0, 'wall');
    this.reset_button.alpha = 0;
    this.reset_button.scale.setTo(1.5, 0.8);
    this.reset_button.inputEnabled = true;
    this.reset_button.input.useHandCursor = true;
    this.reset_button.events.onInputDown.add(this.reset_level, this);
    game.add.text(10, 10, 'Fill the Holes', {
      font: '20px Arial',
      fill: '#fff'
    });
    this.level_label = game.add.text(w / 2, 10, '1/' + map.length, {
      font: '20px Arial',
      fill: '#fff'
    });
    this.level_label.anchor.setTo(0.5, 0);
    restart_label = game.add.text(w - 70, 10, 'restart', {
      font: '20px Arial',
      fill: '#fff'
    });
    this.explanation_label = game.add.text(w / 2, h - 35, '', {
      font: '20px Arial',
      fill: '#fff'
    });
    this.explanation_label.anchor.setTo(0.5, 0);
    this.hit_s = game.add.audio('hit');
    this.next_s = game.add.audio('next');
    game.add.audio('music').play('', 0, 0.15, true);
    this.holes_to_fill = 0;
    this.level = 0;
    this.timer_end_level = 0;
    this.draw_level();
  },
  update: function() {
    if (game.physics.collide(this.boxes, this.walls))
      this.hit_s.play('', 0, 0.3, false);
    game.physics.overlap(this.boxes, this.holes, this.collide_box_hole, null, this);
    if (this.holes_to_fill == 0) {
      this.holes_to_fill = 42;
      this.timer_end_level = game.time.now + 1200;
      this.clear_level2();
    }
    if (this.timer_end_level != 0 && this.timer_end_level < game.time.now) {
      this.timer_end_level = 0;
      this.next_level();
    }
    this.hand = false;
    this.boxes.forEachAlive(this.do_hover, this);
    if (this.hand || Phaser.Rectangle.contains(this.reset_button.body, game.input.x, game.input.y))
      game.stage.canvas.style.cursor = "pointer";
    else
      game.stage.canvas.style.cursor = "default";
  },
  do_hover: function(box) {
    if (Phaser.Rectangle.contains(box.body, game.input.x, game.input.y))
      this.hand = true;
  },
  draw_level: function() {
    this.next_s.play('', 0, 0.1, false);
    var level = map[this.level];
    for (var i = 0; i < level.length; i++)
      for (var j = 0; j < level[i].length; j++)
        if (level[i][j] != 0)
          this.add_tile(j * tile_size + offset.x, i * tile_size + offset.y, level[i][j]);
    this.explanation_label.x = w / 2;
    this.explanation_label.y = h - 35;
    this.explanation_label.content = text[this.level];
    this.explanation_label.scale.setTo(0.1, 0.1);
    this.game.add.tween(this.explanation_label.scale).to({
      x: 1,
      y: 1
    }, 1000, Phaser.Easing.Bounce.Out).start();
  },
  add_tile: function(x, y, type) {
    var tile;
    if (type == 1) {
      tile = this.holes.getFirstExists(false);
      this.holes_to_fill += 1;
    } else if (type == 2) {
      tile = this.boxes.getFirstExists(false);
      tile.scale.setTo(1, 1);
      tile.events.onInputUp.add(this.box_clicked, this);
    } else if (type == 3) {
      tile = this.walls.getFirstExists(false);
    }
    tile.scale.setTo(1, 1);
    tile.anchor.setTo(0.5, 0.5);
    tile.reset(x + tile.width / 2, y + tile.height / 2);
    tile.scale.setTo(0.1, 0.1);
    this.game.add.tween(tile.scale).to({
      x: 1,
      y: 1
    }, 1000, Phaser.Easing.Bounce.Out).start();
  },
  collide_box_hole: function(box, hole) {
    if (!box.alive || !hole.alive)
      return;
    if (box.x > hole.x - 15 && box.x < hole.x + 15 && box.y > hole.y - 15 && box.y < hole.y + 15) {
      box.body.velocity.x = 0;
      box.body.velocity.y = 0;
      box.reset(hole.x, hole.y);
      this.holes_to_fill -= 1;
      box.alive = false;
      hole.alive = false;
      this.hit_s.play('', 0, 0.3, false);
      this.game.add.tween(box.scale).to({
        x: 0.8,
        y: 0.8
      }, 300, Phaser.Easing.Linear.None).start();
    }
  },
  box_clicked: function(box, pointer) {
    user_clicks += 1;
    if (!box.alive || box.body.velocity.x != 0 || box.body.velocity.y != 0)
      return;
    var center = {
      x: box.x,
      y: box.y
    };
    var speed = 300;
    if (in_triangle(game.input, box.topLeft, box.topRight, center))
      box.body.velocity.y = -speed;
    else if (in_triangle(game.input, box.bottomLeft, box.bottomRight, center))
      box.body.velocity.y = speed;
    else if (in_triangle(game.input, box.bottomLeft, box.topLeft, center))
      box.body.velocity.x = -speed;
    else
      box.body.velocity.x = speed;
    game.stage.canvas.style.cursor = "default";
  },
  reset_level: function() {
    user_clicks += 1;
    this.clear_level();
    this.draw_level();
  },
  next_level: function() {
    this.clear_level();
    this.level += 1;
    if (this.level == map.length) {
      this.game.state.start('End');
      return;
    }
    this.level_label.content = (this.level + 1) + '/' + map.length;
    this.draw_level();
  },
  clear_level: function() {
    this.boxes.callAll('kill');
    this.walls.callAll('kill');
    this.holes.callAll('kill');
    this.holes_to_fill = 0;
  },
  clear_level2: function() {
    this.boxes.forEach(this.remove_from_board, this);
    this.walls.forEach(this.remove_from_board, this);
    this.holes.forEach(this.remove_from_board, this);
    this.remove_from_board(this.explanation_label);
  },
  remove_from_board: function(tile) {
    game.add.tween(tile).to({
      alpha: 1
    }, 500, Phaser.Easing.Linear.None).to({
      x: '-500'
    }, 500, Phaser.Easing.Quadratic.In).start();
  }
};
Game.End = function(game) {};
Game.End.prototype = {
  create: function() {
    label1 = game.add.text(w / 2, h / 2 - 20, 'you won! :-D', {
      font: '30px Arial',
      fill: '#fff'
    });
    label1.anchor.setTo(0.5, 0.5);
    label2 = game.add.text(w / 2, h / 2 + 20, 'you clicked ' + user_clicks + ' times during the game', {
      font: '20px Arial',
      fill: '#fff'
    });
    label2.anchor.setTo(0.5, 0.5);
    game.add.tween(label1.scale).to({
        x: 1.3,
        y: 1.3
      }, 1000, Phaser.Easing.Linear.None)
      .to({
        x: 1,
        y: 1
      }, 1000, Phaser.Easing.Linear.None).loop().start();
    emitter = game.add.emitter(w / 2, -200, 100);
    emitter.makeParticles(['box', 'hole', 'wall']);
    emitter.start(false, 5000, 200);
  }
};
var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameContainer');
game.state.add('Boot', Game.Boot);
game.state.add('Load', Game.Load);
game.state.add('Menu', Game.Menu);
game.state.add('Play', Game.Play);
game.state.add('End', Game.End);
game.state.start('Boot');