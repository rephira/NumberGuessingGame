// Number Guessing Game

// Functions section
// Sorter function to weed out invalid values (values with repeating numbers or values that contain 0)
// this = count {on: # on position, off: # off position, guess: # guessed by the code as a string}
function sorter (value) {
    var output = true
    var stringed = value.toString()
    if (typeof this.guess === "number") {
        var match = { on: 0, off: 0 }; //This will be used to check if the value matches the object 'count'
        for (i=0; i < this.guess.toString().length; i+=1) {
            var refer = this.guess.toString().indexOf(stringed[i]); //Reference number for each run
            if (refer === i ) {
                match.on += 1
            }
            else if ( refer !== -1 ) {
                match.off += 1
            }
        }
        if (match.on!==this.on || match.off!==this.off) {
            output = false
        }
    }
    else {
        for (i = 0; i < stringed.length; i += 1) {
            if (stringed.indexOf(stringed[i]) !== stringed.lastIndexOf(stringed[i]) || stringed.indexOf(0) !== -1) {
                output = false
            }
        }
    }
    return output
}
// Random picker function
function randPick(array) {
    var output = false;
    var chosen = array[Math.floor(Math.random() * array.length)];
    var correct = prompt("My guess is " + chosen + ". Is this the correct answer? (Y/N)");
    if (correct.toUpperCase() === "Y") {
        output = true;
    }
    return {isCorrect:output,guess:chosen} // returning an object as the guessed number is also needed for the next round of sorting
}
// Result checker function
function askResult() {
    var count = {};
    count.on = parseInt(prompt("How many numbers are in the correct position?"))
    count.off = parseInt(prompt("How many numbers are in a wrong position?"))
    return count
}

// Execution section
// Candidate Builder
var counter = 0;
var cand = [];
for (var i = 1234; i <= 9876; i += 1) {
    cand[counter] = i;
    counter += 1;
}
cand = cand.filter(sorter);
// Game part
var winningCall = false; // In the beginning you have not won yet.
var attempts = 0; // Counts how many attempts
do {
    var myCall = randPick(cand);
    winningCall = myCall.isCorrect;
    attempts += 1; // Increase attempt count
    document.write("Attempt #" + attempts + ": My guess was " + myCall.guess + ". I had " + 100/cand.length + "% chance of getting it right on this attempt.</br>")
    if (!winningCall) {
        var result = askResult();
        result.guess = myCall.guess;
        cand = cand.filter(sorter,result); // Enhanced sorter goes here
    }
} while (!winningCall || attempts === 9) // Keep playing till you win or you have used your 9th attempt

if (winningCall) {
    alert("I win!")
}
else {
    alert("Congratulations. You win!")
}