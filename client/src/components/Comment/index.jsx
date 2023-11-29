import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW, DELETE_REVIEW } from "../../utils/mutations";

const Comment = ({ serviceId, comments }) => {
  const [comment, setComment] = useState("");

  const [createReview] = useMutation(CREATE_REVIEW);
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      await createReview({
        variables: {
          userId: "",
          service: serviceId,

          comment: comment,
        },
      });

      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (reviewId) => {
    try {
      await deleteReview({
        variables: {
          reviewId: reviewId,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <button onClick={() => handleDeleteComment(comment._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Leave a comment..."
        />

        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default Comment;
