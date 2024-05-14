import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import dayjs from "dayjs";
import axios from "axios";

// import "./style.scss";

import ContentWrapper from "./ContentWrapper";
// import useFetch from "../../../hooks/useFetch";
// import Genres from "../../../components/genres/Genres";
// import CircleRating from "./CircleRating";
// import Img from "../../../components/lazyLoadImage/Img.jsx";
// import PosterFallback from "../../../assets/no-poster.png";
import NoImagePlaceholder from "./assets/No-Image-Placeholder.png";
import LazyloadImg from "./LazyloadImg";
import CircleRating from "./CircleRating";
import VideoPopup from "./VideoPopup";

const AnimeDetailsBanner = ({ data, stats, loading }) => {
    // const [loading, setLoading] = useState(false);
    const { id } = useParams();
    console.log("id", id);
    // const [data, setData] = useState([]);
    // console.log("data", data);
    // const [statsData, setStatsData] = useState([]);
    // const [charactersData, setCharactersData] = useState([]);
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);


    // const genres = data?.genres?.map((genre) => genre.name);
    const genres = data?.genres ? data.genres.map((genre) => genre.name) : [];
    const themes = data?.themes ? data.themes.map((theme) => theme.name) : [];
    console.log("genres", genres);
    // const themes = data?.themes?.map((theme) => theme.name);
    console.log("themes", themes);

    // useEffect(() => {
    //     const fetchAnimeDetails = async () => {
    //         setLoading(true);
    //         console.log("useEffect")
    //         try {
    //             const response = await axios.get(`http://localhost:9292/api/anime/details/${id}`);
    //             const data = response?.data?.data;
    //             console.log("Anime details",data);
    //             setData(data);
    //         } catch (error) {
    //             console.error(error);
    //             fetchAnimeDetails();
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchAnimeDetails();
    // }, [id]);

    // useEffect(() => {
    //     const fetchStats = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await axios.get(`http://localhost:9292/api/anime/anime-stats/${id}`);
    //             const statsdata = response.data.data;
    //             console.log(statsdata);
    //             setStatsData(statsdata);
    //         } catch (error) {
    //             console.error(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchStats();
    // }, [id]);


    // useEffect(() => {
    //     const fetchCharacters = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await axios.get(`http://localhost:9292/api/anime/characters-list/${id}`);
    //             const charactersData = response.data.data;
    //             console.log(charactersData);
    //             setCharactersData(charactersData);
    //         } catch (error) {
    //             console.error(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchCharacters();
    // }, [id]);

    // const producers = data?.producers?.map((producer) => producer?.name);
    const producers = (data?.producers || []).map((producer) => producer?.name);
    console.log("producers", producers);
    // const toHoursAndMinutes = (totalMinutes) => {
    //     const hours = Math.floor(totalMinutes / 60);
    //     const minutes = totalMinutes % 60;
    //     return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    // };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <LazyloadImg
                                    src={data?.images?.jpg?.large_image_url}
                                // alt={data?.title}
                                // className="backdrop"
                                // placeholder={NoImagePlaceholder}
                                />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    {/* <img src={data?.images?.jpg?.large_image_url} alt={data.title} /> */}
                                    <div className="left">
                                        {data?.images ? (
                                            <LazyloadImg
                                                className={"Img"}
                                                src={data?.images?.jpg?.large_image_url}
                                                // alt={data.title}
                                                placeholder={NoImagePlaceholder}
                                            />
                                        ) : (
                                            <LazyloadImg
                                                className={"Img"}
                                                src={NoImagePlaceholder}
                                            // alt={data.title}
                                            // placeholder={NoImagePlaceholder}
                                            />
                                        )}
                                        <div class="card mb-3">
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Type:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.type}
                                                </span>
                                            </div>
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Episodes:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.episodes}
                                                </span>
                                            </div>
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Episode Duration:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.duration}
                                                </span>
                                            </div>
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Status:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.status}
                                                </span>
                                            </div>
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Aired:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.aired?.string}
                                                </span>
                                            </div>
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Season:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.season ? data?.season?.charAt(0).toUpperCase() + data.season.slice(1) : ''}
                                                </span>
                                            </div>
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Score:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.score}
                                                </span>
                                            </div>
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Scored By:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.scored_by}
                                                </span>
                                            </div>
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Source:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.source}
                                                </span>
                                            </div>



                                            {/* Error prone reading undefined */}
                                            {data.studios && <div className="infoItem">
                                                <span className="text bold">
                                                    Studio:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.studios?.map((studio) => studio.name).join(", ")}
                                                </span>
                                            </div>}

                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {data?.title_english ? data?.title_english : data?.title}
                                        </div>
                                        <div className="subtitle">
                                            {data?.title}
                                        </div>
                                        {/* <Genres data={geners} /> */}
                                        <div className="genres">
                                            <span className="text bold">
                                                Genres:{" "}
                                            </span>
                                            <span className="text">
                                                {genres?.map((genre) => (
                                                    <span className="badge rounded-pill text-bg-secondary mx-1">
                                                        {genre}
                                                    </span>
                                                ))}
                                            </span>
                                        </div>
                                        <div className="genres">
                                            <span className="text bold">
                                                Themes:{" "}
                                            </span>
                                            <span className="text">
                                                {themes?.map((theme) => (
                                                    <span className="badge rounded-pill text-bg-secondary mx-1">
                                                        {theme}
                                                    </span>
                                                ))}
                                            </span>
                                        </div>
                                        <div className="row">
                                            <CircleRating rating={data?.score} />
                                            {/* <span className="text fw-semibold w-auto ml-5">Score</span> */}
                                            <div
                                                className="playbtn fw-semibold"
                                                onClick={() => {
                                                    setShow(true);
                                                    setVideoId(data?.trailer?.youtube_id);
                                                }}
                                            >
                                                <svg
                                                    version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    x="0px"
                                                    y="0px"
                                                    width="70px"
                                                    height="70px"
                                                    viewBox="0 0 213.7 213.7"
                                                    enableBackground="new 0 0 213.7 213.7"
                                                    xmlSpace="preserve"
                                                >
                                                    <polygon
                                                        className="triangle"
                                                        fill="none"
                                                        strokeWidth="7"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit="10"
                                                        points="73.5,62.5 148.5,105.8 73.5,149.1 "
                                                    ></polygon>
                                                    <circle
                                                        className="circle"
                                                        fill="none"
                                                        strokeWidth="7"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit="10"
                                                        cx="106.8"
                                                        cy="106.8"
                                                        r="103.3"
                                                    ></circle>
                                                </svg>
                                                <span className="text">
                                                    Watch Trailer
                                                </span>
                                            </div>
                                        </div>
                                        <div className="overview">
                                            <div className="heading">
                                                Synopsis
                                            </div>
                                            <div className="description">
                                                {data?.synopsis}
                                            </div>
                                        </div>
                                        {data?.background && (<div className="overview">
                                            <div className="heading">
                                                Background
                                            </div>
                                            <div className="description">
                                                {data?.background}
                                            </div>
                                        </div>)
                                        }
                                        {/* <div className="info">
                                            {data.status && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Status:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data.aired && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Aired:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data.aired?.string}
                                                    </span>
                                                </div>
                                            )}
                                            {data.episodes && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Episodes:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data.episodes}
                                                    </span>
                                                </div>
                                            )}
                                            {data.duration && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Duration:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data.duration}
                                                    </span>
                                                </div>
                                            )}
                                        </div> */}

                                        {!!stats.watching && (
                                            <div className="status-distribution">
                                                <span className="d-flex justify-content-start text bold">Status Distribution</span>
                                                <div className="status-bars">
                                                    <div className="status-bar bg-primary-subtle">
                                                        <div className="status-bar-label text-primary">Watching</div>
                                                        {/* <div className="status-bar-fill" style={{ width: '80%' }}> */}
                                                        {stats.watching} users
                                                        {/* </div> */}
                                                    </div>
                                                    <div className="status-bar bg-success-subtle">
                                                        <div className="status-bar-label text-success">Completed</div>
                                                        {/* <div className="status-bar-fill" style={{ width: '80%' }}> */}
                                                        {stats.completed} users
                                                        {/* </div> */}
                                                    </div>
                                                    <div className="status-bar bg-warning-subtle">
                                                        <div className="status-bar-label text-warning">Planning</div>
                                                        {/* <div className="status-bar-fill" style={{ width: '10%' }}> */}
                                                        {stats.plan_to_watch} users
                                                        {/* </div> */}
                                                    </div>
                                                    <div className="status-bar bg-info-subtle">
                                                        <div className="status-bar-label text-info">On Hold</div>
                                                        {/* <div className="status-bar-fill" style={{ width: '4%' }}> */}
                                                        {stats.on_hold} users
                                                        {/* </div> */}
                                                    </div>
                                                    <div className="status-bar bg-danger-subtle">
                                                        <div className="status-bar-label text-danger">Dropped</div>
                                                        {/* <div className="status-bar-fill" style={{ width: '2%' }}> */}
                                                        {stats.dropped} users
                                                        {/* </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        }


                                        {!!data && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Anime Producers:{" "}
                                                </span>
                                                <span className="text">
                                                    {producers?.map((item, i) => (
                                                        <span key={i} >
                                                            {item}
                                                            {item.length - 1 !== i && ", "}
                                                        </span>
                                                    ))
                                                    }
                                                </span>
                                            </div>
                                        )
                                        }
                                    </div>
                                </div>
                                <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
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
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default AnimeDetailsBanner;