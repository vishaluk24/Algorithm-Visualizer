export function getUpdatedGrid(grid, row, col, flags) {
    // flags = [isStart, isTarget, isWall, isVirus]

    let updatedGrid = grid;
    if (flags[0]) {
        //If current cell is neither a target, nor a wall nor a virus:
        if (!grid[row][col].isTarget && !grid[row][col].isWall && !(grid[row][col].weight > 1)) {
            if (grid[row][col].isStart) updatedGrid[row][col].isStart = false;
            else {
                //If any other grid cell is marked as Start, unmark it.
                for (let i = 0; i < grid.length; i++) {
                    for (let j = 0; j < grid[i].length; j++) {
                        if (grid[i][j].isStart) updatedGrid[i][j].isStart = false;
                    }
                }
                //Mark the current row, col.
                updatedGrid[row][col].isStart = true;
            }
        }
    } else if (flags[1]) {
        // If current cell is neither a start, nor a wall nor a virus:
        if (!grid[row][col].isStart && !grid[row][col].isWall && !(grid[row][col].weight > 1)) {
            if (grid[row][col].isTarget) updatedGrid[row][col].isTarget = false;
            else {
                //If any other grid cell is marked as Start, unmark it.
                for (let i = 0; i < grid.length; i++) {
                    for (let j = 0; j < grid[i].length; j++) {
                        if (grid[i][j].isTarget) updatedGrid[i][j].isTarget = false;
                    }
                }
                //Mark the current row, col.
                updatedGrid[row][col].isTarget = true;
            }
        }
    } else if (flags[2]) {
        //If current cell is neither a start, nor a target nor a virus:
        if (!grid[row][col].isStart && !grid[row][col].isTarget && !(grid[row][col].weight > 1)) {
            //If current cell is wall
            if (grid[row][col].isWall) updatedGrid[row][col].isWall = false;
            //Else
            else updatedGrid[row][col].isWall = true;
        }
    }
    else if (flags[3]) {
        //If current cell is neither a start, nor a target nor a wall:
        if (!grid[row][col].isStart && !grid[row][col].isTarget && !grid[row][col].isWall) {
            if (grid[row][col].weight > 1) updatedGrid[row][col].weight = 1;
            else updatedGrid[row][col].weight = 50;
        }
    }
    return updatedGrid;
}