const playBtn = document.querySelector('#play');

playBtn.addEventListener('click', playGame);

const interactText = document.querySelector('.player-interact span');

//Array is organized so next value is the one that beats it, making it easy to check who won
const choices = ["rock", "paper", "scissors", "rock"];

function playRound(playerChoice, computerChoice) {
    document.getElementById("player-choice").src = "../img/" + playerChoice + ".png";
    document.getElementById("computer-choice").src = "../img/" + computerChoice + ".png";

    const computerChoiceIndex = choices.indexOf(computerChoice);

    // Return 0 if loss, 1 if won, 2 if tie

    if (playerChoice === computerChoice) {

        //Player choice is the same as computer choice so we have a tie
        return 2;
    }
    else if (playerChoice === choices[computerChoiceIndex + 1]) {

        //Player choice is next value from computer choice in choices[] so player wins
        return 1;
    }
    else {
        // Player choice is previous value from computer choice in choices[] so player loses
        return 0;
    }
}

function getComputerChoice() {

    //Generate random num from 0-2, then get and return the value choices[num]]
    const randomNum = Math.floor(Math.random() * 3);
    const computerChoice = choices[randomNum];
    return computerChoice;
}

async function getPlayerChoice() {
    let rockButton = document.getElementById("rock");
    let paperButton = document.getElementById("paper");
    let scissorsButton = document.getElementById("scissors");

    let playerSelection = "";

    const promise = new Promise((resolve) => {
        rockButton.addEventListener('click', () => {
            playerSelection = "rock";
            resolve();
        });
        paperButton.addEventListener('click', () => {
            playerSelection = "paper";
            resolve();
        });
        scissorsButton.addEventListener('click', () => {
            playerSelection = "scissors";
            resolve();
        });
    });

    await promise;

    return playerSelection;
}

function gameOver(playerScore, computerScore) {
    console.log("Your score:" + playerScore);

    console.log("Computer score:" + computerScore);

    if (playerScore === computerScore) {
        console.log("You tied! There is no winner!");
    }
    else if (playerScore < computerScore) {
        console.log("You lost to a computer!");
    }
    else if (playerScore > computerScore) {
        console.log("You won! Congratulations!");
    }
    else {
        console.log("Unable to determine winner");
    }
}

function getNumberOfRounds() {
    let rounds = document.getElementById("rounds-ammount").value;

    //If rounds input is negative, 0, or not a number, ask player to enter a positive number value
    if (rounds <= 0 || isNaN(rounds)) {
        alert("You must choose a positive number");
        return;
    }
    else {
        return rounds;
    }
}

async function playGame() {
    //Initialize scores to 0
    let playerScore = 0;
    let computerScore = 0;

    const rounds = getNumberOfRounds();

    if (!rounds) return;

    //Play x amount of rounds
    for (let i = 0; i < rounds; i++) {
        const computerSelection = getComputerChoice();
        const playerSelection = await getPlayerChoice();

        //Display what each side chose
        console.log("Computer chose:" + computerSelection);
        console.log("You chose:" + playerSelection);


        //Get the result of the round
        const result = playRound(playerSelection, computerSelection);

        document.getElementById("player-choice").src = "../img/" + playerSelection + ".png";
        document.getElementById("computer-choice").src = "../img/" + computerSelection + ".png";

        //Determine how the scores should change if at all
        switch (result) {

            //Player lost so computer gets a point
            case 0:
                console.log("The computer wins this round");
                computerScore++;
                continue;

            //Player won so they get a point
            case 1:
                console.log("You win this round");
                playerScore++;
                continue;

            //Tied so go to next round
            case 2:
                console.log("This round is tied");
                continue;

            //Could not determine round result
            default:
                console.log("The game result value is unexpected");
                continue;
        }
    }

    //Calculate results
    gameOver(playerScore, computerScore);

    if (window.confirm("Do you want to play again?")) {
        location.reload();
    }
    else {
        alert("Thanks for playing");
    }
}

