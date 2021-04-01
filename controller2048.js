


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

function updateGraphics(direction, curX, curY)
{
    let row = document.querySelectorAll("#gameGrid tr")[curY];
    let tile = row[curX];
    
}



function testGridColors()
{
    var rows = document.querySelectorAll("#gameGrid tr td");
    for (let i = 0; i < rows.length; i++)
    {
        if ( (2 ** (i + 1)) <= 2048)
        {
            rows[i].innerHTML = 2 ** (i + 1);
            rows[i].className = `num${2 ** (i + 1)}`;
        }
    }
}

let game = GameGrid();



window.onload = function()
{
    game.init();
    drawGame(game);
    window.onkeydown = function(event) {
        game.doTurn(event);
        drawGame(game);
    };
    //testGridColors();
    
}
