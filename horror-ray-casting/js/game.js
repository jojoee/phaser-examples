window.onload = function() {
  var game = new Phaser.Game(640, 480, Phaser.CANVAS, "", {
    create: onCreate
  });
  // the canvas where we will show the obstaclesCanvas
  var obstaclesCanvas;
  // the canvas where we will show the light
  var lightCanvas;
  // number of boxes on the stage
  var numBoxes = 5;
  // array which will store all polygons
  var polygons = [];

  function onCreate() {
    // listener to mouse movement   
    moveIndex = game.input.addMoveCallback(move, this);
    // the canvas where we will show the obstaclesCanvas
    obstaclesCanvas = game.add.graphics(0, 0);
    // line style of obstacle canvas
    obstaclesCanvas.lineStyle(4, 0xffffff, 1);
    // the canvas where we will display the scene
    lightCanvas = game.add.graphics(0, 0);
    // placing some ramdom boxes
    for (var i = 0; i < numBoxes; i++) {
      randomBox();
    }
    // placing the perimeter box
    polygons.push([
      [-1, -1],
      [game.width + 1, -1],
      [game.width + 1, game.height + 1],
      [-1, game.height + 1]
    ]);
  }

  function randomBox() {
    do {
      // drawing boxes with random width, height and upper corner coordinates
      var width = game.rnd.between(50, 150);
      var height = game.rnd.between(50, 150);
      var startX = game.rnd.between(10, game.width - 160);
      var startY = game.rnd.between(10, game.height - 160);
    } while (boxesIntersect(startX, startY, width, height))
    // drawing the boxes
    obstaclesCanvas.drawRect(startX, startY, width, height);
    // pushing the newly created box into polygons array
    polygons.push([
      [startX, startY],
      [startX + width, startY],
      [startX + width, startY + height],
      [startX, startY + height]
    ]);
  }
  // this is just a function to prevent boxes to insersect or the library won't work
  function boxesIntersect(x, y, w, h) {
    for (var i = 0; i < polygons.length; i++) {
      if (x < polygons[i][1][0] && x + w > polygons[i][0][0] && y < polygons[i][3][1] && y + h > polygons[i][0][1]) {
        return true;
      }
    }
    return false;
  }

  function move() {
    // when the mouse is moved, we determine the new visibility polygon   
    var visibility = createLightPolygon(game.input.worldX, game.input.worldY);
    // then we draw it
    lightCanvas.clear();
    lightCanvas.lineStyle(2, 0xff8800, 1);
    lightCanvas.beginFill(0xffff00);
    lightCanvas.moveTo(visibility[0][0], visibility[0][1]);
    for (var i = 1; i <= visibility.length; i++) {
      lightCanvas.lineTo(visibility[i % visibility.length][0], visibility[i % visibility.length][1]);
    }
    lightCanvas.endFill();
  }
  // and this is how the library generates the visibility polygon starting
  // from an array of polygons and a source point
  function createLightPolygon(x, y) {
    var segments = VisibilityPolygon.convertToSegments(polygons);
    segments = VisibilityPolygon.breakIntersections(segments);
    var position = [x, y];
    if (VisibilityPolygon.inPolygon(position, polygons[polygons.length - 1])) {
      return VisibilityPolygon.compute(position, segments);
    }
    return null;
  }
}