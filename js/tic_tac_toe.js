(function() {
    // --------------------------------------------------------------
    // HELPER FUNCTIONS
    // --------------------------------------------------------------
    var helper = {
        show: function(element) {
            element.style.display = "inherit";
        },

        hide: function(element) {
            element.style.display = "none";
        },

        // Creates event listeners
        createListener: function(element, eventType, func) {
            element.addEventListener(eventType, func, false);
        },

        // Creates event listeners
        removeListener: function(element, eventType, func) {
            element.removeEventListener(eventType, func, false);
        },

        createMultipleListeners: function(elementList) {
            elementList.forEach(function(element, index, arr) {
                createListener(element, "click", playersTurn);
                createListener(element, "mouseover", showToken);
                createListener(element, "mouseout", hideToken);
            })
        },

        fillBox: function(board, token, player) {
            board.forEach(function(box, index) {
                if (box === token) {
                    $(boxes[index]).addClass("box-filled-" + player);
                }
            })
        }
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
        // console.log(player);
        // console.log(hoverTarget);
        if (player === 1) symbol = "o";
        if (player === 2) symbol = "x";
        hoverTarget.style.backgroundImage = "url(img/" + symbol + ".svg)";
    }

    // --------------------------------------------------------------
    // COMPUTER PLAYER "AI" FUNCTION
    // --------------------------------------------------------------
    function determineBestMove(availSpots) {
        // var boxIndex = minMax(originalBoard);
        var boxIndex = findAvailableSpots(originalBoard)[0];
        console.log(boxes[boxIndex]);
        
        return boxes[boxIndex];
    }
    function findAvailableSpots(board) {
        var availSpots = [];
        board.filter(function(value, index, arr) {
            if (value !== "one" && value !== "two") availSpots.push(index);
        });
        return availSpots;
    }
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

        helper.createListener(newGameButton, "click", startGame);                // Add click event to new game button
        setTimeout(function() {
            helper.hide(gameBoard); 
            helper.show(winScreen); 
        }, 250);
        
    }

    function startGame() {
        // originalBoard = [ "", "", "", "", "", "", "", "", "" ];
        originalBoard = [ "one", 1, "two", "two", 4, "two", 6, "one", "one" ];
        player = 1;       // Declares who goes first
        winner = null;
        
        $p1.addClass("players-turn active");
        $p2.removeClass("players-turn active");
        
        // boxEventListeners(boxes);
        boxes.forEach(function(box, index, arr) {
            $(box).removeClass("box-filled-1 box-filled-2");
            $(box).css("background-image", "");
            helper.createListener(box, "click", playersTurn);
            helper.createListener(box, "mouseover", showToken);
            helper.createListener(box, "mouseout", hideToken);
        })

        originalBoard.forEach(function(value) {
            if (value === "one") {
                helper.fillBox(originalBoard, "one", 1);
                player +=1;
            }
            if (value === "two") {
                helper.fillBox(originalBoard, "two", 2);
                player -=1;
            }
        })

        console.log(player);
        console.log(findAvailableSpots(originalBoard));

        helper.hide(startScreen);
        helper.hide(winScreen);
        helper.show(gameBoard);
    }


    // --------------------------------------------------------------
    // GLOBAL VARIABLES
    // --------------------------------------------------------------
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

    // Player "O"
    const playerOne = "one";

    // Player "X"
    const playerTwo = "two";
    const winPattern = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [6, 4, 2]
    ];
    var originalBoard = [ "", "", "", "", "", "", "", "", "" ];
    var player;
    var winner;

    // Visibility of each screen
    helper.hide(gameBoard);
    helper.show(startScreen);
    helper.hide(winScreen);


    // createListener(window, "load", show(startScreen));
    helper.createListener(startGameButton, "click", startGame);





    // --------------------------------------------------------------
    // PLAYER'S TURN FUNCTION
    // --------------------------------------------------------------
    function playersTurn(box) {
        console.log(box.target);
        turn(box.target, playerOne);
        if (winner === null) {
            turn(determineBestMove(), playerTwo);                 // Player "X" / computer
        }
    }
        function turn(box, currentPlayer) {
            const selectedBox = box;
            const selectedBoxIndex = box.getAttribute("data-pos");
            
            // Player "O" || Player "X"
            originalBoard[selectedBoxIndex] = currentPlayer;

            helper.removeListener(selectedBox, "click", playersTurn);
            helper.removeListener(selectedBox, "mouseover", showToken);
            helper.removeListener(selectedBox, "mouseout", hideToken);
            
            checkForWinner(originalBoard, currentPlayer);

            if (currentPlayer === "one") {
                $p1.removeClass("players-turn active");
                $p2.addClass("players-turn active");
                helper.fillBox(originalBoard, "one", 1);
                player +=1;
            }
            if (currentPlayer === "two") {
                $p2.removeClass("players-turn active");
                $p1.addClass("players-turn active");
                helper.fillBox(originalBoard, "two", 2);
                player -=1;
            }
        }

    // --------------------------------------------------------------
    // CHECK FOR WINNER FUNCTION
    // --------------------------------------------------------------
    function checkForWinner(board, currentPlayer) {
        var filled = isBoardFilled(board);
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

    function checkForWin(board, currentPlayer) {
        var filled = findAvailableSpots(board).length === 0;
        var playerPattern = [];
        var winner = false;

        board.forEach(function(boardToken, index, arr) {
            if (boardToken === currentPlayer) {
                playerPattern.push(index);
            } 
        })
            winPattern.forEach(function(thisPattern, index, array) {
                if(thisPattern.every(element => playerPattern.indexOf(element) > -1)) {
                    console.log("You won player " + currentPlayer);
                    winner = true;
                }
            })
        return winner;
    }


    function minMax(newBoard, player) {
        var availSpots = findAvailableSpots(newBoard);
        var moves = [];

        if (checkForWin(newBoard, playerOne)) {
            return {score: -10};
        } else if(checkForWin(newBoard, player)) {
            return {score: 10};
        } else if(availSpots.length === 0) {
            return {score: 0};
        }
        
        availSpots.forEach(function(value) {
            var move = {};
            move.index = newBoard[value];
            newBoard[value] = player;

            if (player === playerOne) {
                var result = minMax(newBoard, playerOne);
                move.score = result.score;
            } else {
                var result = minMax(newBoard, playerTwo);
                move.score = result.score;
            }
    
            newBoard[value] = move.index;
            moves.push(move);
        })

        var bestMove;
        if (player === playerTwo) {
            var bestScore = -10000;
            moves.forEach(function(value, index) {
                if(moves[value].score > bestScore) {
                    bestScore = moves[value].score;
                    bestMove = value;
                }
            })
        } else {
            var bestScore = 10000;
            moves.forEach(function(value, index) {
                if(moves[value].score > bestScore) {
                    bestScore = moves[value].score;
                    bestMove = value;
                }
            })
        }

        console.log("Empty spaces " + availSpots);
        console.log(move.index);
        console.log(newBoard[availSpots[value]]);
        return moves[bestMove];
    }

}());