import React, { useState,useEffect } from 'react'
import { fetchDataFromApi } from '../utils/api';

const useFetch = (url) => {
  const [data, setdata] = useState(null);
  const [error,setError]=useState(null);
  const [loading, setloading] = useState(null);

  useEffect(()=>{
    setloading('loading...');
    setError(null);
    setdata(null);
    fetchDataFromApi(url).
    then((res)=>{
        setloading(false)
        setdata(res);
    }).catch((err)=>setError("Something went wrong"))
  },[url])

  return {data,error,loading}
}

export default useFetch