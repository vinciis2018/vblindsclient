import React from 'react';
import { Link } from 'react-router-dom';

import Rating from './Rating';


export default function Advert(props) {

  const { advert } = props;
  return (
    <div key={advert._id} className="card">
      <Link to={`/asset/${advert._id}`}>
        <img className="medium" src={advert.thumbnail} alt={advert.name} />
      </Link>
      <div className="card-body">
        <Link to={`/asset/${advert._id}`}>
          <h2>{advert.name}</h2>
        </Link>
        <Rating
          rating={advert.rating}
          numReviews={advert.numReviews}
        ></Rating>
        <div className="row">
          <div>
            <Link to={`/master/${advert.uploader}`}>
              {advert.uploaderName}
            </Link>
          </div>
        </div>
      </div>
       
    </div>
  )
};
