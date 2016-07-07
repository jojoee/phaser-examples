window.onload = function() {
  var game = new Phaser.Game(500, 500, Phaser.CANVAS, "", {
    preload: onPreload,
    create: onCreate
  });
  var sumsArray = [];
  var questionText;
  var randomSum;
  var timeTween;
  var numberTimer;
  var buttonMask;
  var score = 0;
  var scoreText;
  var isGameOver = false;
  var topScore;
  var numbersArray = [-3, -2, -1, 1, 2, 3];

  function buildThrees(initialNummber, currentIndex, limit, currentString) {
    for (var i = 0; i < numbersArray.length; i++) {
      var sum = initialNummber + numbersArray[i];
      var outputString = currentString + (numbersArray[i] < 0 ? "" : "+") + numbersArray[i];
      if (sum > 0 && sum < 4 && currentIndex == limit) {
        sumsArray[limit][sum - 1].push(outputString);
      }
      if (currentIndex < limit) {
        buildThrees(sum, currentIndex + 1, limit, outputString);
      }
    }
  }

  function onPreload() {
    game.load.image("timebar", "assets/timebar.png");
    game.load.image("buttonmask", "assets/buttonmask.png");
    game.load.spritesheet("buttons", "assets/buttons.png", 400, 50);
  }

  function onCreate() {
    topScore = localStorage.getItem("topScore") == null ? 0 : localStorage.getItem("topScore");
    game.stage.backgroundColor = "#cccccc";
    game.stage.disableVisibilityChange = true;
    for (var i = 1; i < 5; i++) {
      sumsArray[i] = [
        [],
        [],
        []
      ];
      for (var j = 1; j <= 3; j++) {
        buildThrees(j, 1, i, j);
      }
    }
    questionText = game.add.text(250, 160, "-", {
      font: "bold 72px Arial"
    });
    questionText.anchor.set(0.5);
    scoreText = game.add.text(10, 10, "-", {
      font: "bold 24px Arial"
    });
    for (var i = 0; i < 3; i++) {
      var numberButton = game.add.button(50, 250 + i * 75, "buttons", checkAnswer, this).frame = i;
    }
    numberTimer = game.add.sprite(50, 250, "timebar");
    nextNumber();
  }

  function gameOver(gameOverString) {
    game.stage.backgroundColor = "#ff0000";
    questionText.text = questionText.text + " = " + gameOverString;
    isGameOver = true;
    localStorage.setItem("topScore", Math.max(score, topScore));
  }

  function checkAnswer(button) {
    if (!isGameOver) {
      if (button.frame == randomSum) {
        score += Math.floor((buttonMask.x + 350) / 4);
        nextNumber();
      } else {
        if (score > 0) {
          timeTween.stop();
        }
        gameOver(button.frame + 1);
      }
    }
  }

  function nextNumber() {
    scoreText.text = "Score: " + score.toString() + "\nBest Score: " + topScore.toString();
    if (buttonMask) {
      buttonMask.destroy();
      game.tweens.removeAll();
    }
    buttonMask = game.add.graphics(50, 250);
    buttonMask.beginFill(0xffffff);
    buttonMask.drawRect(0, 0, 400, 200);
    buttonMask.endFill();
    numberTimer.mask = buttonMask;
    if (score > 0) {
      timeTween = game.add.tween(buttonMask);
      timeTween.to({
        x: -350
      }, 3000, "Linear", true);
      timeTween.onComplete.addOnce(function() {
        gameOver("?");
      }, this);
    }
    randomSum = game.rnd.between(0, 2);
    questionText.text = sumsArray[Math.min(Math.round((score - 100) / 400) + 1, 4)][randomSum][game.rnd.between(0, sumsArray[Math.min(Math.round((score - 100) / 400) + 1, 4)][randomSum].length - 1)];
  }
}