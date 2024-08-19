import React from 'react'
import './style.scss'
import HomeBanner from './homeBanner/HomeBanner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './top-rated/TopRated'

const Home = () => {
  return (
    <div className="homePage">
        <HomeBanner/>
        <Trending/>
        <Popular/>
        <TopRated/>
    </div>
  )
}

export default Home