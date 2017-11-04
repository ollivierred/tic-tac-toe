
(function() {
    //Screen states
    const gameBoard = document.querySelector("#board");
    const screenStart = document.querySelector("#start");
    const screenWin = document.querySelector("#finish");

    //Visibility of each screen
    gameBoard.style.display = "none";
    screenStart.style.display = "none";
    screenWin.style.display = "none";

    //Buttons
    const newGameButton = document.querySelector("#finish a");
    const startGameButton = document.querySelector("#start a");


    //Controls event on window load
    window.addEventListener("load", function() {
        screenStart.style.display = "inherit";

        (function gameStart(){
            startGameButton.addEventListener("click", function() {
                screenStart.style.display = "none";
                gameBoard.style.display = "inherit";
            });
        }());

    }, false);


    //Controls tic-tac-toe board events
    (function board(){
        var player1 = document.querySelector("#player1");
        var player2 = document.querySelector("#player2");
        var boxes = document.querySelector(".boxes");
        var $numOfBoxes = $(".box").length;
        var movesLeft = $numOfBoxes;

        var player = 1;                                     // Decides who goes first: p1 || p2
        player1.className = "players active";

        function addPlayerToken(theBox) {
            var $currentBox = $(theBox);

            if ($currentBox.hasClass("box-filled-1") || $currentBox.hasClass("box-filled-2")) {
                console.log("This box is filled");
                return;
            } else {
                if (player === 1) {                         // Player "O"
                    $currentBox.addClass("box-filled-1");
                    player1.className = "players";
                    player2.className = "players active";
                    player += 1;
                } else if (player === 2) {                  // Player "X"
                    $currentBox.addClass("box-filled-2");
                    player1.className = "players active";
                    player2.className = "players";
                    player -= 1;
                }
            }
            console.log("Your turn player " + player);
        }

        
        boxes.addEventListener("click", function(e) {
            var thisBox = e.target;
            addPlayerToken(thisBox);

            (function gameFinish() {
                movesLeft -= 1;
                console.log("number of moves left " + movesLeft);
                // Track each box filled, record its location on the board, and what it was filled with

                // Check for winner || Tie
                // if player "X" has 3 in a row: horizontally || vertically || diagonally
                // if player "O" has 3 in a row: horizontally || vertically || diagonally
                // else it is a tie
                // Prepare screenWin and message

                if(movesLeft === 0) {
                    // Controls events at the end of each game
                    gameBoard.style.display = "none";
                    screenWin.style.display = "inherit";
                    var message = document.querySelector(".message");
                    message.textContent = "Its a tie";
                }
                newGameButton.addEventListener("click", function() {
                    var $box = $(".box");
                    $box.each( function () {
                        if ($box.hasClass("box-filled-1") || $box.hasClass("box-filled-2")) {
                            $box.removeClass("box-filled-1");
                            $box.removeClass("box-filled-2");
                        }
                    })
                    movesLeft = $numOfBoxes;
                    screenWin.style.display = "none";
                    gameBoard.style.display = "inherit";
                });
            }());

        }, false);

    }());

}());


