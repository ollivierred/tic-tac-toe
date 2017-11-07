(function(){

    function startGame(activePlayer) {
        // createListener(window, "load", show(startScreen));
        // createListener(startGameButton, "click", hide(startScreen));
        createListener(gameBoard, "click", toggleTurn);                 // Add click event to game board (#board)
        createListener(newGameButton, "click", newGame);                // Add click event to new game button
        addBoxListeners(boxes);
    }

    function show(element) {
        element.style.display = "inherit";
    }
    function hide(element) {
        element.style.display = "none";
    }

    // Creates event listeners
    function createListener(element, eventType, func) {
        element.addEventListener(eventType, func, false);
    }

    function addBoxListeners(boxes) {
        debugger
        // console.log(boxes);
        boxes.forEach( function(box, index, arr) {
            createListener(box, "mouseover", showToken);
            createListener(box, "mouseout", hideToken);
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
        // console.log(player);
        // console.log(hoverTarget);
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
        var screenContent = "";
        $(winScreen).removeClass("screen-win-one screen-win-two");
        $(winScreen).addClass("screen-win-" + winner.player);
        
        //"screen-win-one", "screen-win-two", "screen-win-tie"
        if (winner.player === "one" || winner.player === "two") {
            screenContent = "Winner";
        } else if (winner.player === "tie") {
            screenContent = "Tie";
        }
        $(".message").text(screenContent);

        show(winScreen);
        hide(gameBoard);
    }

    // --------------------------------------------------------------
    // NEW GAME FUNCTION
    // --------------------------------------------------------------
    function newGame() {
        player = 1;    // Reset the player back to "1"
        $p1.addClass("players-turn active");
        $p2.removeClass("players-turn active");
        addBoxListeners(boxes);

        var $box = $(".box");
        $box.each(function() {
            if ($box.hasClass("box-filled-1") || $box.hasClass("box-filled-2")) {
                $box.removeClass("box-filled-1 box-filled-2");
            }
        })

        activeBoard = [ "", "", "", "", "", "", "", "", "" ];
        $box.css("background-image", "");
        hide(winScreen);
        show(gameBoard);
    }


    // Screen elements
    const startScreen = document.querySelector("#start");
    const gameBoard = document.querySelector("#board");
    const boxes = document.querySelectorAll(".box");
    const winScreen = document.querySelector("#finish");

    //Buttons
    const newGameButton = document.querySelector("#finish a");
    const startGameButton = document.querySelector("#start a");

    // Visibility of each screen
    show(gameBoard);
    hide(startScreen);
    hide(winScreen);

    const $p1 = $("#player1");
    const $p2 = $("#player2");
    const playerOne = "one";
    const playerTwo = "two";
    const winPattern = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]
    ];

    var player = 1;                                                     // Declares who goes first
    $p1.addClass("active");
    var activeBoard = [ 
        "", "", "",
        "", "", "",
        "", "", "" 
    ];

    // Controls tic-tac-toe board events
    startGame(player);
}());