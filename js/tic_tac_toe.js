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


    const p1 = document.querySelector("#player1");
    const p2 = document.querySelector("#player2");
    const playerOne = "one";
    const playerTwo = "two";
    const winPattern = [     
        [0, 1, 2], [0, 3, 6], 
        [3, 4, 5], [1, 4, 7],
        [6, 7, 8], [2, 5, 8],
        [0, 4, 8], [6, 4, 2]
    ];

    var player = 1;                     // Declares who goes first
    p1.className = "players active";

    var activeBoard = [ 
        null,null,null,
        null,null,null,
        null,null,null 
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
        p1.className = "players active";
        p2.className = "players";

        activeBoard = [ null,null,null,null,null,null,null,null,null ];

    }

    //Controls tic-tac-toe board events
    const gameBoard = document.querySelector(".boxes");
    gameBoard.addEventListener("click", boxClick, false);
    // board.addEventListener("mouseover", boxClick, false);

    //Controls events when new game is clicked
    newGameButton.addEventListener("click", newGame, false);
    

    // --------------------------------------------------------------
    // BOXCLICK FUNCTION
    // --------------------------------------------------------------
    function boxClick(box){
        const clickedBox = box.target;
        playerTurn(clickedBox);
    }
    
    // --------------------------------------------------------------
    // TURN FUNCTION
    // --------------------------------------------------------------
    function playerTurn(clickedBox) {
        const boxPos = clickedBox.getAttribute("data-pos");
        const $clickedBox = $(clickedBox);

        if ($clickedBox.hasClass("box-filled-1") || $clickedBox.hasClass("box-filled-2")) {
            return;
        } else {
            if (player === 1) {                         // Player "O"
                activeBoard[boxPos] = playerOne;
                $clickedBox.addClass("box-filled-1");
                p1.className = "players";
                p2.className = "players active";
                player += 1;
                var winner = checkForWinner(activeBoard, playerOne);
            } else if (player === 2) {                  // Player "X"
                activeBoard[boxPos] = playerTwo;
                $clickedBox.addClass("box-filled-2");
                p1.className = "players active";
                p2.className = "players";
                player -= 1;
                var winner = checkForWinner(activeBoard, playerTwo);
            }
        }
        if (winner) {
            endOfGame(winner);
        }
    }

    // --------------------------------------------------------------
    // CHECK FOR WINNER FUNCTION
    // --------------------------------------------------------------
    function checkForWinner(board, player) {
        var gamePattern = [];
        board.forEach(function(el, index, arr) {
            if (el === player) {
                gamePattern.push(index);
            } 
        })
        console.log(gamePattern);
        // debugger
        var winner = null;
        winPattern.forEach(function(value, index, array) {
            // debugger
            if(value.every(element => gamePattern.indexOf(element) > -1)) {
                console.log("You won player " + player);
                winner = {player: player};
            }
        })
        return winner;
    }

    // --------------------------------------------------------------
    // END OF GAME FUNCTION
    // --------------------------------------------------------------
    function endOfGame(winner) {
        $(screenWin).addClass("screen-win-" + winner.player);   //"screen-win-one", "screen-win-two", "screen-win-tie"
        var message = document.querySelector(".message");
        message.textContent = "Winner";

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

    // Controls event on window load
    // window.addEventListener("load", function() {
    //     screenStart.style.display = "inherit";
    // }, false);

    // startGameButton.addEventListener("click", function() {
    //      screenStart.style.display = "none";
    //      gameBoard.style.display = "inherit";
    // }, false);

}());