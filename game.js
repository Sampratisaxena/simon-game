var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

//when user clicks make sound
function playSound(name){
    var audio =new Audio("sound/"+name+".mp3");
    audio.play();
}
// build array of patern user has to follow(gamePattern)
let level=0;
function nextSequence(){
    $("#level-title").text("Level "+level);
    level++;

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // choosing randomcolour id
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

// build array of user clicked color
var lastIndex=0;
$(".btn").click(function(){
    var userChosenColour= this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    lastIndex=(userClickedPattern.length)-1;
    checkAnswer(lastIndex)
});

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed")
    },100)
}

var started=false;
$(document).on('keydown', function(event) {
    if (!started){
        started = true;
        nextSequence();
    }
});

function checkAnswer(currentLevel){
    var recentClickedByUser=userClickedPattern[currentLevel];
    var recentOfGamePattern=gamePattern[currentLevel];
    if(recentClickedByUser===recentOfGamePattern){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence()
            },1000)
            userClickedPattern=[];
        }
    }else{
        var sound4wrong=new Audio("sounds/wrong.mp3");
        sound4wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    userClickedPattern=[];
}
