window.onload = function() {
  var game = new Phaser.Game(640, 480, Phaser.CANVAS, "", {
    preload: onPreload,
    create: onCreate,
    update: onUpdate
  });
  var tailLength = 1;
  var tailNodes = 300;
  var nodes = Array();
  var canvas;
  var bitmap;
  // THE GAME IS PRELOADING
  function onPreload() {
    game.load.image("maze", "assets/maze.png");
    for (i = 0; i < tailNodes; i++) {
      nodes[i] = {
        x: 0,
        y: 0
      };
    };
  }
  // THE GAME HAS BEEN CREATED
  function onCreate() {
    bitmap = game.make.bitmapData(640, 480);
    bitmap.draw("maze");
    bitmap.update();
    game.add.sprite(0, 0, bitmap);
    canvas = game.add.graphics(0, 0);
  }
  // THE GAME IS GOING TO BE UPDATED
  function onUpdate() {
    canvas.clear();
    canvas.alpha = 1;
    canvas.lineStyle(2, 0x00ff00, 1);
    var headX = game.input.x;
    var headY = game.input.y;
    canvas.moveTo(headX, headY);
    nodes[0] = {
      x: headX,
      y: headY
    };
    for (i = 1; i < tailNodes - 1; i++) {
      var nodeAngle = Math.atan2(nodes[i].y - nodes[i - 1].y, nodes[i].x - nodes[i - 1].x);
      nodes[i] = {
        x: nodes[i - 1].x + tailLength * Math.cos(nodeAngle),
        y: nodes[i - 1].y + tailLength * Math.sin(nodeAngle)
      }
      var color = bitmap.getPixelRGB(Math.round(nodes[i].x), Math.round(nodes[i].y));
      if (color.a != 0) {
        canvas.lineStyle(2, 0xff0000, 1)
          //console.log("qio");
      } else {
        //console.log("li");
      }
      canvas.lineTo(nodes[i].x, nodes[i].y);
    }
  }
};