function playGame() {
    // Step 1: Prompt the player for their choice
    let playerChoice = prompt("Enter rock, paper, or scissors:").toLowerCase();

    // Step 2: Generate the computer's random choice
    let choices = ["rock", "paper", "scissors"];
    let computerChoice = choices[Math.floor(Math.random() * 3)];

    // Step 3: Determine the winner
    function determineWinner(player, computer) {
       //Fill in Code Here
    }

    let result = determineWinner(playerChoice, computerChoice);

    // Step 4: Display the result

}

playGame();
