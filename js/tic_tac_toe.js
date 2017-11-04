
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
        var p1 = document.querySelector("#player1");
        var p2 = document.querySelector("#player2");
        var boxes = document.querySelector(".boxes");
        var $numOfBoxes = $(".box").length;
        var movesLeft = $numOfBoxes;
        playerX = [];
        playerO = [];
        // Track each box filled, record its location on the board, and what it was filled with

        var turn = 1;                                     // Decides who goes first: p1 || p2
        player1.className = "players active";

        function addPlayerToken(theBox , tokenPosition) {
            var $currentBox = $(theBox);

            if ($currentBox.hasClass("box-filled-1") || $currentBox.hasClass("box-filled-2")) {
                console.log("This box is filled");
                return;
            } else {
                if (turn === 1) {                         // Player "O"
                    $currentBox.addClass("box-filled-1");
                    var filled = {o: tokenPosition};      // Coordinates of the current box stored in array "filled"
                    playerO.push(filled);                 // Pushes filled array to the player's array
                    p1.className = "players";
                    p2.className = "players active";
                    turn += 1;
                    for (var i=0; i < playerO.length; i+=1) {
                        console.log(playerO[i]);
                    }
                } else if (turn === 2) {                  // Player "X"
                    $currentBox.addClass("box-filled-2");
                    var filled = {x: tokenPosition};      // Coordinates of the current box stored in array "filled"
                    playerX.push(filled);                 // Pushes filled array to the player's array
                    p1.className = "players active";
                    p2.className = "players";
                    turn -= 1;
                    for (var i=0; i < playerX.length; i+=1) {
                        console.log(playerX[i]);
                    }
                }
            }
            console.log("Your turn player " + turn);


        }

        
        boxes.addEventListener("click", function(e) {
            var thisBox = e.target;
            var tokenPosition = thisBox.getAttribute("data-pos");

            addPlayerToken(thisBox, parseInt(tokenPosition));


            // Check for winner using patterns
            // var winPatterns:
            
            //  horizontal

            //  x  y  x  y  x  y
            //  0, 0  0, 1  0, 2 
            //  1, 0  1, 1  1, 2
            //  2, 0  2, 1  2, 2

            //  vertical
            //  x  y  x  y  x  y
            //  0, 0  1, 0  2, 0
            //  0, 1  1, 1  2, 1
            //  0, 2  1, 2  2, 2 


            //  diagonal = x:[1], y:[3]
            //  diagonal = x:[2], y:[2]
            //  diagonal = x:[3], y:[1]

            // Check for winner || Tie
            // if player "X" has 3 in a row: horizontally || vertically || diagonally
            // if player "O" has 3 in a row: horizontally || vertically || diagonally
            // else it is a tie
            // Prepare screenWin and message

            (function gameFinish() {
                movesLeft -= 1;
                console.log("number of moves left " + movesLeft);


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


