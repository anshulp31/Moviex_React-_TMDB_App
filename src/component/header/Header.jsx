import React, { useState } from 'react'
import './style.scss'
import logo from '../../assets/movix-logo.svg'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import { HiOutlineSearch } from "react-icons/hi";
import {SlMenu} from 'react-icons/sl';
import {VscChromeClose} from 'react-icons/vsc'
import { useNavigate } from 'react-router';


const Header = () => {
   
  const [show, setshow] = useState("top");
  const [lastScrollY, setlastScrollY] = useState(0);
  const [mobileMenu, setmobileMenu] = useState(false)
  const [query, setquery] = useState('');
  const [showSearch, setShowSearch] = useState("")
  const navigate=useNavigate();

  const openSearch=()=> {
      setmobileMenu(false);
      setShowSearch(true);
  }
  const openMobileMenu=()=>{
      setmobileMenu(true);
      setShowSearch(false);
  }
  const searchQueryHandle=(e)=>{
    if(e.key==="Enter" && query.length>0){
        setShowSearch(false);
        navigate(`/search/${query}`)
    }
  }

  const navigationHandle=(type)=>{
     navigate(`/explore/${type}`)
     setmobileMenu(false)
  }


  return (
    <div className={`fixed translate-y-0 w-screen h-16  z-10  header 
    flex items-center  transition-all ease-linear duration-300 ${mobileMenu ? "mobileView":""} top` }>
      <ContentWrapper>
          <div className='flex items-center justify-between '>
          <div>
            <img className='cursor-pointer h-[50px] ' onClick={()=>navigate("/")} src={logo} alt='headLogo'></img>
          </div>
          <ul className={`list-none md:flex hidden items-center  text-[20px] menuItems ${mobileMenu ?"menuItems ":""}`}>
            <div className={`md:h-[60px] h-auto flex items-center mb-4 text-white font-medium relative 
             gap-5 cursor-pointer md:flex-row flex-col `}>
              <li className={`hover:text-[#da2f68]  transition-all 
              duration-200 ${mobileMenu ?"menuItem":""}`}onClick={()=>navigationHandle("movie")} >Movies</li>
              <li className={`hover:text-[#da2f68] transition-all 
              duration-200 ${mobileMenu ?"menuItem":""}`} onClick={()=>navigationHandle("tv")}>TV Shows</li>
              <li className={`hover:text-[#da2f68] transition-all 
              duration-200 ${mobileMenu ?"menuItem":""}`}
                onClick={()=>setShowSearch(true)}
              ><HiOutlineSearch/></li>
            </div>
          </ul>
            <div className='flex items-center gap-5 text-white md:hidden text-xl'> 
              <HiOutlineSearch onClick={openSearch} />
              {mobileMenu ? (
                <VscChromeClose onClick={()=>setmobileMenu(false)}/>
              ):(
                <SlMenu onClick={openMobileMenu}/>
              )}
            </div>

            {
              showSearch && 
              <div className='searchBar'>
              <ContentWrapper>
                 <div className='flex items-center justify-between '>
                 <div className='searchInput'>
                      <input 
                        type="text" 
                        placeholder='Search for a movie or tv show...'
                        onChange={(e)=>setquery(e.target.value)} 
                        onKeyUp={searchQueryHandle}
                      />
                  </div>
                  <VscChromeClose
                    onClick={()=>setShowSearch(false)}
                  />
                 </div>
              </ContentWrapper>
            </div>
            }
          </div>


          
      </ContentWrapper>
      


    </div>
  )
}

export default Header