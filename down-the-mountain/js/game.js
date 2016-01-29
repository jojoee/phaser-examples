window.onload = function() {
  var game = new Phaser.Game(480, 480, Phaser.CANVAS, "", {
    preload: onPreload,
    create: onCreate,
    update: onUpdate
  });
  var hexagonWidth = 70;
  var hexagonHeight = 80;
  var minRow = 0;
  var gridSizeX = 5;
  var gridSizeY = 9;
  var marker;
  var hexagonGroup;
  var hexagonArray = [];
  var cursors;
  var playerCol = 2;
  var playerRow = 0;
  var playerMove = true;

  function onPreload() {
    game.load.image("hexagon", "assets/hexagon.png");
    game.load.image("marker", "assets/marker.png");
  }

  function onCreate() {
    hexagonGroup = game.add.group();
    game.stage.backgroundColor = "#ffffff";
    cursors = game.input.keyboard.createCursorKeys();
    for (var i = 0; i < gridSizeY; i++) {
      addHexagonRow(i);
    }
    hexagonGroup.x = (game.width - hexagonWidth * gridSizeX) / 2;
    hexagonGroup.y = 20;
    marker = game.add.sprite(hexagonGroup.width / 2, 20, "marker");
    marker.anchor.setTo(0.5);
    hexagonGroup.add(marker);
  }

  function onUpdate() {
    if (playerMove) {
      if (cursors.left.isDown && cursors.right.isUp && (playerCol > 0 || (playerRow % 2 == 1))) {
        placeMarker(playerCol - (1 - playerRow % 2), playerRow + 1);
      }
      if (cursors.right.isDown && cursors.left.isUp && playerCol < gridSizeX - 1) {
        placeMarker(playerCol + (playerRow % 2), playerRow + 1);
      }
      if (gridSizeY - playerRow < 8) {
        addHexagonRow(gridSizeY);
        gridSizeY++;
      }
    }
    if (marker.world.y > 60) {
      hexagonGroup.y -= 1;
    }
    if (marker.world.y > 240) {
      hexagonGroup.y -= (marker.world.y - 240);
    }
    var destroyedRow = false;
    for (var i = minRow; i < gridSizeY; i++) {
      for (var j = 0; j < gridSizeX; j++) {
        if ((i % 2 == 0 || j < gridSizeX - 1) && hexagonArray[i][j].world.y < 0) {
          hexagonArray[i][j].destroy();
          destroyedRow = true;
        }
      }
    }
    if (destroyedRow) {
      minRow++;
    }
  }

  function placeMarker(posX, posY) {
    playerRow = posY;
    playerCol = posX;
    var nextX = hexagonWidth * (2 * posX + 1 + posY % 2) / 2;
    var nextY = hexagonHeight * (3 * posY + 1) / 4;
    playerMove = false;
    var playerTween = game.add.tween(marker).to({
      x: nextX,
      y: nextY
    }, 500, Phaser.Easing.Quadratic.InOut, true);
    playerTween.onComplete.add(function() {
      playerMove = true;
    });
    marker.bringToTop();
  }

  function addHexagonRow(i) {
    hexagonArray[i] = [];
    for (var j = 0; j < gridSizeX - i % 2; j++) {
      var hexagonX = hexagonWidth * j + (hexagonWidth / 2) * (i % 2);
      var hexagonY = hexagonHeight * i / 4 * 3;
      var hexagon = game.add.sprite(hexagonX, hexagonY, "hexagon");
      var hexagonText = game.add.text(0 + hexagonWidth / 3 + 5, 0 + 15, i + "," + j);
      hexagonText.font = "arial";
      hexagonText.align = "center";
      hexagonText.fontSize = 10;
      hexagon.addChild(hexagonText);
      hexagonGroup.add(hexagon);
      hexagonArray[i][j] = hexagon;
    }
  }
}