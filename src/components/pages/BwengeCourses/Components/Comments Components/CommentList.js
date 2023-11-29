import { Comment } from "./Comment";
import "./comments.css";

export function CommentList({ comments, allComments, userCommentsHandler }) {
  console.log(allComments);
  return comments.map((comment) => (
    <div key={comment.id} className="comment-stack">
      <Comment
        id={comment.id}
        message={comment.message}
        creator={comment.creator}
        createdAt={comment.createdAt}
        likes={comment.likes}
        depth={comment.depth}
        parentId={comment.parentId}
        comments={allComments}
        userCommentsHandler={userCommentsHandler}
      />
    </div>
  ));
}
