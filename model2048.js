function GameGrid()
{
    this.grid = [];
    this.graphicsUpdateFunction = function() {};
    for (let i = 0; i < 4; i++)
    {
        this.grid[i] = [" ", " ", " ", " "];
    }
    
    /*
        findEmptyTiles() returns an array containing all empty tiles on the game grid.
        The return value is an array of objects of the form {row: <int>, col: <int>}.
    */
    this.findEmptyTiles = function()
    {
        var emptyTiles = [];
        
        //Get a list of all empty tiles in the grid
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
        return emptyTiles;
    };
    
    /*
        generateRandomTile() will be called after the user moves the tiles each turn.
        This method will randomly select an empty tile in the game grid and place a 
            2 in that tile.
    */
    this.generateRandomTile = function()
    {
        var emptyTiles = findEmptyTiles();
        
        //Randomly select an empty tile and place a 2 in that tile
        var rand = Math.floor(Math.random() * emptyTiles.length);
        grid[emptyTiles[rand].row][emptyTiles[rand].col] = 2;
    };
    
    
    this.init = function(graphicsUpdateFunction)
    {
        generateRandomTile();
        generateRandomTile();
        this.graphicsUpdateFunction = graphicsUpdateFunction;
    };
    
    this.doTurn = function(keyboardEvent)
    {
        let tilesMoved = false;
        if (keyboardEvent.code == "ArrowUp")
        {
            tilesMoved |= moveUp();
            tilesMoved |= collapseTiles("UP");
            tilesMoved |= moveUp();
        }
        else if (keyboardEvent.code == "ArrowDown")
        {
            tilesMoved |= moveDown();
            tilesMoved |= collapseTiles("DOWN");
            tilesMoved |= moveDown();
        }
        else if (keyboardEvent.code == "ArrowLeft")
        {
            tilesMoved |= moveLeft();
            tilesMoved |= collapseTiles("LEFT");
            tilesMoved |= moveLeft();
        }
        else if (keyboardEvent.code == "ArrowRight")
        {
            tilesMoved |= moveRight();
            tilesMoved |= collapseTiles("RIGHT");
            tilesMoved |= moveRight();
        }
        
        if (tilesMoved)
        {
            generateRandomTile();
        }
    }
    
    /* 
        moveUp() will be called when the user slides all tiles upwards, such as by pressing
            the up arrow key.  
    */
    this.moveUp = function()
    {
        let moved = false;
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
                            grid[temprow + 1][col] = " ";
                            moved = true;
                        }
                        else
                        {
                            break;
                        }
                    }
                }
            }
        }
        return moved;
    };
    
    /* 
        moveDown() will be called when the user slides all tiles downwards, such as by pressing
            the down arrow key.  
    */
    this.moveDown = function()
    {
        let moved = false;
        for (let col = 0; col < 4; col++)
        {
            for (let row = 3; row >= 0; row--)
            {
                if (grid[row][col] != " ")
                {
                    let temp = grid[row][col];
                    for (let temprow = row + 1; temprow < 4; temprow++)
                    {
                        if (grid[temprow][col] == " ")
                        {
                            grid[temprow][col] = temp;
                            grid[temprow - 1][col] = " ";
                            moved = true;
                        }
                    }
                }
            }
        }
        return moved;
    };
    
    this.moveLeft = function()
    {
        let moved = false;
        for (let row = 0; row < 4; row++)
        {
            for (let col = 0; col < 4; col++)
            {
                if (grid[row][col] != " ")
                {
                    let temp = grid[row][col];
                    for (let tempcol = col - 1; tempcol >= 0; tempcol--)
                    {
                        if (grid[row][tempcol] == " ")
                        {
                            grid[row][tempcol] = temp;
                            grid[row][tempcol + 1] = " ";
                            moved = true;
                        }
                    }
                }
            }
        }   
        return moved;
    };
    
    this.moveRight = function() 
    {
        let moved = false;
        for (let row = 0; row < 4; row++)
        {
            for (let col = 3; col >= 0; col--)
            {
                if (grid[row][col] != " ")
                {
                    let temp = grid[row][col];
                    for (let tempcol = col + 1; tempcol < 4; tempcol++)
                    {
                        if (grid[row][tempcol] == " ")
                        {
                            grid[row][tempcol] = temp;
                            grid[row][tempcol - 1] = " ";
                            moved = true;
                        }
                    }
                }
            }
        }
        return moved;
    };
    
    this.collapseTiles = function(direction)
    {
        let moved = false;
        if (direction == "UP")
        {
            for (let col = 0; col < 4; col++)
            {
                for (let row = 0; row <= 2; row++)
                {
                    if (grid[row][col] != " " && grid[row + 1][col] == grid[row][col])
                    {
                        grid[row][col] += grid[row][col];
                        grid[row + 1][col] = " ";
                        moved = true;
                    }
                }
            }
        }//if
        else if (direction == "DOWN")
        {
            for (let col = 0; col < 4; col++)
            {
                for (let row = 3; row >= 1; row--)
                {
                    if (grid[row][col] != " " && grid[row - 1][col] == grid[row][col])
                    {
                        grid[row][col] += grid[row][col];
                        grid[row - 1][col] = " ";
                        moved = true;
                    }
                }
            }
        } //else if
        else if (direction == "RIGHT")
        {
            for (let row = 0; row < 4; row++)
            {
                for (let col = 3; col >= 1; col--)
                {
                    if (grid[row][col] != " " && grid[row][col - 1] == grid[row][col])
                    {
                        grid[row][col] += grid[row][col];
                        grid[row][col - 1] = " ";
                        moved = true;
                    }
                }
            }
        }//else if 
        else //direction == "LEFT" 
        {
            for (let row = 0; row < 4; row++)
            {
                for (let col = 0; col <= 2; col++)
                {
                    if (grid[row][col] != " " && grid[row][col] == grid[row][col + 1])
                    {
                        grid[row][col] += grid[row][col];
                        grid[row][col + 1] = " ";
                        moved = true;
                    }
                }
            }
        }//else
        return moved;
    };
    
    
    return this;
}


