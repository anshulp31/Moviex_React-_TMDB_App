import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { fetchDataFromApi } from './utils/api'
import { useSelector,useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import { Route, Routes } from 'react-router'
import Home from './pages/home/Home'
import SearchResult from './pages/searchResult/SearchResult'
import Header from './component/header/Header'
import { all } from 'axios'
import Footer from './component/footer/Footer'
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'


function App() {

  const dispatch=useDispatch();

  useEffect(() => {
    
    fetchDataFromApi('/configuration')
    .then((res)=>{
      const url={
        backdrop:res.images.secure_base_url+ 
        "original",
        poster:res.images.secure_base_url+
        "original",
        profile:res.images.secure_base_url+ 
        "original",
      }
      dispatch(getApiConfiguration(url));
    });
    genresCall(); 

  }, [])


  const genresCall=async()=>{
    let promises=[];
    let allGenres={};
    let endPoints=["tv","movie"];

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    })

    const data=await Promise.all(promises);
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id]=item))
    })
    dispatch(getGenres(allGenres));
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/explore/:mediaType" element={<Explore/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App
