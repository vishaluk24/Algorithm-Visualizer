import React from "react";
import "../css/CostBox.css";

const CostBox = (props) => {

    return (
        <div className="costBox">
            <h3 className="costBox-item">Cost of the path is: {props.cost}</h3>
        </div>
    );
}

export default CostBox;