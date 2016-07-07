playLevel = {
  create: function() {
    // showing level title
    var style = {
      font: "32px Arial",
      fill: "#ffffff"
    };
    var levelTitle = game.add.text(0, 0, "PLAYING LEVEL " + game.global.level, style);
    levelTitle.align = "center";
    levelTitle.x = (game.width - levelTitle.width) / 2;
    // showing game thumbnails
    for (var i = 0; i <= 3; i++) {
      var gameThumb = game.add.button(game.width / 2, 90 * (i + 1), "game", this.levelFinished, this);
      gameThumb.anchor.setTo(0.5);
      gameThumb.frame = i;
    }
  },
  levelFinished: function(button) {
    // did we improved our stars in current level?
    if (game.global.starsArray[game.global.level - 1] < button.frame) {
      game.global.starsArray[game.global.level - 1] = button.frame;
    }
    // if we completed a level and next level is locked - and exists - then unlock it
    if (button.frame > 0 && game.global.starsArray[game.global.level] == 4 && game.global.level < game.global.starsArray.length) {
      game.global.starsArray[game.global.level] = 0;
    }
    // back to level selection
    game.state.start("LevelSelect");
  }
}