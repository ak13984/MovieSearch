import React from 'react'
import "./LoadMoreBtn.css"

function LoadMoreBtn(props) {
    return (
        <div className="rmdb-loadmorebtn" onClick={props.click}>
<p>{props.text}</p>
        </div>
    )
}

export default LoadMoreBtn
