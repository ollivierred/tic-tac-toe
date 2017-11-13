var ticTacToe = (function() {

    var humanPlayer = "one";       // Player "O" = "one"
    var AiPlayer = "two";          // Player "X" = "two"
    var currentPlayer = undefined;
    var turnCount = undefined;
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
            this.startGameBtn.addEventListener("click", this.loadGame.bind(myGame), false);
            this.newGameBtn.addEventListener("click", this.loadGame.bind(myGame), false);
            this.board.addEventListener("click", this.moveManager.bind(myGame), false);
            this.board.addEventListener("mouseover", this.hoverStateOn.bind(myGame), false);
            this.board.addEventListener("mouseout", this.hoverStateOff.bind(myGame), false);
        },
        render: function() {
            // $(this.startScreen).slideDown();
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
        
        
        loadGame: function() {
            boardArr = [ 
                "E", "E", "E", 
                "E", "E", "E", 
                "E", "E", "E" ];
            // boardArr = [ 
            //     "one", "E", "two", 
            //     "two", "E", "two", 
            //     "E", "one", "one" ];
            gameState = { win:false,   tie:false,   winner:undefined };
            currentPlayer = humanPlayer;
            turnCount = 1;

            this.resetBoard(this.boardSquares);
            // this.addToken(boardArr, humanPlayer, this.boardSquares);
            // this.addToken(boardArr, AiPlayer, this.boardSquares);
            this.setActiveState(currentPlayer);
            this.hideElement(this.startScreen);
            this.hideElement(this.winScreen);
            this.showElement(this.boardContainer);
        },

        moveManager: function(element) {                
            var square = element.target;
            if (!this.isAlreadyFilled(square)) {
                this.updateBoard(element.target, this.boardSquares, humanPlayer, boardArr);
                this.switchTurnState();
                this.setActiveState();

                if (!gameState.win && !gameState.tie) {
                    setTimeout(() => {
                        this.updateBoard(this.AiPlayersMove(), this.boardSquares, AiPlayer, boardArr);
                        this.switchTurnState();
                        this.setActiveState(); 
                    }, 250);
                } 
            }
        },

        isAlreadyFilled: function(square) {
            if ($(square).hasClass("box-filled-1") ||
                $(square).hasClass("box-filled-2")) {
                return true;
            }
        },

        AiPlayersMove: function() {
            var index = this.emptySpots(boardArr)[0]; 
            this.generateRandMove(0, 8);
            // var index = this.minMax(boardArr, AiPlayer);
            var square = this.boardSquares[index];
            return square;
        },

        updateBoard: function(element, elementList, player, arr) {
            const selectedSquare = element;
            const selectedSquareIndex = element.getAttribute("data-pos");
            // Adds move to array
            arr[selectedSquareIndex] = player;

            // Places token onto board
            this.addToken(arr, player, this.boardSquares);
            this.checkGameState();
            if (gameState.win || gameState.tie) {
                this.renderWinScreen();
                return;
            }
        },

        resetBoard: function(elementList) {
            elementList.forEach(function(element) {
                $(element).removeClass("box-filled-1 box-filled-2");
                $(element).css("background-image", "");
            })
        },

        addToken: function(arr, player, elementList) {
            arr.forEach(function(arrValue, index) {
                if (arrValue === player) {
                    if (player === "one") $(elementList[index]).addClass("box-filled-1");
                    if (player === "two") $(elementList[index]).addClass("box-filled-2");
                }
            })
        },

        setActiveState: function(currentPlayer) {
            if (currentPlayer === humanPlayer) {
                this.$indicatorForP1.addClass("active");
                this.$indicatorForP2.removeClass("active");
            }
            if (currentPlayer === AiPlayer) {
                this.$indicatorForP2.addClass("active");
                this.$indicatorForP1.removeClass("active");
            }
            
        },

        switchTurnState: function() {
            if (turnCount === 1) {
                turnCount = 2;
                currentPlayer = AiPlayer;
            } else {
                turnCount = 1;
                currentPlayer = humanPlayer;
            }
        },

        hoverStateOn: function(element) {
            var square = element.target;
            if (!this.isAlreadyFilled(square)) {
                this.enableHover(square, humanPlayer);
            }
        },

        hoverStateOff: function(element) {
            var square = element.target;
            this.disableHover(square);
        },

        enableHover: function(element, player) {
            var symbol = "o";
            player === "one" ? symbol = "o" : symbol = "x";
            element.style.backgroundImage = "url(img/" + symbol + ".svg)";
        },

        disableHover: function(element) {
            element.style.backgroundImage = "";            
        },

        checkGameState: function() {
            this.gameStateWin(boardArr, currentPlayer);
            this.gameStateTie(boardArr);
        },

        gameStateWin: function(arr, player) {
            var playPattern = [];
            arr.forEach(function(token, index) {
                if (token === player) playPattern.push(index); 
            })
            winPattern.forEach(function(pattern, patternIndex) {
                if(pattern.every(element => playPattern.indexOf(element) > -1)) {
                    console.log("You won player " + player);
                    gameState.win = true;
                    gameState.winner = player;
                }
            })

        },

        gameStateTie: function(arr) {
            var availSpots = this.emptySpots(boardArr);
            if(availSpots.length === 0 && gameState.win === false) { 
                gameState.tie = true; 
                gameState.winner = "tie";
            }
        },

        emptySpots: function(arr) {
            var availSpots = [];
            arr.forEach(function(value, index) {
                if(value === "E") availSpots.push(index);
            })
            
            return availSpots;
        },

        setWinScreen: function(obj) {
            $(this.winScreen).removeClass("screen-win-one screen-win-two");
            var screenMessage = undefined;
            //"screen-win-one", "screen-win-two", "screen-win-tie"
            if (obj.win) {
                screenMessage = "Winner";
            } else if (obj.tie) {
                screenMessage = "Tie";
            }
            $(".message").text(screenMessage);
            $(this.winScreen).addClass("screen-win-" + obj.winner);
        },

        renderWinScreen: function() {
            this.setWinScreen(gameState);
            this.hideElement(this.boardContainer);
            this.showElement(this.winScreen);
        },

        generateRandMove: function(min, max) {
            console.log( Math.floor(Math.random()*(max-min+1)+min ) );
        }
    };
    return myGame;
})();

    ticTacToe.init();