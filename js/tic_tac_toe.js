var ticTacToe = (function() {

    var playersToken = "one";       // Player "O" = "one" || Player "X" = "two"
    var turnCount = 1;
    var gameState = {
        gameOver: false, gameWinner: "" };
    var boardArr = [ 
        "E", "E", "E", "E", 
        "E", "E", "E", "E", "E" ];
    const winPattern = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2] ];

    var myGame = {
        init: function() {
            this.domElements();
            this.bindEvents();
            this.render();
        },
        domElements: function() {
            this.startScreen = document.querySelector("#start");
            this.winScreen = document.querySelector("#finish");
            this.boardContainer = document.querySelector("#board");
            this.board = document.querySelector("#board .boxes");
            this.boardSquares = document.querySelectorAll("#board .box");
            this.newGameBtn = document.querySelector("#finish a");
            this.startGameBtn = document.querySelector("#start a");
            this.$indicatorForP1 = $("#player1");
            this.$indicatorForP2 = $("#player2");
        },
        bindEvents: function() {
            this.startGameBtn.addEventListener("click", this.loadBoard.bind(myGame), false);
            this.newGameBtn.addEventListener("click", this.loadBoard.bind(myGame), false);
            this.board.addEventListener("click", this.playersMove.bind(myGame), false);
            this.board.addEventListener("mouseover", this.hoverStateOn.bind(myGame), false);
            this.board.addEventListener("mouseout", this.hoverStateOff.bind(myGame), false);
        },
        render: function() {
            this.showElement(this.startScreen);
            this.hideElement(this.winScreen);
            this.hideElement(this.boardContainer);
        },
        showElement: function(element) {
            element.style.display = "inherit";
        },
        hideElement: function(element) {
            element.style.display = "none";
        },

        loadBoard: function() {
            this.boardSquares.forEach(function(square) {
                // console.log(square);
                $(square).removeClass("box-filled-1 box-filled-2");
                $(square).css("background-image", "");
            })

            this.setActiveState();
            this.hideElement(this.startScreen);
            this.hideElement(this.winScreen);
            this.showElement(this.boardContainer);
        },

        playersMove: function(element) {
            var square = element.target;
            if ($(square).hasClass("box-filled-1") ||
                $(square).hasClass("box-filled-2")) {
                return;
            } else {
                this.placeToken(element.target, this.boardSquares, playersToken, boardArr);
                this.toggleActiveState();
                this.setActiveState();
            }
        },
        placeToken: function(element, elementList, player, arr) {
            const selectedSquare = element;
            const selectedSquareIndex = element.getAttribute("data-pos");
            // Adds move to array
            arr[selectedSquareIndex] = player;
            // Places token onto board
            arr.forEach(function(arrValue, index) {
                if (arrValue === player) {
                    if (player === "one") $(elementList[index]).addClass("box-filled-1");
                    if (player === "two") $(elementList[index]).addClass("box-filled-2");
                }
            })
        },
        setActiveState: function() {
            if (turnCount === 1) {
                this.$indicatorForP1.addClass("players-turn active");
                this.$indicatorForP2.removeClass("players-turn active");
                playersToken = "one";
            }
            if (turnCount === 2) {
                this.$indicatorForP2.addClass("players-turn active");
                this.$indicatorForP1.removeClass("players-turn active");
                playersToken = "two";
            }
            
        },
        toggleActiveState: function() {
            if (turnCount === 1) {
                turnCount += 1;
                playersToken = "two";
            } else if (turnCount === 2) {
                turnCount -= 1;
                playersToken = "one";
            }
        },

        hoverStateOn: function(element) {
            var square = element.target;
            if ($(square).hasClass("box-filled-1") ||
                $(square).hasClass("box-filled-2")) {
                return;
            } else {
                this.enableHover(square, playersToken);
            }
        },
        hoverStateOff: function(element) {
            var square = element.target;
            this.disableHover(square);
        },
        enableHover: function(element, player) {
            var symbol = "o";
            if (player === "one") symbol = "o";
            if (player === "two") symbol = "x";
            element.style.backgroundImage = "url(img/" + symbol + ".svg)";
        },
        disableHover: function(element) {
            element.style.backgroundImage = "";            
        },

    };

    return myGame;

})();

    ticTacToe.init();



    // var originalBoard = [ "", "", "", "", "", "", "", "", "" ];
    // originalBoard = [ "one", 1, "two", "two", 4, "two", 6, "one", "one" ];

    // // --------------------------------------------------------------
    // // COMPUTER PLAYER "AI" RELATED FUNCTIONS
    // // --------------------------------------------------------------
    // var computer = {
    //     findEmptySpots: function(board) {
    //         var availSpots = [];
    //         board.filter(function(value, index, arr) {
    //             if (typeof(value) === "number") {
    //                 availSpots.push(index);
    //             }
    //         });
    //         return availSpots;
    //     },

    //     isBoardFilled: function(board) {
    //         var availSpots = computer.findEmptySpots(board)
    //         var filled = false;
    //         if (availSpots.length === 0) {
    //             filled = true;
    //         }
    //         return filled;
    //     }

    // }
    

    // // --------------------------------------------------------------
    // // END OF GAME FUNCTION
    // // --------------------------------------------------------------
    // function endOfGame(winner) {

    //     var screenContent = "";
    //     $(winScreen).removeClass("screen-win-one screen-win-two");
    //     $(winScreen).addClass("screen-win-" + winner.playerName);
        
    //     //"screen-win-one", "screen-win-two", "screen-win-tie"
    //     if (winner.playerName === "one" || winner.playerName === "two") {
    //         screenContent = "Winner";
    //     } else if (winner.playerName === "tie") {
    //         screenContent = "Tie";
    //     }
    //     $(".message").text(screenContent);

    //     helper.createListener(newGameButton, "click", startGame);                // Add click event to new game button
    //     setTimeout(function() {
    //         helper.hide(gameBoard); 
    //         helper.show(winScreen); 
    //     }, 250);
        
    // }

    // function computerWillMove() {
    //     // var boxIndex = computer.findEmptySpots(originalBoard)[0]; 
    //     var boxIndex = minMax(originalBoard, playerTwo).index;
    //     return boxes[boxIndex];
    // }


    // // --------------------------------------------------------------
    // // CHECK FOR WINNER FUNCTION
    // // --------------------------------------------------------------
    // function checkForWinner(board, currentPlayer) {
    //     var playerPattern = [];
    //     var winner = {
    //         gameOver: false,
    //         playerName: ""
    //     };

    //     board.forEach(function(boardToken, index, arr) {
    //         if (boardToken === currentPlayer) {
    //             playerPattern.push(index);
    //         } 
    //     })
    //         winPattern.forEach(function(thisPattern, index, array) {
    //             if(thisPattern.every(element => playerPattern.indexOf(element) > -1)) {
    //                 console.log("You won player " + currentPlayer);
    //                 winner.gameOver = true;
    //                 winner.playerName = currentPlayer;
    //             }
    //         })
    //     return winner;
    // }






    // function minMax(newBoard, player) {
    //     debugger
    //     var filled = computer.isBoardFilled(newBoard)
    //     var gameOver = checkForWinner(newBoard, player).gameOver;
    //     var winner = checkForWinner(newBoard, player).playerName;

    //     if(filled) return {score: 0};
    //     if(gameOver && winner === "one") return {score: -10};
    //     if(gameOver && winner === "two") return {score: 10};

    //     var availSpots = computer.findEmptySpots(newBoard);
    //     var moves = [];

    //     availSpots.forEach(function(value) {
    //         var move = {};
    //         move.index = newBoard[value];
    //         newBoard[value] = player;

    //         if (player === playerOne) {
    //             var result = minMax(newBoard, playerOne);
    //             move.score = result.score;
    //         } else {
    //             var result = minMax(newBoard, playerTwo);
    //             move.score = result.score;
    //         }
    
    //         newBoard[value] = move.index;
    //         moves.push(move);
    //     })

    //     var bestMove;
    //     if (player === playerTwo) {
    //         var bestScore = -10000;
    //         moves.forEach(function(value, index) {
    //             if(moves[index].score > bestScore) {
    //                 bestScore = moves[index].score;
    //                 bestMove = index;
    //             }
    //         })
    //     } else {
    //         var bestScore = 10000;
    //         moves.forEach(function(value, index) {
    //             if(moves[index].score > bestScore) {
    //                 bestScore = moves[index].score;
    //                 bestMove = index;
    //             }
    //         })
    //     }

    //     return moves[bestMove];
    // }