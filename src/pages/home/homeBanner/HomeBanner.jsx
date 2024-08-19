import React, { useEffect, useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../component/lazyLoadImage/Img';
import ContentWrapper from '../../../component/contentWrapper/ContentWrapper';

const HomeBanner = () => {

    const [background, setbackground] = useState("");
    const [query, setquery] = useState("");
    const navigate=useNavigate();
    const {data,loading}=useFetch("/movie/upcoming");
    const {backdrop}=useSelector((state)=>state.home.url);
   useEffect(()=>{
        const bgImage=backdrop+
        data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
        setbackground(bgImage);
   },[data])
    const searchQueryHandle = (e) => {
        if(e.key==="Enter" && query.length>0){
            navigate(`/search/${query}`)
        }
    }

  return (
    <div className='heroBanner h-[450px] md:h-[700px]'>
        {
            !loading && <div className="backdrop-img">
            <img src={background ? background :""} alt="background-image" loading='lazy' />
            </div>
        }
        <div className="opacity-layer">

        </div>
        <ContentWrapper>
        <div className="wrapper">
            <div className="heroBannerContent">
                <span className="title mb-3 md:mb-0 md:text-8xl">Welcome.</span>
                <span className='subTitle md:text-2xl'>
                    Millions of movies, TV shows and people
                    to discover,
                    Explore now.
                 </span>
                 <div className="searchInput md:max-w-full max-w-[600px] mx-auto">
                    <input
                        type='text'
                        placeholder='Search for movie or TV show....'
                        onKeyUp={searchQueryHandle}
                        onChange={(e)=>setquery(e.target.value)}
                        className='text-black font-semibold text-lg 
                        md:w-[calc(100%-150px)] md:h-[60px] md:text-xl md:pb-7'
                    />
                    <button className='md:w-36 md:h-14 text-lg' onClick={()=>{
                        if(query.length>0){
                            navigate(`/search/${query}`)
                        }
                    }}>Search</button>
                 </div>
            </div>
        </div>
        </ContentWrapper>
       
        
    </div>
  )
}

export default HomeBanner