import NavbarG from '../components/NavbarG';
import Grid from '../components/Grid';
import { useParams } from '../context/context';
import { useEffect } from 'react';
import CostBox from '../components/Costbox';

function Graphs() {
  const { windowWidth, setWindowWidth, rows, setRows, cols, setCols, algo, cost} = useParams();
  setWindowWidth(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if(windowWidth<800){
      setRows(20);
      setCols(15);
    }
    else{
      setRows(25);
      setCols(42);
    }
  }, [windowWidth]);
  
  // console.log(useParams());

  return (
    <>
      <NavbarG />
      <Grid numRows={rows} numCols={cols}/>
      {(algo == "dijkstra") ? <CostBox cost={cost} /> : ""}
    </>
  )
}

export default Graphs
