import React,{useState} from "react";
import { StarRating } from "./StarRating";
import {CommentStyle,StyleH3} from '../../style/product'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
const comments = [
  {text:"Producto Incrivel",rating:1,username:'josefa',date:'2020-04-10'},{text:"Produto horrivel",rating:4,username:'maria',date:"2021-03-07"}
  ,{text:"Nada a reclamar",rating:5,username:'marieta',date:'2021-03-11'}
]



export const Comments = ({  }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleComments = () => setIsOpen(!isOpen);
  

  return (
    <CommentStyle>
      <div 
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
        onClick={toggleComments}
      >
        <StyleH3>Comentários</StyleH3>
        <div>
          {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
        </div>
      </div>

  
      {isOpen && (
        <ul>
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <li data-testid="list_comments" key={index}>
                <StarRating reviews={[{ ratings: comment.rating }]} />
                <p>{comment.text}</p>
                <small>{comment.username} {new Date(comment.date).toLocaleDateString()}</small>
              </li>
            ))
          ) : (
            <p data-testid="no_comments">Sem comentários ainda.</p>
          )}
        </ul>
      )}
    </CommentStyle>
  );
};
