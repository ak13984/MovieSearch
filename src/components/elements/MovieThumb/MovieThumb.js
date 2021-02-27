import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import "./MovieThumb.css"

function MovieThumb(props) {

    // const link= /`;
const newTo={
    pathname:`/${props.movieId}`,
    movieName: `${props.movieName}`
}
    return (
        <div className="rmdb-moviethumb">
            {props.clickable ? 
            <Link to={newTo}>
                    <img src={props.image} alt="moviethumb"/>       
            </Link>
     :
     <img src={props.image} alt="moviethumb"/>       
            }
     </div>
    )
}

export default withRouter(MovieThumb)
