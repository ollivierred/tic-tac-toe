(function() {
    var myGame = {
        boardArr: [ "E", "E", "E", "E", "E", "E", "E", "E", "E" ],
        winPattern: [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [6, 4, 2] ],
        turnCount: 1,
        // Player "O"
        playerOne: "one",
        // Player "X"
        playerTwo: "two",

        init: function() {
            this.domElements();
            this.bindEvents();
            this.render();
        },
        domElements: function() {
            this.startScreen = document.querySelector("#start");
            this.winScreen = document.querySelector("#finish");
            this.gameBoard = document.querySelector("#board");
            this.boardSquares = document.querySelectorAll(".box");
            this.newGameBtn = document.querySelector("#finish a");
            this.startGameBtn = document.querySelector("#start a");
            this.$indicatorForP1 = $("#player1");
            this.$indicatorForP2 = $("#player2");
        },
        bindEvents: function() {
            this.createEvent("click", this.startGameBtn, this.loadGame);
            this.createEvent("click", this.newGameBtn, this.loadGame);
            // this.createBoardEvents(boardSquares);

        },
        render: function() {
            console.log(myGame.boardSquares);
            console.log(myGame.boardArr);


            this.showElement(this.startScreen);
            this.hideElement(this.winScreen);
            this.hideElement(this.gameBoard);

            myGame.boardSquares.forEach(function(square) {
                console.log(square);
                myGame.createEvent("click", square, myGame.playersMove);
                myGame.createEvent("mouseover", square, myGame.showHoverToken);
                myGame.createEvent("mouseout", square, myGame.hideHoverToken);
                $(square).removeClass("box-filled-1 box-filled-2");
                $(square).css("background-image", "");
            })
        },
        loadGame: function() {

            myGame.hideElement(myGame.startScreen);
            myGame.showElement(myGame.gameBoard);


        },
        createEvent: function(eventType, element, func) {
            element.addEventListener(eventType, func, false);
        },
        removeEvent: function(eventType, element, func) {
            element.removeEventListener(eventType, func, false);
        },
        showElement: function(element) {
            element.style.display = "inherit";
        },
        showHoverToken: function() {
    //     const hoverTarget = box.target;
    //     var symbol;
    //     // console.log(player);
    //     // console.log(hoverTarget);
    //     if (player === 1) symbol = "o";
    //     if (player === 2) symbol = "x";
    //     hoverTarget.style.backgroundImage = "url(img/" + symbol + ".svg)";
        },
        hideHoverToken: function() {
    //     const hoverTarget = box.target;
    //     hoverTarget.style.backgroundImage = "";            
        },
        hideElement: function(element) {
            element.style.display = "none";
        },

        playersMove: function(element, currentPlayer) {
            recordMove(element, currentPlayer);
            placeToken(myGame.boardArr, currentPlayer);
        },
        recordMove: function(element, currentPlayer) {
            const selectedSquare = element.target;
            const selectedSquareIndex = element.target.getAttribute("data-pos");
            console.log(selectedSquare);
            console.log(selectedSquareIndex);
            // Player "O" || Player "X"
            myGame.boardArr[selectedSquareIndex] = currentPlayer;
            console.log(myGame.boardArr);
        },
        placeToken: function(arr, currentPlayer) {
            arr.forEach(function(arrValue, index) {
                if (arrValue === currentPlayer) {
                    $(elementList[index]).addClass("box-filled-1");
                }
            })
        },
    };

    myGame.init();

})();


            

            // this.removeEvent("click", selectedSquare, this.placePlayersToken);
            // this.removeEvent("mouseover", selectedSquare, this.showHoverToken);
            // this.removeEvent("mouseout", selectedSquare, this.hideHoverToken);
    
    // var state = {};
    // var AI = {};
    // var AIState = {};
    // var game = {};
    // var config = {
    //         // --------------------------------------------------------------
    // // GLOBAL VARIABLES
    // // --------------------------------------------------------------
    // // Screen elements
    // const 
    // const 




    // // var originalBoard = [ "", "", "", "", "", "", "", "", "" ];
    // originalBoard = [ "one", 1, "two", "two", 4, "two", 6, "one", "one" ];
    // var player;
    // var winner;
    
    // };
    
    // // --------------------------------------------------------------
    // // REMOVE LISTENER FROM FILLED BOXES
    // // --------------------------------------------------------------
    // function hideToken(box) { 
    //     const hoverTarget = box.target;
    //     hoverTarget.style.backgroundImage = ""; 
    // }
    // // --------------------------------------------------------------
    // // ADD HOVER TARGET FUNCTION
    // // --------------------------------------------------------------
    // function showToken(box)  {
    //     const hoverTarget = box.target;
    //     var symbol;
    //     // console.log(player);
    //     // console.log(hoverTarget);
    //     if (player === 1) symbol = "o";
    //     if (player === 2) symbol = "x";
    //     hoverTarget.style.backgroundImage = "url(img/" + symbol + ".svg)";
    // }

    // // --------------------------------------------------------------
    // // HELPER FUNCTIONS
    // // --------------------------------------------------------------
    // var helper = {
    //     show: function(element) {
    //         element.style.display = "inherit";
    //     },

    //     hide: function(element) {
    //         element.style.display = "none";
    //     },

    //     // Creates event listeners
    //     createEvent: function(element, eventType, func) {
    //         element.addEventListener(eventType, func, false);
    //     },

    //     // Creates event listeners
    //     removeListener: function(element, eventType, func) {
    //         element.removeEventListener(eventType, func, false);
    //     },


    // } 

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

    // function startGame() {
    //     // originalBoard = [ "", "", "", "", "", "", "", "", "" ];
    //     originalBoard = [ "one", 1, "two", "two", 4, "two", 6, "one", "one" ];
    //     player = 1;       // Declares who goes first
    //     winner = null;
        
    //     $p1.addClass("players-turn active");
    //     $p2.removeClass("players-turn active");
        
    //     // boxEventListeners(boxes);
    //     boxes.forEach(function(box, index, arr) {
    //         $(box).removeClass("box-filled-1 box-filled-2");
    //         $(box).css("background-image", "");
    //         helper.createListener(box, "click", nextTurn);
    //         helper.createListener(box, "mouseover", showToken);
    //         helper.createListener(box, "mouseout", hideToken);
    //     })

    //     originalBoard.forEach(function(value) {
    //         if (value === "one") {
    //             helper.fillBox(originalBoard, "one", 1);
    //             player +=1;
    //         }
    //         if (value === "two") {
    //             helper.fillBox(originalBoard, "two", 2);
    //             player -=1;
    //         }
    //     })

    //     helper.hide(startScreen);
    //     helper.hide(winScreen);
    //     helper.show(gameBoard);
    // }




    // // Visibility of each screen
    // helper.hide(gameBoard);
    // helper.show(startScreen);
    // helper.hide(winScreen);


    // // createListener(window, "load", show(startScreen));
    // helper.createListener(startGameButton, "click", startGame);



    // function computerWillMove() {
    //     // var boxIndex = computer.findEmptySpots(originalBoard)[0]; 
    //     var boxIndex = minMax(originalBoard, playerTwo).index;
    //     return boxes[boxIndex];
    // }

    // // --------------------------------------------------------------
    // // PLAYER'S TURN FUNCTION
    // // --------------------------------------------------------------
    // function nextTurn(box) {             // 
    //     turn(box.target, playerOne);
    //     if (winner === null) {
    //         turn(computerWillMove(), playerTwo);                 // Player "X" / computer
    //     }
    // }
    //     function turn(box, currentPlayer) {
    //         const selectedBox = box;
    //         const selectedBoxIndex = box.getAttribute("data-pos");
    //         var winner = checkForWinner(originalBoard, currentPlayer);
            
    //         // Player "O" || Player "X"
    //         originalBoard[selectedBoxIndex] = currentPlayer;

    //         helper.removeListener(selectedBox, "click", nextTurn);
    //         helper.removeListener(selectedBox, "mouseover", showToken);
    //         helper.removeListener(selectedBox, "mouseout", hideToken);

    //         if (currentPlayer === "one") {
    //             $p1.removeClass("players-turn active");
    //             $p2.addClass("players-turn active");
    //             helper.fillBox(originalBoard, "one", 1);
    //             player +=1;
    //         }
    //         if (currentPlayer === "two") {
    //             $p2.removeClass("players-turn active");
    //             $p1.addClass("players-turn active");
    //             helper.fillBox(originalBoard, "two", 2);
    //             player -=1;
    //         }

    //         if(winner.gameOver) endOfGame(winner);
    //     }




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