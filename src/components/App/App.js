import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from "../elements/Header/Header"
import Home from "../Home/Home"
import NotFound from "../elements/NotFound/NotFound"
import Movie from '../Movie/Movie'

const App =()=>{

return(
    <>
    <BrowserRouter basename='/moviesearch/'>
        <Header/>
        <Switch>
<Route path="/" component={Home} exact/>
<Route path="/:movieId" component={Movie} exact/>
<Route component={NotFound}/>
        </Switch>
    </BrowserRouter>

    </>
)

}

export default App;
