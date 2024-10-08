import React from 'react'
import DetailsBanner from './detailsBanner/DetailsBanner'
import { useParams } from 'react-router'
import useFetch from '../../hooks/useFetch';
import Cast from './cast/Cast';
import VideosSection from './videosSection/VideosSection';
import Similar from './carousels/similar/Similar';
import Recommendation from './carousels/Recommandation/Recommand';

const Details = () => {
    const {mediaType,id}=useParams();
    const {data,loading}=useFetch(`/${mediaType}/${id}/videos`)
    const {data:credits,loading:creditsLoading}=useFetch(`/${mediaType}/${id}/credits`)
    
     
  return (
    <div>
        <DetailsBanner video={data?.results[0]} crew={credits?.crew}/>
        <Cast data={credits?.cast} loading={loading}/>
        <VideosSection data={data}/>
        <Similar mediaType={mediaType} id={id}/>
        <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details