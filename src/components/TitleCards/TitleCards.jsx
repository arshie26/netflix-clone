import React, { useState } from 'react'
import './TitleCards.css'
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = (props) => {

  /* THE PURPOSE OF THIS COMPONENT IS TO RETRIEVE 
  A LIST OF MOVIES FROM AN API AND DISPLAY THEM */

  /* STATE VARIABLE FOR LIST OF MOVIES */
  const [moviesList, updateMoviesList] = useState([]);
  
  const cardsRef = useRef();

  /* USED TO SCROLL THROUGH THE MOVIES DISPLAY */
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWJiYjM0NWFmZTc1MTdhYTQwMDc3NDc2Yzg3NzQzYSIsIm5iZiI6MTc3NDk5ODg3MC41ODA5OTk5LCJzdWIiOiI2OWNjNTU1NmM4NTIzNGNlMjFlZDQ4NWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p7saNeGCv1MdcwDnZZr5Sr_uA1NlN_REjM06WOHDjCs'
    }
  };
  
  /* FUNCTION RETRIEVES MOVIES FROM API 
    AND PUTS THEM IN STATE VARIABLE*/
  async function getMovies(){
    
    try{

      let movies = await axios(`https://api.themoviedb.org/3/movie/${props.category? props.category:"now_playing"}`, options);
      console.log(movies.data.results);
      updateMoviesList(movies.data.results);
    }
    catch(error){
      console.log(error);
    }
  }

  /* RUNS GETMOVIES TO RETRIEVE MOVIES LIST
    WHEN COMPONENT MOUNTS */
  useEffect(() => {
    cardsRef.current?.addEventListener("wheel", handleWheel);
    getMovies();
    console.log("Movies List ", moviesList);
  }, [])

  return (
    <div className='title__cards'>
      <h2 className="movies__title">{props.title? props.title : "Popular on Netflix"}</h2>
      <div className="card-list" >
      {
        /* DISPLAYS EACH MOVIE IN THE LIST */
        moviesList?.map((card, index) => {
          return (
            <Link key={index} to={`/player/${card.id}`} >
            <div className="card" ref={cardsRef}>
              <img src={`https://media.themoviedb.org/t/p/w533_and_h300_face/${card.backdrop_path}`} className="movie__img" alt=""/>
              <h3 className="movie__title">{card.title}</h3>
            </div>
            </Link>
          )
        })
      }
      </div>
    </div>
  )
}

export default TitleCards
