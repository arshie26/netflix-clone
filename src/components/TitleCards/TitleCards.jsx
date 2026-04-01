import React, { useState } from 'react'
import './TitleCards.css'
import { useEffect, useRef } from 'react';
import axios from 'axios';
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = (props) => {

  const [moviesList, updateMoviesList] = useState([]);
  const cardsRef = useRef();

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

  useEffect(() => {
    //cardsRef.current.addEventListener("wheel", handleWheel);
    getMovies();
    console.log("Movies List ", moviesList);
  }, [])

  return (
    <div className='title-cards'>
      <h2 className="movies__title">{props.title? props.title : "Popular on Netflix"}</h2>
      <div className="card-list" >
      {
        moviesList?.map((card, index) => {
          return (
            <div className="card" key={index} ref={cardsRef}>
              <img src={`https://media.themoviedb.org/t/p/w533_and_h300_face/${card.backdrop_path}`} /*src={card.image}*/ className="movie__img" alt=""/>
              <h3 className="movie__title">{card.title}</h3>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default TitleCards
