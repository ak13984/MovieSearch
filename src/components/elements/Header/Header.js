import React from 'react'
import {Link} from 'react-router-dom'
import "./Header.css"

const Header=()=>{
    return(
<div className="rmdb-header">
<div className="rmdb-header-content">
    <Link to = "/" style={{textDecoration:'none'}}>        
    <h1 className="heading">MovieSearch</h1>
</Link>
</div>
</div>
    )
}
export default Header;