import React from 'react';

export default function RatingXL(props) {
  const { rating, } = props;
  return (
    <div className="ratingxl">
      <span>
        <i
          className={
            rating >= 1
              ? 'fa fa-heart'
              : rating >= 0.5
              ? 'fa fa-heart-half-o'
              : 'fa fa-heart-o'
          }
        ></i>
      </span>
      <span />
      <span />
      <span />
      <span />
      <span />
      <span>
        <i
          className={
            rating >= 2
              ? 'fa fa-heart'
              : rating >= 1.5
              ? 'fa fa-heart-half-o'
              : 'fa fa-heart-o'
          }
        ></i>
      </span>
      <span />
      <span />
      <span />
      <span />
      <span />
      <span>
        <i
          className={
            rating >= 3
              ? 'fa fa-heart'
              : rating >= 2.5
              ? 'fa fa-heart-half-o'
              : 'fa fa-heart-o'
          }
        ></i>
      </span>
      <span />
      <span />
      <span />
      <span />
      <span />
      <span>
        <i
          className={
            rating >= 4
              ? 'fa fa-heart'
              : rating >= 3.5
              ? 'fa fa-heart-half-o'
              : 'fa fa-heart-o'
          }
        ></i>
      </span>
      <span />
      <span />
      <span />
      <span />
      <span />
      <span>
        <i
          className={
            rating >= 5
              ? 'fa fa-heart'
              : rating >= 4.5
              ? 'fa fa-heart-half-o'
              : 'fa fa-heart-o'
          }
        ></i>
      </span>
    </div>
  );
}