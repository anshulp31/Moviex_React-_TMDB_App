import React, { useEffect, useState } from 'react'
import './style.scss'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../../utils/api'
import Spinner from '../../component/spinner/Spinner'
import ContentWrapper from '../../component/contentWrapper/ContentWrapper'
import InfiniteScroll from 'react-infinite-scroll-component'
import MovieCard from '../../component/movieCard/MovieCard'

const SearchResult = () => {
  const {query}=useParams();
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(false);
  const [pageNo,setPageNo]=useState(1);
  const initialFetch=()=>{
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNo}`)
    .then((res)=>{
      setData(res)
      setPageNo((prev)=>prev+1);
      setLoading(false)
    })
    .catch((err)=>new Error(err));
  }
  const fetchNextPageData=()=>{
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNo}`)
    .then((res)=>{
      if(data?.results){
        setData({
          ...data,
          results:[...data?.results,...res.results]
        })
      }else{
        setData(res);
      }
      setPageNo((prev)=>prev+1);
    })
  }
  useEffect(()=>{
    initialFetch();
  },[query])
  return (
    <div className="searchResultsPage">
        {loading && <Spinner initial={true} />}
        {!loading && (
            <ContentWrapper>
                {data?.results?.length > 0 ? (
                    <>
                        <div className="pageTitle">
                            {`Search ${
                                data?.total_results > 1
                                    ? "results"
                                    : "result"
                            } of '${query}'`}
                        </div>
                        <InfiniteScroll
                            className="content"
                            dataLength={data?.results?.length || []}
                            next={fetchNextPageData}
                            hasMore={pageNo <= data?.total_pages}
                            loader={<Spinner />}
                        >
                            {data?.results.map((item, index) => {
                                if (item.media_type === "person") return;
                                return (
                                    <MovieCard
                                        key={index}
                                        data={item}
                                        fromSearch={true}
                                    />
                                );
                            })}
                        </InfiniteScroll>
                    </>
                ) : (
                    <span className="resultNotFound">
                        Sorry, Results not found!
                    </span>
                )}
            </ContentWrapper>
        )}
    </div>
);
}

export default SearchResult