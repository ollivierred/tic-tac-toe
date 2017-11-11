var ticTacToe = (function() {

    var playersToken = "one";       // Player "O" = "one" || Player "X" = "two"
    var turnCount = 1;
    var gameState = {};
    var boardArr = [];
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
            boardArr = [ 
                "E", "E", "E", "E", 
                "E", "E", "E", "E", "E" ];
            gameState = {
                win: false, tie: false, winner: undefined };

            this.boardSquares.forEach(function(square) {
                $(square).removeClass("box-filled-1 box-filled-2");
                $(square).css("background-image", "");
            })
            
            console.log(boardArr);
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
                this.checkGameState();
                if (gameState.win) {
                    this.renderWinScreen();
                    return;
                }
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


        checkGameState: function() {
            this.gameStateWin(arr, player);
            this.gameStateTie(arr);

        },
        gameStateWin: function(arr, player) {
            var playPattern = [];
            arr.forEach(function(token, index) {
                if (token === player) playPattern.push(index); 
            })
            console.log(arr);
            console.log(playPattern);
            winPattern.forEach(function(pattern, patternIndex) {
                if(pattern.every(element => playPattern.indexOf(element) > -1)) {
                    console.log("You won player " + player);
                    gameState.win = true;
                    gameState.winner = player;
                }
            })
            console.log(gameState);
        },
        gameStateTie: function(arr) {
            var availSpots = [];
    //         arr.forEach(function(value, index) {
    //             if (value === "E") {
    //                 availSpots.push(index);
    //             }
    //         })

    //         if (availSpots.length === 0) {
                gameState.win = false; 
                gameState.tie = false; 
                gameState.winner = undefined;
    //         } else {
        return availSpots;
    }
        },


        setWinScreen: function(obj) {
            $(this.winScreen).removeClass("screen-win-one screen-win-two");
            var screenMessage = "Winner";

            //"screen-win-one", "screen-win-two", "screen-win-tie"
            // else if (winner.playerName === "tie") {
            //     screenMessage = "Tie";
            // }
            $(this.winScreen).addClass("screen-win-" + obj.winner);
            $(".message").text(screenMessage);
        },
        renderWinScreen: function() {
            this.setWinScreen(gameState);
            this.hideElement(this.boardContainer);
            this.showElement(this.winScreen);
        }

    };

    return myGame;

})();

    ticTacToe.init();



    //     findEmptySpots: function(board) {
    //         var availSpots = [];
    //         arr.filter(function(value, index) {
    //             if (typeof(value) === "number") {
    //                 availSpots.push(index);
    //             }
    //         });
    //         return availSpots;
    //     },
    // // --------------------------------------------------------------
    // // COMPUTER PLAYER "AI" RELATED FUNCTIONS
    // // --------------------------------------------------------------



    // function computerWillMove() {
    //     // var boxIndex = computer.findEmptySpots(originalBoard)[0]; 
    //     var boxIndex = minMax(originalBoard, playerTwo).index;
    //     return boxes[boxIndex];
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