import React, { useEffect, useState } from 'react'
import './Player.css'
import backArrow from '../../assets/back_arrow_icon.png';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [videoDetails, updateVideoDetails] = useState({});

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWJiYjM0NWFmZTc1MTdhYTQwMDc3NDc2Yzg3NzQzYSIsIm5iZiI6MTc3NDk5ODg3MC41ODA5OTk5LCJzdWIiOiI2OWNjNTU1NmM4NTIzNGNlMjFlZDQ4NWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p7saNeGCv1MdcwDnZZr5Sr_uA1NlN_REjM06WOHDjCs'
    }
  };

  /* GETS VIDEO */
  async function getVideo(){
    try{
      console.log("getting video");
      let videoDetails = await axios(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
      updateVideoDetails(
        {
          key: videoDetails.data?.results[0].key, 
          date: videoDetails.data?.results[0].published_at,
          title: videoDetails.data?.results[0].name,
          type: videoDetails.data?.results[0].type   
        }
      );
    }
    catch(error){
      console.log("error ", error);
    }
    console.log(videoDetails.data?.results[0]);
    console.log(videoDetails.data?.results[0].published_at.slice(0,10));
  }

  useEffect(() => {
    getVideo();
  }, [])

  return (
    <div className='player'>
        <img src={backArrow} className='back__arrow' onClick={navigate(-2)} /> 
        <iframe referrerpolicy="strict-origin-when-cross-origin" src={`https://www.youtube.com/embed/${videoDetails.key}`} 
          title='trailer' allowFullScreen  ></iframe>
      <div className="player__info">
        <p>{videoDetails.date?.slice(0,10)}</p>
        <p>{videoDetails.title}</p>
        <p>{videoDetails.type}</p>
      </div>
    </div>
  )
}

export default Player
