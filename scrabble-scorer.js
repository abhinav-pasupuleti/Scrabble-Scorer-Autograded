// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");

   let word = input.question("\nEnter a word to score: ");

   return word;
};

function simpleScorer(word){
   return word.length;
}

function vowelBonusScorer(word){
   let vowels = ['A', 'E', 'I', 'O', 'U'];
   let points = 0;

   word = word.toUpperCase();
   for(let i = 0; i<word.length; i++){
      let char = word[i];
      if(vowels.includes(char)){
         points+=3;
      }
      else points++;
   }
   return points
}

let newPointStructure = transform(oldPointStructure);

function scrabbleScorer(word) {
	word = word.toLowerCase();
	
   let points = 0;
	for (let i = 0; i < word.length; i++) {
      points+= newPointStructure[word[i]];
	}
	return points;
 }

let simple = {
   name: "Simple",
   description: "One point per character",
   scorerFunction: simpleScorer
};

let vowelBonus = {
   name: "Vowel Bonus",
   description: "Vowels are worth 3 points",
   scorerFunction: vowelBonusScorer
};

let scrabble = {
   name: "Scrabble",
   description: "Uses scrabble point system",
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [simple, vowelBonus, scrabble];

function scorerPrompt(){
   console.log("Which scoring algorithm would you like to use?\n");

   for(let i = 0; i<=2; i++){
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }
   let scorerAlg = input.question("Enter 0, 1, or 2: ");
   while(scorerAlg<0 || scorerAlg >2 || isNaN(scorerAlg)){
      scorerAlg = input.question("That is not a valid input. Please Enter a valid input: ");
   }

   return scoringAlgorithms[scorerAlg];
}

function transform(oldAlg){
   let newAlg = {};

   for (item in oldAlg){
      for(let i = 0; i < oldAlg[item].length; i++){
         newAlg[oldAlg[item][i].toLowerCase()] = Number(item);
      }
   }

   return newAlg;
}

function runProgram() {
   let wordToGrade = initialPrompt();
   const obj = scorerPrompt();
   console.log(`Score for '${wordToGrade}': ${obj.scorerFunction(wordToGrade)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
