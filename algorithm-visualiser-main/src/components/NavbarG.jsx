import React, { useEffect, useState } from "react";
import "../css/NavbarG.css";
import { useParams } from "../context/context";
import { BsGeoAlt, BsGeo, BsBricks, 
         BsVirus, BsArrowCounterclockwise, 
         BsCaretRight 
       } from "react-icons/bs";
import { PriorityQueue } from '@datastructures-js/priority-queue';

const Navbar = () => {
    const { algo, setAlgo, mode, setMode, reset, setReset, play, setPlay, grid, setEditing, setCost } = useParams();
    const [delay, setDelay] = useState(100);
    const [playState, setPlayState] = useState(false);

    useEffect(() => {
        setReset(!reset);
        setPlayState(false);
    }, [algo])

    const handleSelectChange = (e) => {
        setAlgo(e.target.value);
    }

    const handleModeChange = (e) => {
        //Use currentTarget to get "button" element else it will retrieve the SVG element.
        const modeVal = "set" + e.currentTarget.title;
        if(mode == null) setMode(modeVal);
        else {
            if (mode == modeVal)  setMode(null);
            else setMode(modeVal);
        }
    }

    const handleDelayChange = (e) => {
        setDelay(e.target.value);
    }

    const getStartAndTarget = () => {
        let start = null, target = null;
        for(let i = 0; i<grid.length; i++){
            for(let j = 0; j<grid[i].length; j++){
                if(grid[i][j].isStart) start = {row: i, col: j};
                else if(grid[i][j].isTarget) target = {row: i, col: j};
            }
        }

        return [start, target];
    }

    async function timeDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const updatePlayState = () => {
        let returnValue;
        if(play) returnValue = false;
        else returnValue = true;
        setPlay(returnValue);
        return returnValue;
    }

    const initializePi = () => {
        const pi = [];
        const [numRows, numCols] = [grid.length, grid[0].length];

        for (let i = 0; i < numRows; i++) {
            const cols = [];

            for (let j = 0; j < numCols; j++) {
                cols.push(null);
            }
            pi.push(cols);
        }
        return pi;
    }

    const tracePath = async (path) => {
        if (path.length < 2) {
            alert("Path from start node to target node doesn't exist!");
            setReset(!reset);
            return;
        }

        let cost = -1;

        for(let i = path.length-1; i>=0; i--){
            const { row, col } = path[i];
            grid[row][col].isVisited = false;
            grid[row][col].isPath = true;
            cost += grid[row][col].weight;
            setEditing(prevEditing => !prevEditing);
            await timeDelay(delay);
        }
        setCost(cost);
    }

    const getPathMap = (hashMap, target) => {
        const path = [];
        path.push(target);
        let descendant = hashMap.get(JSON.stringify(target));
        if(descendant == undefined) return path;
        let parsed = JSON.parse(descendant);
        while((parsed.row != -1) && (parsed.col != -1)){
            path.push(parsed);
            descendant = hashMap.get(JSON.stringify(parsed));
            parsed = JSON.parse(descendant);
        }

        return path;
    }

    const getPath = (pi, start, target) => {
        const path = [];
        const dest = target;

        while(start != target) {
            const {row, col} = target;
            const descendent = pi[row][col];

            if(descendent == null) {
                break;
            }
            path.push(descendent);
            target = descendent;
        }
        
        path.unshift(dest);
        return path;
    }

    const bfs = async (start, target) => {
        let queue = [];
        const pi = initializePi();

        queue.push([start, 0]);
        let level = 0;
        const targetRow = target.row, targetCol = target.col;
        while(queue.length){
            let front = queue.shift();
            const {row, col} = front[0];
            let currLevel = front[1];
            
            if(grid[row][col].isVisited || grid[row][col].isWall) continue;
            grid[row][col].isVisited = true;

            if(level!=currLevel){
                //re-render grid
                setEditing(prevEditing => !prevEditing);
                await timeDelay(delay);
                level = currLevel + 1;
            }
            
            if(row===targetRow && col===targetCol) break;

            if(row-1>=0 && !grid[row-1][col].isVisited) {
                queue.push([{row: row-1, col}, currLevel+1]);
                pi[row-1][col] = front[0];
            }
            if(col+1<grid[0].length && !grid[row][col+1].isVisited) {
                queue.push([{row, col: col+1}, currLevel+1]);
                pi[row][col+1] = front[0];
            }
            if(row+1<grid.length && !grid[row+1][col].isVisited) {
                queue.push([{row: row+1, col}, currLevel+1]);
                pi[row+1][col] = front[0];
            }
            if(col-1>=0 && !grid[row][col-1].isVisited) {
                queue.push([{row, col: col-1}, currLevel+1]);
                pi[row][col-1] = front[0];
            }
        }
        await timeDelay(delay);
        setEditing(prevEditing => !prevEditing);

        const path = getPath(pi, start, target);
        tracePath(path);
    }

    const dfs = async (start, target) => {
        const stk = [];
        const pi = initializePi();

        stk.push(start);
        while(stk.length) {
            let top = stk.pop();
            const {row, col} = top;
            
            if(!grid[row][col].isVisited && !grid[row][col].isWall) {
                grid[row][col].isVisited = true;

                //re-render grid
                setEditing(prevEditing => !prevEditing);
                await timeDelay(delay);

                if(row-1>=0 && !grid[row-1][col].isVisited) {
                    stk.push({row: row-1, col});
                    pi[row-1][col] = top;
                }
                if(col-1>=0 && !grid[row][col-1].isVisited) {
                    stk.push({row, col: col-1});
                    pi[row][col-1] = top;
                }
                if(row+1<grid.length && !grid[row+1][col].isVisited) {
                    stk.push({row: row+1, col});
                    pi[row+1][col] = top;
                }
                if(col+1<grid[0].length && !grid[row][col+1].isVisited) {
                    stk.push({row, col: col+1});
                    pi[row][col+1] = top;
                }
            }

            if(row===target.row && col===target.col) break;
        }

        const path = getPath(pi, start, target);
        tracePath(path);
    }

    const dijkstra = async (start, target) => {
        const rows = grid.length, cols = grid[0].length;

        //1e9 represents infinite value
        const distance = new Array(rows*cols).fill(1e9);

        //Elements with lower value should have higher priority.
        const pq = new PriorityQueue((a, b) => {
            return a[0] < b[0] ? -1 : 1;
          }
        );

        const hashMap = new Map();

        pq.enqueue([0, start, {
            row: -1,
            col: -1
        }]);

        while(!pq.isEmpty()){
            const minElement = pq.dequeue();

            const currDist = minElement[0];
            const { row, col } = minElement[1];
            const parent = minElement[2];
            const cell = row*cols + col;
            
            //If cell is already reached at a lower or equal distance, ignore.
            if(distance[cell]<=currDist || grid[row][col].isWall) continue;
            distance[cell] = currDist;
            
            grid[row][col].isVisited = true;
            setEditing(prevEditing=> !prevEditing);
            await timeDelay(100);
            
            //Add to hashMap
            hashMap.set(JSON.stringify(minElement[1]), JSON.stringify(parent));

            if(row==target.row && col==target.col) break;
            
            //Add adjacent nodes
            const weight = grid[row][col].weight;
            if(row+1<rows) pq.enqueue(([currDist + weight, {row: row+1, col}, {row, col}]));
            if(col+1<cols) pq.enqueue(([currDist + weight, {row, col: col+1}, {row, col}]));
            if(row-1>=0) pq.enqueue(([currDist + weight, {row: row-1, col}, {row, col}]));
            if(col-1>=0) pq.enqueue(([currDist + weight, {row, col: col-1}, {row, col}]));
        }

        const path = getPathMap(hashMap, target);
        tracePath(path);
    }

    const handlePlay = () => {
        if(play) return;

        //If algorithm is not chosen.
        if(algo=="" || algo=="none"){
            alert("Please choose an algorithm.");
            return;
        }
        const [start, target] = getStartAndTarget();

        //If start and target are not set.
        if(start==null || target==null) alert("Please choose a start and target location.");
        else{
            setPlayState(updatePlayState());
            setMode("playing");
            if(algo=="bfs"){
                bfs(start, target);
            }
            else if(algo=="dfs"){
                dfs(start, target);
            }
            else if(algo=="dijkstra"){
                dijkstra(start, target);
            }
        }

        //After running algo set play as false.
        setPlay(false);
    }

    return (
        <>
            <nav className="nav-container">
                <ul className="nav-item-container">
                    <li className="nav-item">
                        <button className={["nav-item-btn", mode=="setStart"?"selected":""].join(" ")} title="Start" onClick={handleModeChange} disabled={playState}><BsGeoAlt size={"20px"}/></button>
                    </li>
                    <li className="nav-item">
                        <button className={["nav-item-btn", mode=="setTarget"?"selected":""].join(" ")} title="Target" onClick={handleModeChange} disabled={playState}><BsGeo size={"20px"}/></button>
                    </li>
                    <li className="nav-item">
                        <button className={["nav-item-btn", mode=="setWall"?"selected":""].join(" ")} title="Wall" onClick={handleModeChange} disabled={playState}><BsBricks size={"20px"}/></button>
                    </li>
                    {(algo == "dijkstra")?
                    <li className="nav-item">
                        <button className={["nav-item-btn", mode=="setVirus"?"selected":""].join(" ")} title="Virus" onClick={handleModeChange} disabled={playState}><BsVirus size={"20px"}/></button>
                    </li> : ""}
                    <li className="nav-item">
                        <button className="nav-item-btn" onClick={() => {setReset(!reset); setPlay(false); setPlayState(false);}}><BsArrowCounterclockwise title="Restart" size={"20px"}/></button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-item-btn" onClick={() => handlePlay()} disabled={playState}><BsCaretRight title="Play" size={"20px"}/></button>
                    </li>
                    <li className="nav-item">
                        <select name="algoSelect" id="algoSelect" value={algo} onChange={(e) => handleSelectChange(e)}>
                            <option id="none" value="none">Select an algorithm:</option>
                            <option id="bfs" value="bfs">BFS</option>
                            <option id="dfs" value="dfs">DFS</option>
                            <option id="dijkstra" value="dijkstra">Dijkstra</option>
                        </select>
                    </li>
                    <li>
                        <input type="number" className="delay-input" placeholder="Delay" onChange={(e) => handleDelayChange(e)}></input>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;