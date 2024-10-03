import React from "react";



export const Comments = ({ comments }) => {
  return (
    <div>
      <h3>Comentários</h3>
    
      <ul>
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <li key={index}>
              <p>{comment.text}</p>
              <small>{new Date(comment.date).toLocaleString()}</small>
            </li>
          ))
        ) : (
          <p>Sem comentários ainda.</p>
        )}
      </ul>
    </div>
  );
};
