
/* tested in chrome version  110.0.5481.178, firefox version 110.0 64 bit, Microsoft Edge Version 110.0.1587.57 (Official build) (64-bit) on windows +/
/* reffed from https://www.youtube.com/watch?v=W0MxUHlZo6U&t=1066s with plenty of ammendments and additions - eg 3 second wait at start, game timer and counter, speeding up after certain levels reached, flashing if incorrect or too long etc */
const topLeft = document.querySelector('.top-left-circle');
const topRight = document.querySelector('.top-right-circle');
const bottomLeft = document.querySelector('.bottom-left-circle');
const bottomRight = document.querySelector('.bottom-right-circle');

let sequence = [ ];
let sequenceToGuess = [];
let second = 00;
let count = 00;
let bestScore = 00;
let score = 00;
let turnedOn = false;


function pageLoad() {
  removeHover();
  canClick = false;
  document.getElementById("goCircle").style.backgroundColor= "#f50e0e";// set the dot red at the start
  document.getElementById("startButton").textContent = "START";
  setTimeout(Warning, 20);
  splashText
}


function startGame() {//start button click function
        document.getElementById("goCircle").style.backgroundColor= "#41ea17"; //dot green
        setTimeout(startFlashing, 3000);/// start after 3 seconds
        removeHover();
        document.getElementById("startButton").style.pointerEvents = "none"; //can;t click start button anymore
        document.getElementById('startButton').disabled = true;//can;t click start button anymore
        document.getElementById("startButton").style.backgroundColor= "#3C3837 ";//make start button looked depressed
        document.getElementById("startButton").style.color= "#3C3837 ";//make start button looked depressed
        document.getElementById("levelBox").textContent = String(bestScore).padStart(2, '0'); //levelbox will show the best level and will have at least 2 numbers
        sequence = [
            getRandomCircle()
          ];
     sequenceToGuess = [...sequence];
     document.getElementById('head2').style.visibility = 'hidden';
     document.getElementById('head').innerHTML = "Simon Says";
    
}


const getRandomCircle = ()  => {
  const circles = [
    topLeft,
    topRight,
    bottomLeft,
    bottomRight
  ]

  return circles[parseInt(Math.random() * circles.length)]; 

};


const flash = circle => { 
    return new Promise((resolve, reject) => {
        circle.className += ' active';

      if(score < 5){
        setTimeout(() => {
            circle.className = circle.className.replace(
                ' active',
                ''
              );
              setTimeout(() => {
                resolve();
              }, 500);
           },700);
    }else if(score > 4 && score <9) {//speed up signals
        setTimeout(() => {
            circle.className = circle.className.replace(
                ' active',
                ''
              );
              setTimeout(() => {
                resolve();
              }, 220);
           },250);
    } else if(score > 8 && score <13) {//speed up signals
        setTimeout(() => {
            circle.className = circle.className.replace(
                ' active',
                ''
              );
              setTimeout(() => {
                resolve();
              }, 170);
           },180);
    }else{ setTimeout(() => {
        circle.className = circle.className.replace(
            ' active',
            ''
          );
          setTimeout(() => {
            resolve();
          }, 100);
       },150);//speed up signals
}
     
    });
  };


let canClick = false;

const circleClicked = circleClicked => {
  if (!canClick) return;
  
  const expectedCircle = sequenceToGuess.shift();
   // remove item from seq

  if (expectedCircle === circleClicked){
    document.getElementById('head').innerHTML = "00";
    resetTime ();
    if(sequenceToGuess.length === 0 ){
      //start a new round 
      score += 1;
      if( score > bestScore){
        bestScore = score;
      }
      document.getElementById("scoreBox").textContent = String(score).padStart(2, '0');
      document.getElementById("levelBox").textContent = String(bestScore).padStart(2, '0');
                setTimeout(newRound, 2000);
        
    }
  }else{
       //end the game
       wrongSeq()
       resetTime();
    startAllFlashing();
    setTimeout(ending, 1800);
  }
};

