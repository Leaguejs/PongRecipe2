

// 1. Make 4 variables for paddle width, paddle height, 

// paddle X, paddle Y.

//    all variables are int type.
// With Javascript, variable types do not have to be defined
// for example...:
//   In Java:
//      int paddleHeight = 8;
//      string paddleName = "paddle";
//   in Javascript:
//      var paddleHeight = 8;
//      var paddleName = "paddle";
//   Notice how we use "var" instead of "int" or "string"

/*Students don't like to read^^^*/

var paddleHeight = 100;
var paddleWidth = 20;
var paddleX = 20;
var paddleY = 500;

var ballSpeedX = 400;
var ballSpeedY = 400;
var score = 0;
var highScore = 0;

var hitBleep = document.getElementById('hitBleep');
var t = 0;
var dt = 1/60;

var ballRadius = 10;
var TAU = 2*Math.PI;

var ballBorderColor = "white";
var ballFillColor = "white";


function step() {
  update();
  draw();
}

function drawBall(context) {
  //context.fillStyle controls the color of the next object drawn.
  context.fillStyle = ballFillColor;
  context.lineWidth = 3;
  context.strokeStyle = ballBorderColor;
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, TAU);
  context.stroke();
  context.fill();
}

//This fuction will return you a random color.

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var paddleY = 0;
function drawPaddle(context) {
  // 2. Set the context.fillStyle to a color. Look at the function "drawBall" for an example.
  context.fillStyle = "white";
  // 3. Use context.fillRect to create your paddle.
   context.font = "30px Arial";
    context.fillText("score "+ score,23,23);

  context.font = "30px Arial";
    context.fillText("High "+ highScore,400,23);
    context.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

function draw() {
  var canvas = $("canvas").get(0);
  var context = canvas.getContext("2d");
  context.fillStyle = "white";
  
    context.clearRect(0, 0, gameWidth, gameHeight);
  drawBall(context);
  if(highScoreText){
 context.fillText("YES! HIGH SCORE", 200,200);
  }
  // 3. Call your drawPaddle function here.
  drawPaddle(context);
 
}


function update() {
  t += dt;

  // TODO: Check collisions
  collisions();
  ballX += dt * ballSpeedX;
  ballY += dt * ballSpeedY;
}

function collisions() {
  // 9. Add call to your 
  paddleBallCollision();
  if (ballX > (gameWidth- ballRadius)) {
     ballFillColor = getRandomColor();
    //BONUS: Change the ballBorderColor and ballFillColor using the getRandomColor() function every
    //       time the ball hits the wall.
    wallBleep.play();
    ballSpeedX = -ballSpeedX;
    ballX += ballSpeedX * dt;
  }

  if ((ballX - ballRadius) < 0) {
    failBleep.play();
    ballSpeedX = 400;
    ballSpeedY = 400;
      ballX = 400;
    ballY = 400;
    if(score>highScore){
      highScore = score;
      homer.play();
      
    }
    score = 0;
    
  }

  if (ballY > (gameHeight - ballRadius) || (ballY - ballRadius) < 0) {
    wallBleep.play();
    ballSpeedY = -ballSpeedY;
    ballY += ballSpeedY * dt;
  }
}


function paddleBallCollision() {
  // 4. Check paddleY position with ballY
   if(ballY >= paddleY && ballY <= paddleY + paddleHeight){
       // 5. Check paddleX position with ballX
      if(ballX >= paddleX  && ballX <= paddleX + paddleWidth ){
          console.log("HIT"+score);
        hitBleep.play();
             // 6. Reverse speed of ball
        ballSpeedX = -ballSpeedX*1.1;
        ballSpeedY= -ballSpeedY*1.1;
        score++;
      }
     
     
     
   }
  

  // 7. Add Score

  // 8. Use hitBleep to play the sound when the paddle hits.
  // BONUS: Add logic to increase speed after each hit.
  // Add a high score

}