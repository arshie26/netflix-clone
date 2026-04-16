import React, {useRef, useEffect} from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import cards_data from '../../assets/cards/Cards_data'

const Home = (props) => {

  return (
    <div>
      <Navbar user={props.user} />
      <div className="hero">
        <img src={hero_banner} className='banner__img'/>
        <div className='hero__caption'>
          <img src={hero_title} className='caption__img'/>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id facilis
             explicabo perferendis inventore voluptatem culpa harum, consequatur similique ducimus 
             eligendi reiciendis quibusdam magnam. Placeat velit cum dignissimos itaque deserunt?
          </p>
          <div className="hero__btns">
            <button className="btn"><img src={play_icon} alt="" />Play</button>
            <button className="btn dark-btn"><img src={info_icon} alt="" />Info</button>
          </div>
          <div className="popular">
            <TitleCards title="Featured on Netflix" />
          </div>
        </div>
      </div>
      <div className="blockbusters">
        <TitleCards title={"Blockbuster Movies"} category="top_rated" />
        <TitleCards title={"Only on Netflix"} category="popular" />
        <TitleCards title={"Upcoming"} category="upcoming" />
        <TitleCards title={"Top Pics for You"} category="now_playing" />
      </div>
      
      <Footer />
    </div>
  )
}

export default Home
