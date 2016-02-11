window.onload = function() {
  var game = new Phaser.Game(640, 480);
  var tileSize = 80;
  var gameTiles = 10;
  var tilesArray = [];
  var tileGroup;
  var playGame = function(game) {}
  playGame.prototype = {
    preload: function() {
      game.load.image("tile", "assets/tile.png");
    },
    create: function() {
      tileGroup = game.add.group();
      for (var i = 0; i < gameTiles; i++) {
        var tile = game.add.image(game.rnd.between(100, game.width - 100), game.rnd.between(100, game.height - 100), "tile");
        tile.anchor.set(0.5);
        tile.startValue = i;
        tile.currentValue = i;
        tile.inputEnabled = true;
        tile.input.enableDrag(false, true);
        var text = game.add.text(0, 0, i.toString(), {
          font: "bold 32px Arial",
          align: "center"
        });
        text.anchor.set(0.5);
        tile.addChild(text);
        tileGroup.add(tile);
        tilesArray.push(tile);
      }
    },
    update: function() {
      for (var i = 0; i < tileGroup.total; i++) {
        tileGroup.getAt(i).currentValue = tileGroup.getAt(i).startValue;
        tileGroup.getAt(i).getChildAt(0).text = tileGroup.getAt(i).currentValue;
      }
      for (i = tileGroup.total - 1; i >= 0; i--) {
        for (var j = i - 1; j >= 0; j--) {
          if (tileGroup.getAt(i).overlap(tileGroup.getAt(j))) {
            tileGroup.getAt(j).currentValue += tileGroup.getAt(i).currentValue;
            tileGroup.getAt(j).getChildAt(0).text = tileGroup.getAt(j).currentValue;
          }
        }
      }
    }
  }
  game.state.add("PlayGame", playGame);
  game.state.start("PlayGame");
}