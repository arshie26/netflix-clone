import React from 'react'
import './TitleCards.css'
import { useEffect, useRef } from 'react';
import cards_data from '../../assets/cards/Cards_data'

const cardsRef = useRef();

const handleWheel = (event) => {
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(() => {
  cardsRef.current.addEventListener("wheel", handleWheel);
})

const TitleCards = (props) => {
  return (
    <div className='title-cards'>
      <h2 className="movies__title">Popular on Netflix</h2>
      <div className="card-list" ref={cardsRef}>
      {
        cards_data.map((card, index) => {
          return (
            <div className="card" key={index}>
              <img src={card.image} className="movie__img" alt=""/>
              <h3 className="movie__title">{card.name}</h3>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default TitleCards
