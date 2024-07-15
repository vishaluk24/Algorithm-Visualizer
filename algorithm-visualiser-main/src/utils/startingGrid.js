export function getGrid(numRows, numCols) {
    let grid = [];

    for(let i=0; i<numRows; i++) {
        let columns = [];

        for(let j=0; j<numCols; j++) {
            columns.push({
                x: i,
                y: j,
                isStart: false,
                isTarget: false,
                weight: 1,
                isWall: false,
                isVisited: false,
                isPath: false,
            });
        }
        grid.push(columns);
    }
    grid[Math.floor(numRows/2)][Math.floor(numCols/2)].isStart = true;
    grid[Math.floor(numRows/2 - 4)][Math.floor(numCols/2)].isTarget = true;

    return grid;
}