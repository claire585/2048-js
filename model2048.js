function GameGrid()
{
    this.grid = [];
    for (let i = 0; i < 4; i++)
    {
        this.grid[i] = [" ", " ", " ", " "];
    }
    
    this.generateRandomTile = function()
    {
        var emptyTiles = [];
        for (let row = 0; row < 4; row++)
        {
            for (let col = 0; col < 4; col++)
            {
                if (grid[row][col] == " ")
                {
                    emptyTiles.push({"row" : row, "col" : col});
                }
            }
        }
        var rand = Math.floor(Math.random() * 4);
    }
    
    this.init = function()
    {
        
    }
    
    //up() will be called when the user slides all tiles upwards
    this.up = function()
    {
        for (let col = 0; col < 4; col++)
        {
            for (let row = 0; row < 4; row++)
            {
                //find nonempty tile in row
                if (grid[row][col] != " ")
                {
                    let temp = grid[row][col];
                    
                    //"slide" the nonempty tile upwards until
                    for (let temprow = row - 1; temprow >= 0; temprow--)
                    {
                        if (grid[temprow][col] == " ")
                        {
                            grid[temprow][col] = temp;
                            grid[row][col] = " ";
                        }
                        else
                        {
                            break;
                        }
                    }
                }
            }
        }
    };
    
    this.down = function()
    {
        for (let col = 0; col < 4; col++)
        {
            for (let row = 3; row >= 0; row--)
            {
                if (grid[row][col] != " ")
                {
                    let temp = grid[row][col];
                    for (let temprow = row; row < 4; row++)
                    {
                        if (grid[row][temprow] == " ")
                        {
                            grid[temprow][col] = temp;
                            grid[row][col] = " ";
                        }
                    }
                }
            }
        }
    };
}
