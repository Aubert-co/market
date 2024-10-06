import React from "react";

const comments = [
  {text:"ok"},{text:"tudo certo"},{text:"ola"}
]

export const Comments = () => {
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
