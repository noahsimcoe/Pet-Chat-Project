// Review.js
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../../utils/mutations";

const Review = ({ services, deleteService }) => {
  const [reviewContent, setReviewContent] = useState("");
  const [createReview] = useMutation(CREATE_REVIEW);

  const getAuthenticatedUserId = () => {
    const token = localStorage.getItem('authToken');
  
    if (token) {
      try {
  
        const decodedToken = decode(token);
  
        return decodedToken.userId;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null; 
      }
    }
  
    return null; 
  };
  

  const userId = getAuthenticatedUserId();

  const handleReviewSubmit = async (serviceId) => {
    try {
      await createReview({
        variables: {
          serviceId,
          userId,
          comment: reviewContent,
        },
      });
      setReviewContent("");
      // You may want to refetch services or update the local cache here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="review-section">
      <div>
        <h4>Leave a Review:</h4>
        <textarea
          placeholder="Leave a review"
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
        />
        <button onClick={() => handleReviewSubmit(service._id)}>Leave Review</button>
      </div>
      <div>
        {services &&
          services.map((service, index) => (
            <div key={index} className="review-card">
              <h5>{service.name}</h5>
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
          ))}
      </div>
    </div>
  );
};

export default Review;
