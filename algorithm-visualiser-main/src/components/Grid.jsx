import React from 'react';
import "../css/Grid.css";
import { useParams } from '../context/context';
import { BsGeoAlt, BsGeo, BsBricks, BsVirus
        } from "react-icons/bs";
import { getUpdatedGrid } from '../utils/updatingGrid';

const Grid = ({ numRows, numCols }) => {
  const { mode, grid, editing, setEditing } = useParams();

  const tempRows = []

  for(let i = 0; i < grid.length; i++){
    const cells = [];
    for(let j = 0; j < grid[i].length; j++){
      const cell = grid[i][j];

      cells.push(
        <div 
          id={`${i}-${j}`} key={`${i}-${j}`} 
          className={["grid-cell", cell.isVisited?"visited":'', cell.isPath?"path":''].join(" ")}
          onClick={(e) => handleClick(e)}
        >
          {cell.isStart ? <BsGeoAlt /> : null}
          {cell.isTarget ? <BsGeo /> : null}
          {cell.isWall ? <BsBricks /> : null}
          {cell.weight>1 ? <BsVirus /> : null}
        </div>
      );
    }
    tempRows.push(<div key={i} className="grid-row">{cells}</div>);
  }


  const handleClick = (e) => {
      //Use e.currentTarget to get the grid-cell div and not the logo inside it.
      const id = e.currentTarget.id;
      const dimensions = id.split('-');
      const row = dimensions[0], col = dimensions[1];
      let flags = [false, false, false, false];

      if(mode=="setStart") {
        flags[0]=true;
      }else if(mode=="setTarget") {
        flags[1]=true;
      }else if(mode=="setWall") {
        flags[2]=true;
      }else if(mode=="setVirus") {
        flags[3]=true;
      }

      getUpdatedGrid(grid, row, col, flags);
      setEditing(1-editing);
  }

  return (
    <>
        <div style={{ '--rows': numRows, '--cols': numCols }} className="grid-container">
            {tempRows}
        </div>
    </>
  );
};

export default Grid;