import React, { useEffect, useState } from 'react';
import "../css/SortVisualiser.css";
import { useParams } from "../context/context";

const SortVisualiser = () => {
  const { bars } = useParams();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getElement = (bar) => {
    if(screenWidth<1000){
      if(bars.length>10) return '';
      else return bar.element;
    }
    else{
      if(bars.length>40) return '';
      else return bar.element;
    }
  }

  const generateClasses = (bar) => {
    let classes = "bar ";
    if(bar.underEvaluation){
      classes += "under-evaluation ";
    }
    if(bar.completed){
      classes += "completed ";
    }
    if(bar.special){
      classes += "special ";
    }
    if(bar.smaller){
      classes += "smaller ";
    }

    return classes;
  }

  return (
    <>
      <div className="sort-visualiser-main">
        <div className="bar-container">
          {bars.map((bar, idx)=> {
            return <div
                    key={idx}
                    id={`bar-${idx}`}
                    className={generateClasses(bar)}
                    style={{
                      height: `calc((70vh / 1000) * ${bar.element})`,
                      width: `calc(95vw / ${bars.length})`
                    }}
                  >{getElement(bar)}</div>
          })}
        </div>
      </div>
    </>
  )
}

export default SortVisualiser
