import React, { useState } from 'react'
import ContentWrapper from '../../../component/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../component/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../component/carousel/Carousel'
const TopRated = () => {
    const [endPoint, setendPoint] = useState("movie")

    const {data,loading}=useFetch(`/${endPoint}/top_rated`)
    const onTabChange=(tab)=>{
        setendPoint(tab=="Movies"?"movie":"tv");
    }
    
  return (
   
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>
                Top Rated
            </span>
            <SwitchTabs data={["Movies","TV Show"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data} endpoint={endPoint} loading={loading}/>
    </div>
  )
}

export default TopRated