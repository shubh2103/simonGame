var btnCols = ["red", "green", "blue", "brown"];
var pattern = [];
var pressed = [];
var started = 0;
var level = 1;
var bestScore = 0;
$("#best-score").text("Highest Level = 0")
if (started == 0) {
    $(".container").addClass("disable");
}
console.log($("#start").text())
console.log($("#start").text())
console.log($("#start").text())
if (!started) {
    $("#start").click(function () {
        if (!started) {
            $("#start").text("Hurray!");
            $("#level-title").text("Level  " + level);
            started = 1;
            $(".container").removeClass("disable");
            nextSeq();
        }
    });
}

$("#refresh").click(function () {
    location.reload(true);
});

// $(document).keypress(function () {
//     if (!started) {
//         $("#level-title").text("Level  " + level);
//         started = 1;
//         $(".container").removeClass("disable");
//         nextSeq();
//     }
// });

$(".btn").click(function () {
    var userCol = $(this).attr("id");
    pressed.push(userCol);
    playSound(userCol);
    animateBtn(userCol);
    checkAns(pressed.length - 1);
});

function playSound(col) {
    console.log(col);
    var audio = new Audio("sounds/" + col + ".mp3");
    audio.play();
}
function animateBtn(userCol) {
    $("#" + userCol).addClass("pressed");
    setTimeout(function () {
        $("#" + userCol).removeClass("pressed");
    }, 200);
}

function checkAns(currLevel) {
    if (pattern[currLevel] != pressed[currLevel]) {
        $("#best-score").text("Highest Level = " + bestScore);
        $("#level-title").text("Wrong!");
        playSound("wrong");
        pressed = [];
        pattern = [];
        started = 0;
        level = 1;
        $(".container").addClass("disable");
        setTimeout(function () {
            $("#level-title").text("Press Start");
        }, 2000);
        $("#start").text("Start");
        return;
    }
    if (currLevel + 1 == pattern.length) {
        pressed = [];
        level++;
        if (level > bestScore) {
            bestScore = level;
        }
        setTimeout(function () {
            $("#level-title").text("Level  " + level);
            nextSeq();
        }, 1000);
    }
}

function nextSeq() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = btnCols[randomNumber];
    pattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animateBtn(randomChosenColour);
}