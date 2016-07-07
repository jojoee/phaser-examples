var game;
// colors is actually the array of level pages
var colors = ["0xac81bd", "0xff5050", "0xdab5ff", "0xb5ffda", "0xfffdd0", "0xcc0000", "0x54748b", "0x4b0082", "0x80ab2f", "0xff784e", "0xe500db", "0x223c4a", "0x223c4a", "0xf1290e", "0x648080", "0xbbc1c4", "0x6f98a2", "0x71717e"];
// columns of thumbnails in each page
var columns = 3;
// rows of thumbnails in each page
var rows = 5;
// thumbnail width, in pixels
var thumbWidth = 60;
// thumbnail height, in pizels
var thumbHeight = 60;
// empty space between two thumbnails, in pixels
var spacing = 20;
window.onload = function() {
  game = new Phaser.Game(320, 480, Phaser.AUTO, "");
  game.state.add("PlayGame", playGame);
  game.state.start("PlayGame");
}
var playGame = function(game) {};
playGame.prototype = {
  preload: function() {
    game.load.image("levelthumb", "assets/levelthumb.png");
    game.load.image("transp", "assets/transp.png");
  },
  create: function() {
    game.stage.backgroundColor = "#000044";
    this.pageText = game.add.text(game.width / 2, 16, "Swipe to select level page (1 / " + colors.length + ")", {
      font: "18px Arial",
      fill: "#ffffff"
    })
    this.pageText.anchor.set(0.5);
    this.scrollingMap = game.add.tileSprite(0, 0, colors.length * game.width, game.height, "transp");
    this.scrollingMap.inputEnabled = true;
    this.scrollingMap.input.enableDrag(false);
    this.scrollingMap.input.allowVerticalDrag = false;
    this.scrollingMap.input.boundsRect = new Phaser.Rectangle(game.width - this.scrollingMap.width, game.height - this.scrollingMap.height, this.scrollingMap.width * 2 - game.width, this.scrollingMap.height * 2 - game.height);
    this.currentPage = 0;
    var rowLength = thumbWidth * columns + spacing * (columns - 1);
    var leftMargin = (game.width - rowLength) / 2;
    var colHeight = thumbHeight * columns + spacing * (columns - 1);
    var topMargin = (game.width - colHeight) / 2;
    for (var k = 0; k < colors.length; k++) {
      for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
          var thumb = game.add.image(k * game.width + leftMargin + i * (thumbWidth + spacing), topMargin + j * (thumbHeight + spacing), "levelthumb");
          thumb.tint = colors[k];
          this.scrollingMap.addChild(thumb);
        }
      }
    }
    this.scrollingMap.events.onDragStart.add(function() {
      this.scrollingMap.startPosition = this.scrollingMap.x;
      this.scrollingMap.currentPosition = this.scrollingMap.x;
    }, this);
    this.scrollingMap.events.onDragStop.add(function() {
      if (this.scrollingMap.startPosition - this.scrollingMap.x > game.width / 8) {
        this.changePage(1);
      } else {
        if (this.scrollingMap.startPosition - this.scrollingMap.x < -game.width / 8) {
          this.changePage(-1);
        } else {
          this.changePage(0);
        }
      }
    }, this);
  },
  changePage: function(page) {
    this.currentPage += page;
    this.pageText.text = "Swipe to select level page (" + (this.currentPage + 1).toString() + " / " + colors.length + ")";
    var tween = game.add.tween(this.scrollingMap).to({
      x: this.currentPage * -game.width
    }, 300, Phaser.Easing.Cubic.Out, true);
  }
}