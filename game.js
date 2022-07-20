let gamePattern = [];
userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];

$(".btn").click(function(){
    let userChoosenColor=$(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
})
let isStarted=false;
let level=0;
function nextSequence() {
  
   let randomNumber = Math.floor(Math.random() * 3) + 1;

    let randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100);

   playSound(randomChoosenColor);
   ++level;
   $("h1").html("level "+level);
  
}


function playSound(name){
      
    var audio1 = new Audio("sounds/" + name + ".mp3");
    audio1.play();
}

function animatePress(buttonColor){
    $("#"+buttonColor).addClass("pressed");
    setTimeout(function(){
        $("#"+buttonColor).removeClass("pressed")
    },100);
}

$(document).on("keydown",function(){
    if(!isStarted){
    $("h1").html("level "+level);
    nextSequence();
    isStarted=true;
    }
    
});


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(nextSequence,1000);
            userClickedPattern=[];
        }
    }
    else{
        const audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("#level-title").text("Game over, Press any key to restart");
        startOver();
    }
    
}

function startOver(){
    level=0;
    gamePattern=[];
    isStarted=false;
}
















