import React from "react";
import { StarRating } from "./StarRating";
import {CommentStyle} from '../../style/product'

const comments = [
  {text:"Producto Incrivel",rating:1},{text:"Produto horrivel",rating:4},{text:"Nada a reclamar",rating:5}
]

export const Comments = () => {
  return (
    <CommentStyle>
      <h3>Comentários</h3>
    
      <ul>
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <li key={index}>
              <StarRating reviews={[{ratings:comment.rating}]}/>
              <p>{comment.text}</p>
              <small>{new Date(comment.date).toLocaleString()}</small>
            </li>
          ))
        ) : (
          <p>Sem comentários ainda.</p>
        )}
      </ul>
    </CommentStyle>
  );
};
