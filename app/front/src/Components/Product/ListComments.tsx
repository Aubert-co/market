import type { Comments, Reviews } from "@/types/products.types";

type Props = {
  comments: Comments[];
  reviews:Reviews[]
};

export const ListComments = ({ comments ,reviews}: Props) => {
  return (
    <div className="comments">
      {comments.map((comment, index) => (
        <div key={index}>
          <div>
            {reviews[index].rating}
          </div>
          <div>{comment.name[0] + "*".repeat(comment.name.length - 1)}</div>
          <div>{comment.content}</div>
        </div>
      ))}
    </div>
  )
}