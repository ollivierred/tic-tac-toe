(function(){
    //Screen elements
    const turnDisplay = document.querySelector("#board");
    const screenStart = document.querySelector("#start");
    const screenWin = document.querySelector("#finish");

    //Visibility of each screen
    // gameBoard.style.display = "none";
    screenStart.style.display = "none";
    screenWin.style.display = "none";

    //Buttons
    const newGameButton = document.querySelector("#finish a");
    const startGameButton = document.querySelector("#start a");


    const $p1 = $("#player1");
    const $p2 = $("#player2");
    const playerOne = "one";
    const playerTwo = "two";
    const winPattern = [     
        [0, 1, 2], [0, 3, 6], 
        [3, 4, 5], [1, 4, 7],
        [6, 7, 8], [2, 5, 8],
        [0, 4, 8], [6, 4, 2]
    ];

    var player = 1;                     // Declares who goes first
    $p1.addClass("active");

    var activeBoard = [ 
        "","","",
        "","","",
        "","","" 
    ];


    function resetBoard() {
        var $box = $(".box");
        $box.each( function () {
            if ($box.hasClass("box-filled-1") || $box.hasClass("box-filled-2")) {
                $box.removeClass("box-filled-1");
                $box.removeClass("box-filled-2");
            }
        })
        player = 1;
        $p1.addClass("active");
        $p2.removeClass("active");
        activeBoard = [ "","","","","","","","","" ];
    }

        // Controls event on window load
    // window.addEventListener("load", function() {
    //     screenStart.style.display = "inherit";
    // }, false);

    // startGameButton.addEventListener("click", function() {
    //      screenStart.style.display = "none";
    //      gameBoard.style.display = "inherit";
    // }, false);

    //Controls tic-tac-toe board events
    const gameBoard = document.querySelector(".boxes");
    gameBoard.addEventListener("click", boxClick, false);
    // board.addEventListener("mouseover", boxClick, false);

    //Controls events when new game is clicked
    newGameButton.addEventListener("click", newGame, false);
    

    // --------------------------------------------------------------
    // BOXCLICK FUNCTION
    // --------------------------------------------------------------
    function boxClick(box)  {
        const clickedBox = box.target;
        playerTurn(clickedBox);
    }
    
    // --------------------------------------------------------------
    // TURN FUNCTION
    // --------------------------------------------------------------
    function playerTurn(clickedBox) {
        const boxPos = clickedBox.getAttribute("data-pos");
        const $clickedBox = $(clickedBox);
        var winner;

        if ($clickedBox.hasClass("box-filled-1") || $clickedBox.hasClass("box-filled-2")) {
            return;
        } else {
            if (player === 1) {                         // Player "O"
                activeBoard[boxPos] = playerOne;
                $clickedBox.addClass("box-filled-1");
                winner = checkForWinner(activeBoard, playerOne);
                $p1.removeClass("active");
                $p2.addClass("active");
                player += 1;
            } else if (player === 2) {                  // Player "X"
                activeBoard[boxPos] = playerTwo;
                $clickedBox.addClass("box-filled-2");
                winner = checkForWinner(activeBoard, playerTwo);
                $p1.addClass("active");
                $p2.removeClass("active");
                player -= 1;
            }
        }
        if (winner) {
            endOfGame(winner);
        }
    }

    // --------------------------------------------------------------
    // CHECK FOR WINNER FUNCTION
    // --------------------------------------------------------------
    function checkForWinner(board, currentPlayer) {
        var filled = isBoardFilled(board);
        var winner = null;

        if (filled) {
            winner = {player: "tie"}
        } else {
            var playerPattern = [];
            board.forEach(function(boardToken, index, arr) {
                if (boardToken === currentPlayer) {
                    playerPattern.push(index);
                } 
            })
            console.log(playerPattern);

            // debugger
            winPattern.forEach(function(thisPattern, index, array) {
                // debugger
                if(thisPattern.every(element => playerPattern.indexOf(element) > -1)) {
                    console.log("You won player " + currentPlayer);
                    winner = {player: currentPlayer};
                }
            })
        }
        return winner;
    }

    // --------------------------------------------------------------
    // IS BOARD FILLED FUNCTION
    // --------------------------------------------------------------
    function isBoardFilled(activeBoard) {
        // debugger
        var filled = false;
        if (activeBoard.every(slot => slot !== "")) {
            filled = true;
        }
        console.log(filled);
        return filled;
    }

    // --------------------------------------------------------------
    // END OF GAME FUNCTION
    // --------------------------------------------------------------
    function endOfGame(winner) {
        var message = document.querySelector(".message");
        var screenContent;

        $(screenWin).removeClass("screen-win-one screen-win-two");
        $(screenWin).addClass("screen-win-" + winner.player);   //"screen-win-one", "screen-win-two", "screen-win-tie"
        
        if (winner.player === "one" || winner.player === "two") {
            screenContent = "Winner";
        } else if (winner.player === "tie") {
            screenContent = "Tie";
        }
        message.textContent = screenContent;
        gameBoard.style.display = "none";
        screenWin.style.display = "inherit";
    }

    // --------------------------------------------------------------
    // NEW GAME FUNCTION
    // --------------------------------------------------------------
    function newGame() {
        resetBoard();
        screenWin.style.display = "none";
        gameBoard.style.display = "inherit";
    }

}());