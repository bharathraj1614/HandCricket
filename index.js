var flag = 0;
var interval = 0;
var toss = "bowl";
$("#main").hide();
$("body, html").addClass("tossBody");

$("input").click(function () {
  if ($("#option-1").is(":checked")) {
    speakText("You are bowling first");
    toss = "bowl";
    $(".playIndicator").text("Toss bowling first🥎");
    $(".oppHandImg").addClass("border");
  } else {
    speakText("You are batting first");
    toss = "bat";
    $(".playerHandImg").addClass("border");
  }
  $(".wrapper").hide();
  console.log(toss);
  $("#main").show();
  $("body, html").removeClass("tossBody");
});

const runCommentaries = {
  1: [
    "Well-run single.",
    "Quick single taken.",
    "Smart single played.",
    "Smooth single earned.",
    "Confident single.",
    "Efficient single.",
    "Sharp single taken.",
    "Swift single played.",
    "Agile single grabbed.",
    "Clever single taken.",
  ],
  2: [
    "Good placement, two runs.",
    "Timely two taken.",
    "Brisk running, two earned.",
    "Efficient two runs.",
    "Quick double achieved.",
    "Sharp two runs.",
    "Aggressive running, two added.",
    "Smart double taken.",
    "Swift two scored.",
    "Confident double.",
  ],
  3: [
    "Explosive running, three earned.",
    "Quick thinking, three taken.",
    "Powerful stroke, three runs.",
    "Intent shown, three scored.",
    "Aggressive running, three earned.",
    "Swift three taken.",
    "Bold running, three added.",
    "Confident triple scored.",
    "Agile three achieved.",
    "Sharp three runs.",
  ],
  4: [
    "Timely boundary hit!",
    "Perfectly timed boundary.",
    "Skillful boundary scored.",
    "Well-placed four runs.",
    "Boundary hit, well-timed.",
    "Excellent boundary shot.",
    "Classy boundary hit!",
    "Clean boundary stroke.",
    "Effortless four runs.",
    "Precision timing, boundary!",
  ],
  5: [
    "Fielders caught off guard, five grabbed!",
    "Exploiting the misfield, five earned.",
    "Sharp running, five secured.",
    "Creating confusion, five scored.",
    "Fielder misjudged, five taken.",
    "Explosive burst, five achieved.",
    "Taking advantage, five grabbed.",
    "Turning defense into offense, five stolen.",
    "Turning the tables, five scored.",
    "Smart five runs taken.",
  ],
  6: [
    "Massive hit, six runs!",
    "Powerful strike, six scored.",
    "Cracking shot, six earned.",
    "Unleashing power, six taken.",
    "Flawless execution, six hit.",
    "Spectacular hit, six runs!",
    "Maximum power, six earned.",
    "Big swing, six scored.",
    "Clean strike, six hit.",
    "Pure timing, six runs!",
  ],
  7: [
    "Bowled him!",
    "Caught behind!",
    "LBW, and he's gone!",
    "Stumped out!",
    "Run out, unfortunate!",
    "Clean bowled, what a delivery!",
    "Caught out in the deep!",
    "Caught at slip!",
    "Caught in the outfield!",
    "Bowled clean through the gate!",
  ],
};

$(".selectionNum").click(function () {
  var userRun = parseInt($(this).text());
  console.log(userRun);

  // Hide all elements with the class name "selectionNum" using jQuery
  $(".selectionNum").hide();

  var audio = new Audio("sound/cricket_bat_sound.mp3");
  audio.play();
  outCome(userRun, toss);

  setTimeout(function () {
    // Hide all elements with the class name "selectionNum" using jQuery
    $(".selectionNum").show();
  }, 500);

  // playSound(userChosenColour);
  // animatePress(userChosenColour);
});

