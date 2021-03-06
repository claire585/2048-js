


function drawGame(game)
{
    var trRowList = document.querySelectorAll("table#gameGrid tr");
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

function updateGraphics()
{
    
}

let game = GameGrid();

window.onload = function()
{
    game.init();
    drawGame(game);
    window.onkeydown = function(event) {
        var temp = document.getElementById("keyType");
        temp.innerHTML = event.code;
        game.doTurn(event);
        drawGame(game);
    };
}
