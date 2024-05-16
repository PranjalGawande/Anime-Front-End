import React, { useState, useEffect } from "react";
import ContentWrapper from "./ContentWrapper";
import CircleRating from "./CircleRating";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReviewSection = ({ loading }) => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);
  const [review, setReview] = useState("");
  const [score, setScore] = useState("");
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const reviewsResponse = await axios.get(
        `http://localhost:9292/getComment?animeId=${id}`
      );
      setData(reviewsResponse.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(sessionStorage.getItem("token"));
    };
    // console.log("Token:", token);
    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleScoreChange = (e) => {
    setScore(e.target.value);
  };

  const handleSubmit = async () => {
    const scoreValue = parseFloat(score);

    if (scoreValue < 0 || scoreValue > 10) {
      toast.error("Score must be between 0 and 10.");
      return;
    }

    try {
      const reviewData = {
        animeId: id,
        rating: scoreValue,
        comment: review,
      };

      const header = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        "http://localhost:9292/addComment",
        reviewData,
        { headers: header }
      );

      // console.log("Response:", response.data);
      fetchData();
      toast.success("Review submitted successfully");
      setReview("");
      setScore("");
    } catch (error) {
      // console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    }
  };

  const handleShowLoginToast = () => {
    toast.error("Login to Add Review");
  };

  return (
    <div className="review-section">
      <ContentWrapper>
        <div className="sectionHeading">Reviews</div>
        <div className="review-container">
          <div className="review-list">
            {data.map((review, index) => (
              <div
                key={index}
                className={`p-2 ${
                  index !== data.length - 1 ? "border-bottom" : ""
                }`}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold d-flex align-items-center fs-5">
                    {review.name}
                  </span>
                  <div>
                    <p className="d-flex align-items-center pt-2">
                      <strong>Score: </strong>
                      <CircleRating rating={review.rating} />
                    </p>
                  </div>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>

          {token ? (
            <div className="submit-button-container border-top">
              <button
                className="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#reviewModal"
              >
                Submit Your Review
              </button>
            </div>
          ) : (
            <div className="submit-button-container border-top">
              <button
                className="btn btn-warning"
                type="button"
                onClick={handleShowLoginToast}
              >
                Submit Your Review
              </button>
            </div>
          )}
        </div>
      </ContentWrapper>

      <div
        className="modal fade"
        id="reviewModal"
        tabIndex="-1"
        aria-labelledby="reviewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="reviewModalLabel">
                Submit Your Review
              </h5>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="score">Score</label>
                <input
                  type="number"
                  id="score"
                  className="form-control"
                  value={score}
                  onChange={handleScoreChange}
                  min="0"
                  max="10"
                  step="0.5"
                />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="reviewText">Review</label>
                <textarea
                  id="reviewText"
                  className="form-control"
                  value={review}
                  onChange={handleReviewChange}
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