const startFlashing = async () => { 
  document.getElementById('head').innerHTML = "watch";
    resetTime ();
    removeHover();
  canClick = false;
    for (const circle of sequence ){
        await flash(circle);
        
      }
      canClick = true;
      reinstateHover();
      timer = true;
      stopWatch() ;
    };

    function startAllFlashing (){ //all flash 5 times at end
        removeHover()
        allFLashing()
        setTimeout(noneFLashing, 200);
        setTimeout(allFLashing, 400);
        setTimeout(noneFLashing, 600);
        setTimeout(allFLashing, 800);
        setTimeout(noneFLashing, 1000);
        setTimeout(allFLashing, 1200);
        setTimeout(noneFLashing, 1400);
        setTimeout(allFLashing, 1600);
        setTimeout(noneFLashing, 1800);
        setTimeout(splashText, 1800);
      
          };

    function allFLashing() {//setting parameters for all to flash
        document.getElementById("green").className = "circle top-left-circle active"; 
        document.getElementById("red").className = "circle top-right-circle active";
        document.getElementById("yellow").className = "circle bottom-left-circle active";
        document.getElementById("blue").className = "circle bottom-right-circle active";
    }

    function noneFLashing() {//setting parameters for all to unflash
        document.getElementById("green").className = "circle top-left-circle";
        document.getElementById("red").className = "circle top-right-circle";
        document.getElementById("yellow").className = "circle bottom-left-circle";
        document.getElementById("red").className = "circle top-right-circle";
        document.getElementById("blue").className = "circle bottom-right-circle";
    }

   
function ending (){ // resetting everything that needs to be reset for the next game
    document.getElementById("goCircle").style.backgroundColor= "red";
    document.getElementById("goCircle").style.backgroundColor= "#f50e0e";
    document.getElementById("startButton").style.pointerEvents = "auto";
    document.getElementById('startButton').disabled = false;
    document.getElementById("startButton").style.backgroundColor= "#9d9d9d ";
    document.getElementById("startButton").style.color= "#000000 ";
    turnedOn = false;
    score = 0;
    document.getElementById("scoreBox").textContent = String(score).padStart(2, '0');
}

function newRound() { // start a new round within the same game 
        //start a new round 
        sequence.push(getRandomCircle());
        sequenceToGuess = [...sequence];
        startFlashing();      
}

function removeHover() { // remove hover so user doesnt click flashing circles ot deactivated 
    document.getElementById("green").style.pointerEvents = "none";
    document.getElementById("red").style.pointerEvents = "none";
    document.getElementById("yellow").style.pointerEvents = "none";
    document.getElementById("blue").style.pointerEvents = "none";
}  

function reinstateHover() { // reinstating the hiver so they can pick the circles
    document.getElementById("green").style.pointerEvents = "auto";
    document.getElementById("red").style.pointerEvents = "auto";
    document.getElementById("yellow").style.pointerEvents = "auto";
    document.getElementById("blue").style.pointerEvents = "auto";
}  

function splashText(){
document.getElementById('head').innerHTML = "Simon Says";
document.getElementById('head2').style.visibility = 'hidden';
}
function tooLong(){
    document.getElementById('head').innerHTML = "00";
    document.getElementById('head2').style.visibility = 'visible';
    document.getElementById('head2').style.color = '#000000';
}

function wrongSeq(){
  document.getElementById('head').innerHTML = "Wrong";
}

function resetTime () {//https://www.geeksforgeeks.org/how-to-create-stopwatch-using-html-css-and-javascript/
	timer = false;
	second = 0;
	count = 0;
}

function stopWatch() {//https://www.geeksforgeeks.org/how-to-create-stopwatch-using-html-css-and-javascript/
	if (timer) {
		count++;

		if (count == 100) {
			second++;
			count = 0;
		}

		
		let secString = second;
		let countString = count;

	
		if (second < 10) {
			secString = "0" + secString;
		}

		if (count < 10) {
			countString = "0" + countString;
		}

		document.getElementById('head').innerHTML = secString;
		
		setTimeout(stopWatch, 10);
        if (secString === "05"){
            document.getElementById('head2').style.visibility = 'visible';
            resetTime();
            startAllFlashing();//after 5 secs reset
            setTimeout(ending, 1600);
            document.getElementById('head2').style.color = '#000000';
        }
	}
}

function Warning (){
  document.getElementById("warnMessage").style.visibility="visible";
  
var close = document.getElementsByClassName("closebtn"); //https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_alerts
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
    
    document.getElementById("gameButtons").style.visibility="visible";
  }
}
}       