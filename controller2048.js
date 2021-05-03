/*
    drawGame() takes a GameGrid (model) object as the parameter and uses the data stored in it
    to populate the HTML table representing the GUI game grid in the index.html file.
*/
function drawGame(game)
{
    let trRowList = document.querySelectorAll("table#gameGrid tr");
    for (let row = 0; row < 4; row++)
    {
        let colTiles = trRowList[row].querySelectorAll("td");
        for (let col = 0; col < 4; col++)
        {
            colTiles[col].innerHTML = game.grid[row][col];
            colTiles[col].className = "num" + game.grid[row][col];
        }
    }
}

//TODO: Better "sliding" animations for tiles.
function updateGraphics(gameGridObj)
{
    drawGame();
}


/*
    Debug function.
    Show all tile numbers and colors in the HTML table/GUI game grid.
*/
function testGridColors()
{
    let rows = document.querySelectorAll("#gameGrid tr td");
    for (let i = 0; i < rows.length; i++)
    {
        if ( (2 ** (i + 1)) <= 2048)
        {
            rows[i].innerHTML = 2 ** (i + 1);
            rows[i].className = `num${2 ** (i + 1)}`;
        }
    }
}


//game is the "model" object containing the representation of the 2048 game board and the methods to 
//  manipulate the game board data.
//See model2048.js
let game = GameGrid();
let gameOver = '';

/*
    When the page loads, start up the game.
*/
window.onload = function()
{
    let gameOverScreen = document.getElementById('popup');
    game.init(updateGraphics);
    drawGame(game);
    
    //When user presses a key, check if it's an arrow key--if yes, do a turn and redraw the gameboard.
    window.onkeydown = function(event) {
        if (event.code == 'ArrowUp' || event.code == 'ArrowDown')
        {
            event.preventDefault();
        }
        game.doTurn(event);
        drawGame(game);
        if (game.gameOver === true)
        {
            gameOverScreen.className = 'show';
        }
    };
    
    //Set onclick listener for the OK button on the "Game Over!" popup--reset the game and dismiss popup
    let playAgainButton = document.getElementById('playAgainButton');
    playAgainButton.onclick = function()
    {
        let gameOverScreen = document.getElementById('popup');
        if (gameOverScreen.className === 'show')
        {
            gameOverScreen.className = 'hidden';
            game.init(updateGraphics);
            drawGame(game);
        }
    };
}
