import React, { Component } from 'react'
import {API_URL,
    API_KEY,
    IMAGE_BASE_URL,
    BACKDROP_SIZE,
    POSTER_SIZE} from '../../config'
import HeroImage from '../elements/HeroImage/HeroImage'
import SearchBar from "../elements/SearchBar/SearchBar"
import FourColGrid from "../elements/FourColGrid/FourColGrid"
import MovieThumb from "../elements/MovieThumb/MovieThumb"
import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn"
import Spinner from "../elements/Spinner/Spinner"
import "./Home.css"


export default class Home extends Component {

    state={
movies:[],
heroImage:null,
loading:false,
currentPage:0,
totalPages:0,
searchTerm:''
    }


    componentDidMount(){
if(localStorage.getItem('HomeState')){
  
    const state = JSON.parse(localStorage.getItem('HomeState'));
    this.setState({...state})

}else{

        this.setState({loading:true});
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endpoint);
}    
    }


    searchItems=(searchTerm)=>{
        let endpt ='';
        this.setState({
            movies:[],
            loading:true,
            searchTerm
        });

        if(searchTerm === ''){
            endpt=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        }else{
            endpt=`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`
        }
        this.fetchItems(endpt);
    }

    loadMoreItems=()=>{
        let endpt = '';
        this.setState({loading:true});

        if(this.state.searchTerm === ''){
            endpt=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage+1}`;
        }else{
            endpt=`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage+1}`;
        }

        this.fetchItems(endpt)
    }

    fetchItems=(endpt)=>{
      fetch(endpt)
      .then(res=>res.json())
      .then(data=>{
this.setState({movies:[...this.state.movies,...data.results],
heroImage:this.state.heroImage||data.results[0],
loading:false,
currentPage:data.page,
totalPages:data.total_pages}
,
()=>{
    if(this.state.searchTerm === '')
    localStorage.setItem('HomeState',JSON.stringify(this.state));
}

)
      }).catch(err=>console.log(err))
    }

    render() {
        return (
            <div className="rmdb-home">
                {this.state.heroImage ?
               <div>
                <HeroImage image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}/${this.state.heroImage.backdrop_path}`}
                title={this.state.heroImage.original_title}
                text={this.state.heroImage.overview}/>
                <SearchBar callback={this.searchItems}/>
               </div> : null}
               <div className="rmdb-home-grid">
<FourColGrid header={this.state.searchTerm?'Search Result':'Popular Movies'}
loading={this.state.loading}>
            {this.state.movies.map((elem,ind)=>{
                 return <MovieThumb key={ind} clickable={true} 
                 image={elem.poster_path?`${IMAGE_BASE_URL}${POSTER_SIZE}/${elem.poster_path}`:
                './images/no_image.jpg'}
                 movieId={elem.id}
                 movieName={elem.original_title}
                />
            })}
            </FourColGrid>
               </div>
               {this.state.loading?<Spinner/>:null}
               {(!this.state.loading && this.state.currentPage<this.state.totalPages)?<LoadMoreBtn text="Load more" click={this.loadMoreItems}/>:null}
            </div>
        )
    }
}

// export default Home;