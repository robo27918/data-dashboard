import React, {useState} from "react";
const Allinfo = ({key ,stateName, year, avg_wage}) =>{
    //console.log("key from Allinfo ",key)
    return (
        <li>
            <div className="list-container">
            
                    <div className="column"> {stateName}</div>
                    <div className="column">{year}</div>
                    <div className="column">$ {avg_wage.toFixed(2)}</div>
            
            </div>
        </li>
    )
}
export default Allinfo;