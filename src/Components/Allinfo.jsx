import React, {useState} from "react";
const Allinfo = ({stateName, year, avg_wage}) =>{
    console.log()
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