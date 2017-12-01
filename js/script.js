$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'>";
	startScreen += "<a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  // added line to test issue on GitHub Viewer
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>";
	gameHTML += "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>";
	gameHTML += "<i class='fa fa-thumbs-o-down-5x' aria-hidden='true'></i>";	
	gameHTML += imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>";
	gameHTML += "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>";
	gameHTML += "<p>" + answerInfo[questionCounter] + "</p>"
	gameHTML += imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>";
	gameHTML += "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>";
	gameHTML += "<p>Sorry: " + answerInfo[questionCounter] + "</p>"
	gameHTML += "<i class='fa fa-thumbs-o-down-5x' aria-hidden='true'></i>";
	gameHTML += imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>";
	gameHTML += "Time Remaining: <span class='timer'>30</span></p>";
	gameHTML += "<p class='text-center'>" + questionArray[questionCounter] + "</p>";
	gameHTML += "<p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p>";
	gameHTML += "<p class='answer'>B. "+ answerArray[questionCounter][1]+"</p>";
	gameHTML += "<p class='answer'>C. "+ answerArray[questionCounter][2]+ "</p>";
	gameHTML += "<p class='answer'>D. " + answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Which company released the first home video game console in 1972?", 
"Which of the following features was famously lacking in the Odyssey?", 
"How many Odyssey units were sold in the first year of the console's release?", 
"What 1972 Atari game rushed a host of home console clones?", 
"How many cloned versions of Atari's home 'Pong' console flooded the market between 1975 and 1977?", 
"What company introduced the first central processing unit-based console to the American market in 1976?", 
"When did Atari release it's classic Video Computer System (VCS) console, which would later be known as the 2600?", 
"What classic Atari game did both Steve Jobs and Steve Wozniak have a hand in creating?",
"Last Question: What 1982 Atari game do many video game fans lament as one of the worst games in history?"];
var answerArray = [["GE", "Magnavox", "RCA", "Atari"], 
["Color","Sound","Color and Sound","None of the above"], 
["100", "10,000", "100,000", "220,000"], 
["Frogger","Pac-Man","Pong","Space-Invaders"], 
["Sears", "J.C. Penney", "Wal-Mart", "Mervins"], 
["30","40","50","60"], 
["Atari", "Fairchild", "Nintendo", "Sega"], 
["1977", "1979", "1980", "1983"],
["Breakout", "Pac-Man", "Pitfall", "Asteroids"],
["Tennis", "Pong", "E.T.", "Q*bert"]];
var imageArray = ["<img class='center-block img-right' src='img/magnavox-odyssey-system.png'>", 
"<img class='center-block img-right' src='img/sound.gif'>", 
"<img class='center-block img-right' src='img/cash.gif'>", 
"<img class='center-block img-right' src='img/pong.gif'>", 
"<img class='center-block img-right' src='img/sears.jpg'>", 
"<img class='center-block img-right' src='img/60.gif'>", 
"<img class='center-block img-right' src='img/fairchild.gif'>", 
"<img class='center-block img-right' src='img/1977.gif'>", 
"<img class='center-block img-right' src='img/breakout.gif'>", 
"<img class='center-block img-right' src='img/et.gif'>"];
var correctAnswers = ["B. Magnavox", 
"B. Sound", 
"C. 100,000", 
"C. Pong", 
"A. Sears", 
"D. 60", 
"B. Fairchild", 
"A. 1977",
"A. Breakout",
"C. E.T."];
var answerInfo = ["The Magnavox Odyssey — originally called the 'Brown Box' — included both a tennis and table tennis-style game.",
"The Odyssey offered color games but lacked sound, leaving players in silence.",
"Magnavox sold more than 100,000 Odyssey consoles by the end of 1972 and went on to sell 300,000 units altogether.",
"Atari sold more than 2,500 'Pong' arcade-style units by the end of 1973, which left the company poised to take on the home console market.",
"Atari released a home version of 'Pong' called the 'Sears Tele-Games Pong' that sold more than 150,000 units during the 1975 holiday season.",
"The 'Pong' craze hit America hard, leading to at least 60 home console clones from manufacturers desperate for a piece of the pie.",
"Fairchild was the first to improve upon the integrated circuit technology of the 'Pong'-style console and create a CPU-based system, the Fairchild Video Entertainment System.",
"Atari moved 250,000 units of its VCS by the end of 1977.",
"The two Apple co-founders both had a hand in creating the game 'Breakout' — a game best described as sideways 'Pong' — for Atari.",
"Poor 'E.T.' Despite the success of the film, Atari's version of the game was a bit of a disaster, selling only about 1.5 million of the 5 million cartridges that the company produced."]
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("audio/bit.mp3");
var clickFail = new Audio("audio/fail.mp3");
var clickWin = new Audio("audio/1up.mp3");