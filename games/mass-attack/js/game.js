window.onload = function() {
  var game = new Phaser.Game(320, 480, Phaser.CANVAS, "", {
    preload: onPreload,
    create: onCreate,
    update: onUpdate
  });
  // this array will handle the balance itself along with its graphics and data
  var balance = [];
  // are we making the ball grow?
  var growBall = false;
  // the ball itself
  var ball;
  // changing these variables will affect gameplay
  // ball growing speed, in pixels per frame
  var ballGrowingSpeed = 0.5;
  // variable to limit balance movement
  var balanceFriction = 400;
  // maximum ball radius
  var maxDiameter = 50;
  // preloading images
  function onPreload() {
    game.load.image("balance", "assets/balance.png");
    game.load.image("ball", "assets/ball.png");
  }
  // blueprint function to scale the game, you will want to use it in all your projects 
  function scaleGame() {
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize();
  }

  function onCreate() {
    scaleGame();
    // balance[0] will be the left balance
    balance[0] = game.add.group();
    // set left balance weight to zero
    balance[0].weight = 0;
    // balance[1] will be the right balance
    balance[1] = game.add.group();
    // set right balance weight to zero
    balance[1].weight = 0;
    // adding the balance sprite to left balance, a 160x20 rectangle
    var balanceSprite = game.add.sprite(80, 240, "balance");
    balanceSprite.anchor.x = 0.5;
    balanceSprite.anchor.y = 0.5;
    balance[0].add(balanceSprite);
    // adding the balance sprite to right balance 
    balanceSprite = game.add.sprite(240, 240, "balance");
    balanceSprite.anchor.x = 0.5;
    balanceSprite.anchor.y = 0.5;
    balance[1].add(balanceSprite);
    // waiting for the player to click/touch the screen, then call placeBall function
    game.input.onDown.add(placeBall, this);
  }
  // the player clicked/touched the screen, so we are going to create a ball
  function placeBall() {
    // add ball sprite at coordinates ("x input",0)
    ball = game.add.sprite(game.input.worldX, 0, "ball");
    ball.anchor.x = 0.5;
    ball.anchor.y = 0.5;
    // setting ball width and height to 1
    ball.width = 1;
    ball.height = 1;
    // ball.balance = 0 if placed on the left half of the screen, else = 1
    ball.balance = Math.floor(ball.x / (game.width / 2))
      // adding the ball to the proper group
    balance[ball.balance].add(ball);
    // placing the ball 30 pixels from the top of the stage, no matter group y position
    ball.y = 30 - balance[ball.balance].y
      // don't wait anymore for the player to click/touch the screen
    game.input.onDown.remove(placeBall, this);
    // wait for the player to release click/touch, then call dropBall function
    game.input.onUp.add(dropBall, this);
    // make ball grow
    growBall = true;
  }
  // at every frame, we just make ball grow if the ball should grow and it still has not reached its maximum diameter
  function onUpdate() {
    if (growBall && ball.width < maxDiameter) {
      ball.width += ballGrowingSpeed;
      ball.height += ballGrowingSpeed;
    }
  }
  // function to be executed when the player released the click/touck, time to make the ball fall
  function dropBall() {
    // the ball stops growing
    growBall = false;
    // the listener is removed
    game.input.onUp.remove(dropBall, this);
    // now it's time to calculate ball destination.
    // it have to land on the top of the balance, whose top side is at y=230
    // ball radius is ball.height/2
    // so the final destination is 230+1-radius
    // the +1 is to give a slight overlap effect not to make the ball seem to actually touch the balance
    var ballDestination = 231 - ball.height / 2;
    console.log(balance[ball.balance].y + " , " + (ball.height / 2) + " -> " + ballDestination)
      // increase balance weight according to ball volume formula
      // volume = 4/3*PI*radius^3
    balance[ball.balance].weight += (4 / 3) * Math.PI * (ball.width / 2) * (ball.width / 2) * (ball.width / 2);
    // tween the ball to its destination during two seconds with a bounce easing effect
    var ballTween = game.add.tween(ball).to({
      y: ballDestination
    }, 2000, Phaser.Easing.Bounce.Out, true);
    // call adjustBalances function once the tween is over
    ballTween.onComplete.add(adjustBalances, this);
  }
  // function to adjust balances position according to weights
  function adjustBalances() {
    // finding the weight difference between the balances and divide it by the friction
    var weightDifference = (balance[0].weight - balance[1].weight) / balanceFriction;
    // limit weight difference to prevent balances fly off the screen
    if (weightDifference > game.height / 3) {
      weightDifference = game.height / 3;
    }
    if (weightDifference < -game.height / 3) {
      weightDifference = -game.height / 3;
    }
    // adding tween to balances
    var balanceTween = game.add.tween(balance[0]).to({
      y: weightDifference
    }, 2000, Phaser.Easing.Quadratic.Out, true);
    var balanceTween2 = game.add.tween(balance[1]).to({
      y: -weightDifference
    }, 2000, Phaser.Easing.Quadratic.Out, true);
    // once the tween is over, you should check if the level has been completed.
    // I'll just let the ball fall again
    balanceTween.onComplete.add(allowBallFalling)
  }
  // this function will just add another listener to create next ball
  function allowBallFalling() {
    game.input.onDown.add(placeBall, this);
  }
};