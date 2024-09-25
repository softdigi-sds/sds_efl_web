import React from 'react'
import { StarRatingProps } from './SmartGeneralInterface';


const StarRating:React.FC<StarRatingProps> = (props) => {

    const{rating,totalStars}=props
   
  return (
    <div className="star-rating has-text-grey">
        {[...Array(totalStars)].map((star, index) => {
            const fullStars = Math.floor(rating);
            const isHalfStar = rating - fullStars >= 0.5 && index === fullStars;

            return (
                <span key={index} className="star">
                    {index < fullStars ? (
                        <i className="fa fa-star has-text-warning" />
                    ) : isHalfStar ? ( 
                         <i className="fa fa-star-half-o has-text-warning" />
                   
                    ) : 
                    (
                         <i className="fa fa-star-o has-text-grey" />
                    )}
                </span>
            );
        })}
        {rating}
    </div>
  )
}

export default StarRating
