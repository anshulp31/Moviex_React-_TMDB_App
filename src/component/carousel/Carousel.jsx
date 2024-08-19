import React from 'react'
import "./style.scss"
import { BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from '../lazyLoadImage/Img';
import PosterImage from '../../assets/no-poster.png'
import dayjs from 'dayjs';
import { useRef } from 'react';
import CarouselCard from '../carouselItem/CarouselCard';
import CircularRating from '../CircularRating';
import Genres from '../Genres';

const Carousel = ({data,loading,endpoint,title}) => {
    console.log("data", data)
    const carouselContainer=useRef();
    const navigate=useNavigate();
    const {url}=useSelector((state)=>state.home);
    const navigation=(dir)=>{
        const container=carouselContainer.current;
        const scrollAmount =
             dir === "left"
            ? container.scrollLeft - (container.offsetWidth + 20)
            : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    }
    const skItem=()=>{
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton">
                    <div className="textBlock">
                        <div className="title skeleton">
                            
                        </div>
                        <div className='date skeleton'></div>
                    </div>
                </div>
            </div>
        )
    }
  return (
    <div className='carousel'>
        <ContentWrapper>
         {title && <div className="carouselTitle">{title}</div>}
            <BsFillArrowLeftCircleFill
                className='carouselLeftNav arrow left-0'
                onClick={()=>navigation("left")}
            />
            <BsFillArrowRightCircleFill
                className='carouselrightNav arrow right-[30px] '
                onClick={()=>navigation("right")}
            />
            {!loading ?(
                <div className="carouselItems" ref={carouselContainer}>
                    {
                        data?.results?.map((item)=>{
                            const posterUrl=item.poster_path ?
                            url.poster + item.poster_path : PosterImage;
                           return ( 
                            <div key={item.id}
                                 className="carouselItem"
                                 onClick={()=>{
                                    navigate(`/${item.media_type ?item.media_type :endpoint }/${item?.id}`)
                                 }}
                            >
                                <div className='posterBlock'>
                                    <Img src={posterUrl}/>
                                    <CircularRating rating={item.vote_average.toFixed(1)}/>
                                    <Genres data={item?.genre_ids.slice(0,2)}/>
                                 </div>   
                                 <div className="textBlock">
                                    <span className="title">
                                        {item.title || item.name}
                                    </span>
                                    <span className="date">
                                        {dayjs(item.released_date).format("MMM D, YYYY")}
                                    </span>
                                 </div>
                             </div>
                            )
                        })
                    }
                </div>
            ):(
               <div className="loadingSkeleton">
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
               </div>
            )}
        </ContentWrapper>
    </div>
  )
}

export default Carousel