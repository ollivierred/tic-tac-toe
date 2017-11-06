

    //Screen states
    const gameBoard = document.querySelector("#board");
    const screenStart = document.querySelector("#start");
    const screenWin = document.querySelector("#finish");

    //Visibility of each screen
    // gameBoard.style.display = "none";
    screenStart.style.display = "none";
    screenWin.style.display = "none";

    // --------------------------------------------------------------


    //Buttons
    const newGameButton = document.querySelector("#finish a");
    const startGameButton = document.querySelector("#start a");


    const p1 = document.querySelector("#player1");
    const p2 = document.querySelector("#player2");
    var player = 1;                                 // Declares who goes first
        p1.className = "players active";
    const playerOne = "O";
    const playerTwo = "X";
    const winPattern = [     
        [0, 1, 2], [0, 3, 6], 
        [3, 4, 5], [1, 4, 7],
        [6, 7, 8], [2, 5, 8],
        [0, 4, 8], [6, 4, 2]
    ];
    var plays = [];

    var activeBoard = [ 
        null,null,null,
        null,null,null,
        null,null,null 
    ];

    // var activeBoard = { 
    //     0:null, 1:null, 2:null,
    //     3:null, 4:null, 5:null,
    //     6:null, 7:null, 8:null 
    // };

    function setupWinScreen(winner, screenMessage) {
        var winner = winner;
        var screenMessage = screenMessage;

        //"screen-win-one", "screen-win-two", "screen-win-tie"
        $(screenWin).addClass("screen-win-" + winner);
        var message = document.querySelector(".message");
        message.textContent = screenMessage;
    }

    function resetGame() {
        var $box = $(".box");
        $box.each( function () {
            if ($box.hasClass("box-filled-1") || $box.hasClass("box-filled-2")) {
                $box.removeClass("box-filled-1");
                $box.removeClass("box-filled-2");
            }
        })
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

    
    const board = document.querySelector(".boxes");
    // board.addEventListener("mouseover", boxClick, false);
    board.addEventListener("click", boxClick, false);
    

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
            } else if (player === 2) {                  // Player "X"
                activeBoard[boxPos] = playerTwo;
                $clickedBox.addClass("box-filled-2");
                p1.className = "players active";
                p2.className = "players";
                player -= 1;
            }
        }
        console.log("Position " + boxPos);
        console.log(activeBoard);

        checkForWin(activeBoard, playerOne);
    }

    // --------------------------------------------------------------
    // CHECKFORWIN FUNCTION
    // --------------------------------------------------------------
    function checkForWin(board, player) {
        // debugger
        let plays = board.reduce( function(acc, el, index) {
            if(el === player) {
                return acc.concat(index);
            } else {
                return acc;
            }
        }, []);
        console.log(plays);
        
    }
