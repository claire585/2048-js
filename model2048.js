/*
    Constructor function for the GameGrid, which represents the current state of the 2048 game 
    grid as a 4-by-4 array.
*/  
function GameGrid()
{
    //A boolean value indicating if the game is over (player lost) or not
    this.gameOver = false;
    
    //grid == 2D, 4x4 array representing the game "board"
    this.grid = [];
    
    
    /*
        The init() method should be called after the GameGrid object is created and before the 
        user takes their first turn. 
        It can also be used to reset the GameGrid object so the user can play again after winning or losing.
        It initializes the game grid array and places two '2''s in random places on the grid.
        The parameter is a function to be called whenever graphics need to update.
        TODO: Make the graphicsUpdateFunction implement "sliding" animations for the tiles.
    */
    this.init = function(graphicsUpdateFunction)
    {
        gameOver = false;
        grid = [];
        for (let i = 0; i < 4; i++)
        {
            grid[i] = [" ", " ", " ", " "];
        }
        generateRandomTile();
        generateRandomTile();
        this.graphicsUpdateFunction = graphicsUpdateFunction;
    };
    
    
    /*
        findEmptyTiles() returns an array containing all empty tiles on the game grid.
        The return value is an array of objects of the form {row: <int>, col: <int>}.
    */
    this.findEmptyTiles = function()
    {
        let emptyTiles = [];
        
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
        let emptyTiles = findEmptyTiles();
        
        //Randomly select an empty tile and place a 2 in that tile
        let rand = Math.floor(Math.random() * emptyTiles.length);
        grid[emptyTiles[rand].row][emptyTiles[rand].col] = 2;
    };
    
    
    /*
        This method will be called whenever the user takes a turn by pressing an arrow key.
        The doTurn() method expects a KeyboardEvent as its parameter.
        If the key pressed to generate the KeyboardEvent was an arrow key, this method
        calls the appropriate method(s) to "slide" all tiles on the game grid in the 
        appropriate direction. It then calls generateRandomTile() to place a new number tile
        in a random empty space on the grid.
        
        If, after sliding all tiles and generating a random tile, the board is full, the game is over.
        If the game is over, doTurn() sets the gameOver property to true.
    */
    this.doTurn = function(keyboardEvent)
    {
        let tilesMoved = false;
        
        //For each possible arrow key:
            //Call the appropriate "move" method to slide all tiles in the specified direction.
            //Collapse the tiles in the specified direction by calling collapseTiles()
            //Call the "move" method once more to fill in any gaps caused by collapsing the tiles.
            
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
        
        //Check to see if there is any empty space in the grid.
        //If grid is full, game is over.
        if (findEmptyTiles().length === 0)
        {
            this.gameOver = true;
        }
        else
        {
            this.gameOver = false;
        }
    }
    
    /* 
        moveUp() will be called by the doTurn() method when the user slides all tiles upwards, 
        such as by pressing the up arrow key.  
        It returns the boolean value true if any tiles were moved, false otherwise.
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
                    
                    //"slide" the nonempty tile upwards
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
        moveDown() will be called by the doTurn() method when the user slides all tiles downwards, 
        such as by pressing the down arrow key.  
        It returns the boolean value true if any tiles were moved, false otherwise.
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
    
    /*
        moveLeft() will be called by the doTurn() method when the user slides all tiles to the left.
        It returns the boolean value true if any tiles were moved, false otherwise.
    */
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
    
    /*
        moveRight() will be called by the doTurn() method when the user slides all tiles to the right.
        It returns the boolean value true if any tiles were moved, false otherwise.
    */
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
    
    /*
        The collapseTiles() method is called by the doTurn() method after moveUp()/moveDown(),etc.
        Given a string parameter indicating the direction that the tiles were just moved, this method
        detects any instances of two tiles with the same number "colliding" with each other in the 
        specified direction and collapses them into one tile with the appropriate number label in the 
        same direction.
        Returns the boolean value true if any tiles were collapsed, false otherwise.
    */
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

