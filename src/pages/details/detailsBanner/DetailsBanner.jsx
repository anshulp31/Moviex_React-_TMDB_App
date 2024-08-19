import React, { useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import './style.scss'
import { useParams } from 'react-router'
import ContentWrapper from '../../../component/contentWrapper/ContentWrapper'
import Img from '../../../component/lazyLoadImage/Img'
import PosterFallback from '../../../assets/no-poster.png'
import Genres from '../../../component/Genres'
import CircularRating from '../../../component/CircularRating'
import { PlayIcon } from './PlayBtn'
import VideoPopUp from '../../../component/videoPopUp/PopUp'


const DetailsBanner = ({video,crew}) => {

    const [show, setshow] = useState(false);
    const [videoId, setvideoId] = useState(null)

    const {mediaType,id}=useParams();
    const {data,loading}=useFetch(`/${mediaType}/${id}`)
    const {url}=useSelector(state=>state.home);
    const _genres=data && data.genres.map((g)=>g.id);
    const director=crew?.filter((f)=>f.job==="Director");
    const writer=crew?.filter((f)=>f.job==="Screenplay" ||
     f.job==="Writer" ||f.job==="Story")

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
      <div className="detailsBanner">
        {!loading ? (
          <>
            {!!data && (
              <React.Fragment>
                <div className="backdrop-img">
                  <Img src={url.backdrop + data.backdrop_path} />
                </div>
                <div className="opacity-layer"></div>
                <ContentWrapper>
                  <div className="content">
                    <div className="left">
                      {data.poster_path ? (
                        <Img
                          src={url.backdrop + data.poster_path}
                          className="posterImg"
                        />
                      ) : (
                        <Img src={PosterFallback} className="posterImg" />
                      )}
                    </div>
                    <div className="right">
                      <div className="title">
                        {`${data.name || data.title}
                                        (${dayjs(data.release_date).format(
                                          "YYYY"
                                        )})`}
                      </div>
                      <div className="subtitle">{data.tagline}</div>
                      <Genres data={_genres} />

                      <div className="row">
                        <CircularRating rating={data.vote_average.toFixed(1)} />
                        <div
                          className="playbtn"
                          onClick={() => {
                            setshow(true);
                            setvideoId(video.key);
                          }}
                        >
                          <PlayIcon />
                          <span className="text">Watch Trailer</span>
                        </div>
                      </div>
                      <div className="overview">
                        <div className="heading">Overview</div>
                        <div className="description">{data.overview}</div>
                      </div>
                      <div className="info">
                        {data.status && (
                          <div className="infoItem">
                            <span className="text bold">Status : </span>
                            <span className="text">{data.status}</span>
                          </div>
                        )}
                        {data.release_date && (
                          <div className="infoItem">
                            <span className="text bold">Release Date : </span>
                            <span className="text">
                              {dayjs(data.release_date).format("MMM D, YYYY")}
                            </span>
                          </div>
                        )}
                        {data.runtime && (
                          <div className="infoItem">
                            <span className="text bold">Runtime : </span>
                            <span className="text">
                              {toHoursAndMinutes(data.runtime)}
                            </span>
                          </div>
                        )}
                      </div>
                      {director?.length > 0 && (
                        <div className="info">
                          <span className="text bold">Director : </span>
                          <span className="text">
                            {director.map((d, ind) => (
                              <span key={ind}>
                                {d.name}
                                {director.length - 1 !== ind && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                      {writer?.length > 0 && (
                        <div className="info">
                          <span className="text bold">Writer : </span>
                          <span className="text">
                            {writer.map((d, ind) => (
                              <span key={ind}>
                                {d.name}
                                {writer.length - 1 !== ind && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                      {data?.created_by?.length > 0 && (
                        <div className="info">
                          <span className="text bold">Creator : </span>
                          <span className="text">
                            {data?.created_by?.map((d, ind) => (
                              <span key={ind}>
                                {d.name}
                                {data?.created_by?.length - 1 !== ind && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <VideoPopUp
                    show={show}
                    setshow={setshow}
                    videoId={videoId}
                    setvideoId={setvideoId}
                  />
                </ContentWrapper>
                
              </React.Fragment>
            )}
          </>
        ) : (
          <div className="detailsBannerSkeleton">
            <ContentWrapper>
              <div className="left skeleton"></div>
              <div className="right">
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
              </div>

            </ContentWrapper>
          </div>
        )}
      </div>
    );
}

export default DetailsBanner