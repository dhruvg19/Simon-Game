var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var level = 0;
var currentIndex=0;

$(document).on("keydown",function(){
  if(level == 0) {
    console.log(level);
    console.log(gamePattern.length);
    nextSequence();
  }
});

$(".btn").click(function(){
  userChosenButton = $(this).attr("id");
  if(userChosenButton == gamePattern[currentIndex]){
    currentIndex++;
    if(currentIndex == gamePattern.length) {
      setTimeout(nextSequence,1000);
    }
    playSound(userChosenButton);
    $(this).addClass("pressed");
    setTimeout(function(){
      $("#"+userChosenButton).removeClass("pressed");
    },100);
  }
  else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("#level-title").text("Game Over, Press any key to restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    level=0;
    gamePattern=[];
  }

});

function nextSequence(){
  level ++;
  $("#level-title").text("Level "+level);
  randomNumber = Math.floor(Math.random()*4);
  myColour = buttonColours[randomNumber];
  gamePattern.push(myColour);
  $("#" + myColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(myColour);
  currentIndex=0;
}

function playSound(colour){
  audio = new Audio("sounds/"+colour+".mp3");
  audio.play();
}
