import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../../utils/mutations";

const Review = ({ service, deleteService }) => {
  const [reviewContent, setReviewContent] = useState("");
  const [createReview] = useMutation(CREATE_REVIEW);

  const getAuthenticatedUserId = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = decode(token);

        return decodedToken.userId;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }

    return null;
  };

  const userId = getAuthenticatedUserId();

  const handleReviewSubmit = async (serviceId) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="review-section">
      <div>
        {service && (
          <div className="review-card">
            <h5>Reviews:</h5>
            <div>
              <h4>Leave a Review:</h4>
              <textarea
                placeholder="Leave a review"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />
              <button onClick={() => handleReviewSubmit()}>Leave Review</button>
            </div>
            {service.reviews && service.reviews.length > 0 && (
              <div>
                <h6>Reviews:</h6>
                <ul>
                  {service.reviews.map((review, i) => (
                    <li key={i}>{review.comment}</li>
                  ))}
                </ul>
              </div>
            )}
            <button onClick={() => deleteService(service._id)}>🗑️</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
