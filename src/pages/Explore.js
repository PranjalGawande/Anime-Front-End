import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import axios from "axios";

// import "./style.scss";

// import useFetch from "../../hooks/useFetch";
// import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../components/ContentWrapper";
import AnimeCard from "../components/AnimeCard";
import Spinner from "../components/Spinner";
import noResults from '../components/assets/no-results.png'

let filters = {};

const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
    const [data, setData] = useState({ pagination: {}, data: [] });
    // const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);
    const { mediaType } = useParams();

    // const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:9292/api/anime/explore?page=${pageNum}`);
                // const data = response.data;
                // setData(data);
                // setPageNum((prev => prev + 1));
                // setLoading(false);
                const newData = response.data;
                console.log("newData", newData);
                setData(prevData => ({
                    pagination: newData.pagination,
                    data: [...(prevData?.data || []), ...newData.data]
                }));
                setPageNum(prevPageNum => prevPageNum + 1);
                setTimeout(() => {
                   console.log("First Data", data); 
                }, 5000);
                
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
        setPageNum(1);
    }, []);

    const fetchNextPageData = async () => {
        try {
            const response = await axios.get(`http://localhost:9292/api/anime/explore?page=${pageNum}`).then((response) => {
                if (data?.data) {
                    setData({
                        ...data, data: [...data?.data, ...response.data.data]
                    })
                } else {
                    setData(response.data);
                }
                console.log("Nextdata", data);
                setPageNum((prev) => prev + 1);
            }
            );
        } catch (error) {
            console.error(error);
        }
    }

    // useEffect(() => {
    //     filters = {};
    //     setData(null);
    //     // setPageNum(1);
    //     setSortby(null);
    //     setGenre(null);
    //     // fetchInitialData();
    // }, []);

    // const onChange = (selectedItems, action) => {
    //     if (action.name === "sortby") {
    //         setSortby(selectedItems);
    //         if (action.action !== "clear") {
    //             filters.sort_by = selectedItems.value;
    //         } else {
    //             delete filters.sort_by;
    //         }
    //     }

    //     if (action.name === "genres") {
    //         setGenre(selectedItems);
    //         if (action.action !== "clear") {
    //             let genreId = selectedItems.map((g) => g.id);
    //             genreId = JSON.stringify(genreId).slice(1, -1);
    //             filters.with_genres = genreId;
    //         } else {
    //             delete filters.with_genres;
    //         }
    //     }

    //     setPageNum(1);
    //     fetchData();
    // };

    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        Explore Anime
                    </div>
                    {/* <div className="filters">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            // options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            // onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            // onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div> */}
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {data?.pagination?.items?.count > 0 ? (
                            <InfiniteScroll
                                className='content'
                                dataLength={data?.data?.length || []}
                                next={fetchNextPageData}
                                // hasMore={pageNum <= data?.pagination?.last_visible_page}
                                hasMore={pageNum <= data?.pagination?.last_visible_page && data?.pagination?.has_next_page}
                                loader={<Spinner />}
                            >
                                {data.data.map((item, index) => {
                                    return (
                                        <AnimeCard key={index} data={item} fromSearch={true} />
                                    )
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                                <img src={noResults} width={"50%"} alt='No results found' />
                            </span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Explore;
