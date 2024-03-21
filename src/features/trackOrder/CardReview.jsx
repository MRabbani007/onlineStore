import React, { useState } from "react";

const CardReview = () => {
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="comment">Comment</label>
        <textarea
          name=""
          id="comment"
          cols="30"
          rows="10"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="outline-none border-2"
        ></textarea>
        <button className="btn btn-yellow">Submit</button>
      </form>
    </div>
  );
};

export default CardReview;
