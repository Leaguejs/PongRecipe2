$(function() {
  setInterval(step, 1000/60);

  $("canvas").on("mousemove", function(e) {
    var newPaddleY = event.pageY - $(this).offset().top;
    // paddle y + hard-coded paddle height can't exceed hard-coded canvas height
    if (newPaddleY + 60 <= 480) {
      paddleY = newPaddleY;
    }
  });
});
var gameWidth = 960;
var gameHeight = 480;
var wallBleep = document.getElementById('wallBleep');
var homer = document.getElementById('homer');
var failBleep = document.getElementById('failBleep');
var highScoreText = false;
var ballX = gameWidth/2;
var ballY = gameHeight/2;

 homer.onplaying = function() {
  highScoreText = true;   
}
 homer.onended = function() {
    highScoreText = false;
};