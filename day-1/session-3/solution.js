function playGame() {
    // Step 1: Prompt the player for their choice
    let playerChoice = prompt("Enter rock, paper, or scissors:").toLowerCase();

    // Step 2: Generate the computer's random choice
    let choices = ["rock", "paper", "scissors"];
    let computerChoice = choices[Math.floor(Math.random() * 3)];

    // Step 3: Determine the winner
    function determineWinner(player, computer) {
        if (player === computer) {
            return "It's a tie!";
        } else if ((player === "rock" && computer === "scissors") ||
                   (player === "scissors" && computer === "paper") ||
                   (player === "paper" && computer === "rock")) {
            return "You win!";
        } else {
            return "Computer wins!";
        }
    }

    let result = determineWinner(playerChoice, computerChoice);

    // Step 4: Display the result
    console.log("You chose: " + playerChoice);
    console.log("Computer chose: " + computerChoice);
    console.log(result);
}

playGame();
