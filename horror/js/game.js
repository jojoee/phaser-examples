window.onload = function() {
  var game = new Phaser.Game(640, 480, Phaser.CANVAS, "", {
    preload: onPreload,
    create: onCreate,
    update: onUpdate
  });
  var player;
  var wallsBitmap;
  var floor;
  var lightAngle = Math.PI / 4;
  var numberOfRays = 20;
  var rayLength = 100;

  function onPreload() {
    game.load.image("floor", "assets/floor.png");
    game.load.image("walls", "assets/walls.png");
    game.load.image("player", "assets/player.png");
  }

  function goFullScreen() {
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize(true);
  }

  function onCreate() {
    goFullScreen();
    floor = game.add.sprite(0, 0, "floor");
    wallsBitmap = game.make.bitmapData(640, 480);
    wallsBitmap.draw("walls");
    wallsBitmap.update();
    game.add.sprite(0, 0, wallsBitmap);
    player = game.add.sprite(80, 80, "player");
    player.anchor.setTo(0.5, 0.5);
    cursors = game.input.keyboard.createCursorKeys();
    maskGraphics = this.game.add.graphics(0, 0);
    floor.mask = maskGraphics
  }

  function onUpdate() {
    var xSpeed = 0;
    var ySpeed = 0;
    if (cursors.up.isDown) {
      ySpeed -= 1;
    }
    if (cursors.down.isDown) {
      ySpeed += 1;
    }
    if (cursors.left.isDown) {
      xSpeed -= 1;
    }
    if (cursors.right.isDown) {
      xSpeed += 1;
    }
    if (Math.abs(xSpeed) + Math.abs(ySpeed) < 2 && Math.abs(xSpeed) + Math.abs(ySpeed) > 0) {
      var color = wallsBitmap.getPixel32(player.x + xSpeed + player.width / 2, player.y + ySpeed + player.height / 2);
      color += wallsBitmap.getPixel32(player.x + xSpeed - player.width / 2, player.y + ySpeed + player.height / 2);
      color += wallsBitmap.getPixel32(player.x + xSpeed - player.width / 2, player.y + ySpeed - player.height / 2)
      color += wallsBitmap.getPixel32(player.x + xSpeed + player.width / 2, player.y + ySpeed - player.height / 2)
      if (color == 0) {
        player.x += xSpeed;
        player.y += ySpeed;
      }
    }
    var mouseAngle = Math.atan2(player.y - game.input.y, player.x - game.input.x);
    maskGraphics.clear();
    maskGraphics.lineStyle(2, 0xffffff, 1);
    maskGraphics.beginFill(0xffff00);
    maskGraphics.moveTo(player.x, player.y);
    for (var i = 0; i < numberOfRays; i++) {
      var rayAngle = mouseAngle - (lightAngle / 2) + (lightAngle / numberOfRays) * i
      var lastX = player.x;
      var lastY = player.y;
      for (var j = 1; j <= rayLength; j += 1) {
        var landingX = Math.round(player.x - (2 * j) * Math.cos(rayAngle));
        var landingY = Math.round(player.y - (2 * j) * Math.sin(rayAngle));
        if (wallsBitmap.getPixel32(landingX, landingY) == 0) {
          lastX = landingX;
          lastY = landingY;
        } else {
          maskGraphics.lineTo(lastX, lastY);
          break;
        }
      }
      maskGraphics.lineTo(lastX, lastY);
    }
    maskGraphics.lineTo(player.x, player.y);
    maskGraphics.endFill();
    floor.alpha = 0.5 + Math.random() * 0.5;
  }
}