(function(){
    // --------------------------------------------------------------
    // HELPER FUNCTIONS
    // --------------------------------------------------------------
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
    // Creates event listeners
    function removeListener(element, eventType, func) {
        element.removeEventListener(eventType, func, false);
    }
    function addBoxListeners(boxes) {
        boxes.forEach( function(box, index, arr) {
            createListener(box, "click", playersTurn);
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
    function playersTurn(box) {
        console.log(box.target);
        const clickedBox = box.target;
        const boxPos = clickedBox.getAttribute("data-pos");
        var winner;

        removeListener(clickedBox, "click", playersTurn);
        removeListener(clickedBox, "mouseover", showToken);
        removeListener(clickedBox, "mouseout", hideToken);
        // if (player === 1) {                         // Player "O"
            

            activeBoard[boxPos] = playerOne;
            $(clickedBox).addClass("box-filled-1");

            checkForWinner(activeBoard, playerOne);
            $p1.removeClass("players-turn active");
            $p2.addClass("players-turn active");
            player += 1;
        // } else if (player === 2) {
            activateAiPlayer();                 // Player "X"
            var AiPos = findAvailableBox()[0]
            activeBoard[AiPos] = playerTwo;
            checkForWinner(activeBoard, playerTwo);

            // activeBoard[boxPos] = playerTwo;
            // $clickedBox.addClass("box-filled-2");

            player -= 1;
        // }
    }


    // --------------------------------------------------------------
    // COMPUTER PLAYER "AI" FUNCTION
    // --------------------------------------------------------------    
    function activateAiPlayer() {
        console.log(findAvailableBox()[0]);
        placeAiToken(); 
    }

    function placeAiToken(availableBox) {
        var boxIndex = findAvailableBox()[0];
        var box = boxes[boxIndex];
        setTimeout(function() {
            $(box).addClass("box-filled-2");
        }, 1000);
        removeListener(box, "click", playersTurn);
        removeListener(box, "mouseover", showToken);
        removeListener(box, "mouseout", hideToken);
    }

    function findAvailableBox() {
        debugger
        var availableBoxes = [];
        activeBoard.filter(function(value, index, arr) {
            if (value === "") availableBoxes.push(index);
        });
        return availableBoxes;
    }


    // --------------------------------------------------------------
    // CHECK FOR WINNER FUNCTION
    // --------------------------------------------------------------
    function checkForWinner(board, currentPlayer) {
        var filled = isBoardFilled(board);
        var winner = null;
        var playerPattern = [];

        board.forEach(function(boardToken, index, arr) {
            if (boardToken === currentPlayer) {
                playerPattern.push(index);
            } 
        })

        winPattern.forEach(function(thisPattern, index, array) {
            if(thisPattern.every(element => playerPattern.indexOf(element) > -1)) {
                console.log("You won player " + currentPlayer);
                winner = {player: currentPlayer};
            }
        })

        if (filled && winner === null) {
            winner = {player: "tie"};
            endOfGame(winner);
        } else if (winner) {
            endOfGame(winner);
        }
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

        setTimeout(function() {
            hide(gameBoard); 
            show(winScreen); 
        }, 1000);
        
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
            $box.removeClass("box-filled-1 box-filled-2");
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

    const $p1 = $("#player1");
    const $p2 = $("#player2");
    const playerOne = "one";
    const playerTwo = "two";
    const winPattern = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]
    ];

    // Visibility of each screen
    hide(gameBoard);
    show(startScreen);
    hide(winScreen);

    var player = 1;                                                     // Declares who goes first
    $p1.addClass("active");
    var activeBoard = [ 
        "", "", "",
        "", "", "",
        "", "", "" 
    ];

    function startGame() {
        show(gameBoard);
        hide(startScreen);
    }

    // createListener(window, "load", show(startScreen));
    createListener(startGameButton, "click", startGame);
    // createListener(gameBoard, "click", toggleTurn);                 // Add click event to game board (#board)
    createListener(newGameButton, "click", newGame);                // Add click event to new game button
    addBoxListeners(boxes);

}());