function outCome(userRun, toss) {
  var oppRun = getRandomInt(1, 6);
  console.log(oppRun);

  /////here add a if statement and exchange the value of user run and opp run if toss is bowling first and down there you can use if to change the comment u win and opp win with same condition
  if (toss == "bowl") {
    var temp = userRun;
    userRun = oppRun;
    oppRun = temp;
    console.log(userRun, oppRun);
  }

  $(".playerHandImg > img").attr("src", "img/" + userRun + ".jpg");
  $(".oppHandImg > img").attr("src", "img/" + oppRun + ".jpg");

  if (userRun == oppRun) {
    if (flag == 0) {
      console.log("User out");
      speakText("Wicket");
      controlHide();
      changeComment(7);
      var target = getCScore() + 1;
      if (toss == "bowl") {
        timedChange(".commentry", target + " runs needed to Win", 2000);
      } else {
        timedChange(".commentry", "Time to Bowl and Defend " + target, 2000);
      }
      $(".tScoreVar").text(target);
      $(".cScoreVar").text(0);
      controlShow();
      flag = 1;
    } else {
      // control comes here if the second batting player is out (when flag == 1 & run1 == run2)
      console.log("Opponent Out");
      changeComment(7);
      // result commentry
      if (getCScore() == parseInt($(".tScoreVar").text()) - 1) {
        timedChange(".commentry", "It's a Draw!", 1000);
        speakText("It is a Draw");
        controlHide();
      } else {
        if (toss == "bowl") {
          timedChange(".commentry", "Opponent WON!", 1000);
          speakText("Opponent Won");
          controlHide();
        } else {
          timedChange(".commentry", "U WIN! 👑", 1000);
          speakText("You have won");
          controlHide();
        }
      }
      windowRef();
    }
  } else {
    console.log(userRun);
    //control comes here if its not a wicket ball and just need to update the score board and we check here if the second inings player wins or not
    if (
      flag == 1 &&
      toss == "bowl" &&
      getCScore() + oppRun > parseInt($(".tScoreVar").text())
    ) {
      // result commentry
      timedChange(".commentry", "U WIN! 👑", 2000);
      speakText("You have won");
      console.log("came if");
      runChange(oppRun);
      controlHide();
      windowRef();
    } else if (
      flag == 1 &&
      getCScore() + oppRun > parseInt($(".tScoreVar").text())
    ) {
      timedChange(".commentry", "Opponent WON!", 1000);
      speakText("Opponent Won");
      runChange(oppRun);
      controlHide();
      windowRef();
    } else if (flag == 1) {
      runChange(oppRun);
      console.log("came else if");
    } else {
      runChange(userRun);
      console.log("came else");
    }
  }
}

function timedChange(cssClass, comment, timedly) {
  var interval = setTimeout(function () {
    $(cssClass).text(comment);
  }, timedly);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cScoreChange(runs) {
  $(".cScoreVar").text($(".cScoreVar").text() + "+" + runs.toString());
  timedChange(".cScoreVar", getCScore() + runs, 800);
}

function getCScore() {
  return parseInt($(".cScoreVar").text());
}

function changeComment(runs) {
  let rand = getRandomInt(0, 9);
  let comm = runCommentaries[runs][rand];
  $(".commentry").text(comm);
  console.log(
    "changed comment: comment & Current batsmans Score: " + comm + " & " + runs
  );
}

function runChange(runs) {
  changeComment(runs);
  cScoreChange(runs);
}

function windowRef() {
  $(".selectionNum").hide();
  setTimeout(function () {
    window.location.reload();
  }, 6000);
}

// the flag is used to check whether the first player got out or not. in other words which innings first(flag==0) or second(flag==1) is going on

function speakText(text) {
  var synth = window.speechSynthesis;
  var utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}

$(".updatesCont").click(function () {
  speakText(getCScore());
});


function controlHide() { 
  $(".scoreSelectionCont").hide();
  console.log("Shakka");
 }

function controlShow() { 
  setTimeout(function () {
    // Hide all elements with the class name "selectionNum" using jQuery
    $(".scoreSelectionCont").show();
  }, 3000);
 }