window.onload = function() {
  var game = new Phaser.Game(320, 400);
  var fieldSize = 6;
  var tileSize = 48;
  var fieldArray = [];
  var startingArrows = 16;
  var doubleRatio = 10;
  var quadrupleRatio = 5;
  var moving = false;
  var offsetX;
  var offsetY;
  var scoreText;
  var topScore;
  var score;
  var playGame = function(game) {}
  playGame.prototype = {
    preload: function() {
      game.stage.backgroundColor = "#888888";
      game.load.spritesheet("tiles", "assets/tiles.png", tileSize, tileSize);
    },
    create: function() {
      score = 0;
      offsetX = (game.width - (fieldSize * tileSize)) / 2 + tileSize / 2;
      offsetY = (game.height - (fieldSize * tileSize)) / 2 + tileSize / 2;
      topScore = localStorage.getItem("topArrowScore") == null ? 0 : localStorage.getItem("topArrowScore");
      scoreText = game.add.text(10, 10, "-", {
        font: "bold 16px Arial"
      });
      updateScore();
      for (var i = 0; i < fieldSize; i++) {
        fieldArray[i] = [];
        for (var j = 0; j < fieldSize; j++) {
          var tileSprite = game.add.sprite(i * tileSize + offsetX, j * tileSize + offsetY, "tiles");
          tileSprite.anchor.setTo(0.5);
          tileSprite.angle = 0
          fieldArray[i][j] = {
            tileValue: 0,
            image: tileSprite,
            arrows: [],
            validMove: false
          };
        }
      }
      for (i = 0; i < startingArrows; i++) {
        addArrow(false);
        game.input.onDown.add(selectArrow, this);
      }
    }
  }

  function updateScore() {
    scoreText.text = "Score: " + score + " - Best: " + topScore;
  }

  function selectArrow(e) {
    if (!moving) {
      var row = Math.floor((e.x - (game.width - (fieldSize * tileSize)) / 2) / tileSize);
      var col = Math.floor((e.y - (game.height - (fieldSize * tileSize)) / 2) / tileSize);
      if (row >= 0 && col >= 0 && row < fieldSize && col < fieldSize) {
        if (fieldArray[row][col].validMove) {
          score++;
          updateScore();
          moving = true;
          addArrow(true);
          for (var i = 0; i < fieldSize; i++) {
            for (var j = 0; j < fieldSize; j++) {
              fieldArray[i][j].validMove = false;
              fieldArray[i][j].image.frame = 0;
            }
          }
          for (j = 0; j < fieldArray[row][col].arrows.length; j++) {
            switch (fieldArray[row][col].arrows[j].direction) {
              case 1:
                var destination = {
                  y: game.height + tileSize / 2
                };
                for (i = col + 1; i < fieldSize; i++) {
                  if (fieldArray[row][i].tileValue > 0) {
                    fieldArray[row][i].image.frame = 1;
                    fieldArray[row][i].validMove = true;
                  }
                }
                break;
              case 2:
                var destination = {
                  x: -tileSize / 2
                }
                for (i = row - 1; i >= 0; i--) {
                  if (fieldArray[i][col].tileValue > 0) {
                    fieldArray[i][col].image.frame = 1;
                    fieldArray[i][col].validMove = true;
                  }
                }
                break;
              case 4:
                var destination = {
                  y: -tileSize / 2
                };
                for (i = col - 1; i >= 0; i--) {
                  if (fieldArray[row][i].tileValue > 0) {
                    fieldArray[row][i].image.frame = 1;
                    fieldArray[row][i].validMove = true;
                  }
                }
                break;
              case 8:
                var destination = {
                  x: game.width + tileSize / 2
                };
                for (i = row + 1; i < fieldSize; i++) {
                  if (fieldArray[i][col].tileValue > 0) {
                    fieldArray[i][col].image.frame = 1;
                    fieldArray[i][col].validMove = true;
                  }
                }
                break;
            }
            fieldArray[row][col].tileValue = 0;
            var arrowTween = game.add.tween(fieldArray[row][col].arrows[j].sprite).to(destination, 400, Phaser.Easing.Cubic.InOut, true);
            arrowTween.onComplete.add(prepareNextMove, this);
          }
          fieldArray[row][col].arrows = [];
          fieldArray[row][col].arrows.length = 0;
        }
      }
    }
  }

  function prepareNextMove(s) {
    s.destroy();
    moving = false;
    var canContinue = false;
    for (var i = 0; i < fieldSize; i++) {
      for (var j = 0; j < fieldSize; j++) {
        if (fieldArray[i][j].validMove) {
          canContinue = true;
          break;
        }
      }
    }
    if (!canContinue) {
      game.stage.backgroundColor = "#880000";
      localStorage.setItem("topArrowScore", Math.max(score, topScore));
      game.time.events.add(Phaser.Timer.SECOND, function() {
        game.state.start("PlayGame");
      }, this);
    }
  }

  function addArrow(multi) {
    do {
      var randomRow = game.rnd.between(0, fieldSize - 1);
      var randomCol = game.rnd.between(0, fieldSize - 1);
    } while (fieldArray[randomRow][randomCol].tileValue != 0)
    do {
      fieldArray[randomRow][randomCol].tileValue = Math.pow(2, game.rnd.between(0, 3));
      if (multi) {
        var isMulti = game.rnd.between(1, 100);
        if (isMulti < doubleRatio) {
          fieldArray[randomRow][randomCol].tileValue = 5 * game.rnd.between(1, 2);
        }
        if (isMulti > 100 - quadrupleRatio) {
          fieldArray[randomRow][randomCol].tileValue = 15;
        }
      }
    } while (!isLegal(randomRow, randomCol));
    fieldArray[randomRow][randomCol].image.frame = 1;
    fieldArray[randomRow][randomCol].validMove = true;
    var powArray = getPowSum(fieldArray[randomRow][randomCol].tileValue);
    for (var i = 0; i < powArray.length; i++) {
      var arrowSprite = game.add.sprite(randomRow * tileSize + offsetX, randomCol * tileSize + offsetY, "tiles");
      arrowSprite.anchor.setTo(0.5);
      arrowSprite.frame = 2;
      switch (powArray[i]) {
        case 2:
          arrowSprite.angle = 90;
          break;
        case 4:
          arrowSprite.angle = 180;
          break;
        case 8:
          arrowSprite.angle = 270;
          break;
      }
      fieldArray[randomRow][randomCol].arrows.push({
        sprite: arrowSprite,
        direction: powArray[i]
      });
    }
  }

  function isLegal(row, col) {
    if (row != 0 && col != 0 && row < fieldSize - 1 && col < fieldSize - 1) {
      return true
    }
    if (row == 0 && fieldArray[row][col].tileValue == 2) {
      return false
    }
    if (row == fieldSize - 1 && fieldArray[row][col].tileValue == 8) {
      return false
    }
    if (col == 0 && fieldArray[row][col].tileValue == 4) {
      return false
    }
    if (col == fieldSize - 1 && fieldArray[row][col].tileValue == 1) {
      return false
    }
    return true
  }

  function getPowSum(n) {
    var bitValue = 1;
    var powerArray = [];
    while (bitValue <= n) {
      if (bitValue & n) {
        powerArray.push(bitValue)
      };
      bitValue <<= 1;
    }
    return powerArray;
  }
  game.state.add("PlayGame", playGame);
  game.state.start("PlayGame")
}