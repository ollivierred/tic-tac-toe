(function(){

    // Controls event on window load
    // window.addEventListener("load", function() {
    //     screenStart.style.display = "inherit";
    // }, false);

    // startGameButton.addEventListener("click", function() {
    //      screenStart.style.display = "none";
    //      gameBoard.style.display = "inherit";
    // }, false);

    // Screen elements
    const gameBoard = document.querySelector("#board");
    const screenStart = document.querySelector("#start");
    const screenWin = document.querySelector("#finish");

    // Visibility of each screen
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
        "", "", "",
        "", "", "",
        "", "", "" 
    ];

    // Controls tic-tac-toe board events
    startGame(player);
    function startGame(activePlayer) {
        createListener(gameBoard, "click", toggleTurn);
        //Controls events when new game is clicked
        newGameButton.addEventListener("click", newGame, false);
        addBoxListeners();
    }

    function createListener(element, eventType, func) {
        element.addEventListener(eventType, func, false);
    }
    function addBoxListeners() {
        const boxes = document.querySelectorAll(".box");
        boxes.forEach( function(box, index, arr) {
            box.addEventListener("mouseover", showToken, false);
            box.addEventListener("mouseout", hideToken, false);
        })
    }
    // --------------------------------------------------------------
    // REMOVE LISTENER FROM FILLED BOXES
    // --------------------------------------------------------------
    function hideToken(box) { 
        const hoverTarget = box.target;
        hoverTarget.style.backgroundImage = ""; 
    }
    // --------------------------------------------------------------
    // ADD HOVER TARGET FUNCTION
    // --------------------------------------------------------------
    function showToken(box)  {
        const hoverTarget = box.target;
        var symbol;
        if (player === 1) symbol = "o";
        if (player === 2) symbol = "x";
        console.log(player);
        console.log(hoverTarget);
        hoverTarget.style.backgroundImage = "url(img/" + symbol + ".svg)";
    }

    
    // --------------------------------------------------------------
    // TURN FUNCTION
    // --------------------------------------------------------------
    function toggleTurn(box) {
        const clickedBox = box.target;
        const boxPos = clickedBox.getAttribute("data-pos");
        const $clickedBox = $(clickedBox);
        var winner;

        clickedBox.removeEventListener("mouseover", showToken, false);
        clickedBox.removeEventListener("mouseout", hideToken, false);

        if ($clickedBox.hasClass("box-filled-1") || $clickedBox.hasClass("box-filled-2")) {
            return;
        } else {
            if (player === 1) {                         // Player "O"
                activeBoard[boxPos] = playerOne;
                $clickedBox.addClass("box-filled-1");
                winner = checkForWinner(activeBoard, playerOne);
                $p1.removeClass("players-turn active");
                $p2.addClass("players-turn active");
                player += 1;
            } else if (player === 2) {                  // Player "X"
                activeBoard[boxPos] = playerTwo;
                $clickedBox.addClass("box-filled-2");
                winner = checkForWinner(activeBoard, playerTwo);
                $p1.addClass("players-turn active");
                $p2.removeClass("players-turn active");
                player -= 1;
            }
        }
        if (winner) endOfGame(winner);
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
            // console.log(playerPattern);

            winPattern.forEach(function(thisPattern, index, array) {
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
        var filled = false;
        if (activeBoard.every(slot => slot !== "")) {
            filled = true;
        }
        return filled;
    }

    // --------------------------------------------------------------
    // END OF GAME FUNCTION
    // --------------------------------------------------------------
    function endOfGame(winner) {
        var screenContent;

        $(screenWin).removeClass("screen-win-one screen-win-two");
        $(screenWin).addClass("screen-win-" + winner.player);
        
        //"screen-win-one", "screen-win-two", "screen-win-tie"
        if (winner.player === "one" || winner.player === "two") {
            screenContent = "Winner";
        } else if (winner.player === "tie") {
            screenContent = "Tie";
        }
        $(".message").text(screenContent);

        gameBoard.style.display = "none";
        screenWin.style.display = "inherit";
    }

    // --------------------------------------------------------------
    // RESET BOARD FUNCTION
    // --------------------------------------------------------------
    function resetBoard() {
        var $box = $(".box");
        // Reset the player back to "1"
        player = 1;
        $p1.addClass("players-turn active");
        $p2.removeClass("players-turn active");
        activeBoard = [ "", "", "", "", "", "", "", "", "" ];

        $box.each(function() {
            if ($box.hasClass("box-filled-1") || $box.hasClass("box-filled-2")) {
                $box.removeClass("box-filled-1");
                $box.removeClass("box-filled-2");
            }
        })
        $(".box").css("background-image", "");
        addBoxListeners();
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