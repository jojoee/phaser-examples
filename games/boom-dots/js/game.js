window.onload = function() {
  var game = new Phaser.Game(320, 480, Phaser.CANVAS);
  var player;
  var enemy;
  var playerTween;
  var enemyTween;
  var score = 0;
  var scoreText;
  var topScore;
  var play = function(game) {}
  play.prototype = {
    preload: function() {
      game.load.image("player", "assets/player.png");
      game.load.image("enemy", "assets/enemy.png");
    },
    create: function() {
      score = 0;
      topScore = localStorage.getItem("topboomdots") == null ? 0 : localStorage.getItem("topboomdots");
      scoreText = game.add.text(10, 10, "-", {
        font: "bold 16px Arial",
        fill: "#acacac"
      });
      updateScore();
      player = game.add.sprite(game.width / 2, game.height / 5 * 4, "player");
      player.anchor.setTo(0.5);
      enemy = game.add.sprite(game.width, 0, "enemy");
      enemy.anchor.set(0.5);
      placePlayer();
      placeEnemy();
    },
    update: function() {
      if (Phaser.Math.distance(player.x, player.y, enemy.x, enemy.y) < player.width / 2 + enemy.width / 2) {
        enemyTween.stop();
        playerTween.stop();
        score++;
        console.log(Math.abs(player.x - enemy.x))
        if (Math.abs(player.x - enemy.x) < 10) {
          score += 2;
        }
        placeEnemy();
        placePlayer();
        updateScore();
      }
    }
  }

  function die() {
    localStorage.setItem("topboomdots", Math.max(score, topScore));
    game.state.start("Play");
  }

  function updateScore() {
    scoreText.text = "Score: " + score + " - Best: " + topScore;
  }

  function placePlayer() {
    player.x = game.width / 2;
    player.y = game.height / 5 * 4;
    playerTween = game.add.tween(player).to({
      y: game.height
    }, 10000 - score * 10, "Linear", true);
    playerTween.onComplete.add(die, this);
    game.input.onDown.add(fire, this);
  }

  function placeEnemy() {
    enemy.x = game.width - enemy.width / 2;
    enemy.y = -enemy.width / 2;
    var enemyEnterTween = game.add.tween(enemy).to({
      y: game.rnd.between(enemy.width * 2, game.height / 4 * 3 - player.width / 2)
    }, 200, "Linear", true);
    enemyEnterTween.onComplete.add(moveEnemy, this);
  }

  function moveEnemy() {
    enemyTween = game.add.tween(enemy).to({
      x: enemy.width / 2
    }, 500 + game.rnd.between(0, 2500), Phaser.Easing.Cubic.InOut, true);
    enemyTween.yoyo(true, 0);
    enemyTween.repeat(50, 0);
  }

  function fire() {
    game.input.onDown.remove(fire, this);
    playerTween.stop();
    playerTween = game.add.tween(player).to({
      y: -player.width
    }, 500, "Linear", true);
    playerTween.onComplete.add(die, this);
  }
  game.state.add("Play", play);
  game.state.start("Play");
}