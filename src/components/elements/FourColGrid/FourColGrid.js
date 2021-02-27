import React, { Component } from 'react'
import "./FourColGrid.css"

const FourColGrid=(props)=>{


const renderElements=()=>{
    const gridElements = props.children;
    gridElements.map((elem,ind)=>{
        return(
            <div key={ind} className="rmdb-grid-element">
                {elem}
            </div>
        )
    })
return gridElements;
}

    return(
        <div className="rmdb-grid">
            {props.header && !props.loading ? <h1>{props.header}</h1>:null}
            <div className="rmdb-grid-content">
                {renderElements()}
            </div>
        </div>
    )
}
export default FourColGrid