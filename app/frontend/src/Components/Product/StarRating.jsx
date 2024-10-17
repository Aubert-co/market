import React from "react";
import { FaStarHalfAlt,FaStar ,FaRegStar} from "react-icons/fa";


const getValues = (values) => {
    if (values > 5) return 5;
    if (values < 0) return 0;
    return values;
};

export const StarRating = ({reviews}) => {
    if (!reviews || reviews.length === 0) return <p>Sem avaliações ainda.</p>;
    
    const totally = reviews.reduce((total, review) => total + review.ratings, 0);
    const values = totally / reviews.length;
    const totalStars = getValues(values); 

 
    const array = Array.from({ length: 5 }, (_, index) => {
        if (index < Math.floor(totalStars)) {
          
            return (
                <span data-testid="full_star" key={index} style={{ color: 'gold' }}>
                    <FaStar />
                </span>
            );
        } 
         if (index < totalStars && totalStars % 1 !== 0) {
       
            return (
                <span data-testid="half_star" key={index} style={{ color: 'gold' }}>
                    <FaStarHalfAlt />
                </span>
            );
        } 
  
            return (
                <span data-testid="empty_star" key={index} style={{ color: 'gray' }}>
                    <FaRegStar />
                </span>
            );
        
    });

    return <>{array}</>;
};