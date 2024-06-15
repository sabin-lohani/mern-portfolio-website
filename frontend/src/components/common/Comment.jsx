import Moment from "react-moment";
import CommentActions from "./CommentActions";
import { useDispatch } from "react-redux";
import {
  deleteComment,
  toggleCommentLike,
  updateComment,
} from "@/redux/slices/commentSlice";
import { Button } from "../ui/button";

export default function Comment({ comment }) {
  const dispatch = useDispatch();
  function handleCommentDelete() {
    dispatch(deleteComment(comment._id));
  }
  function handleCommentUpdate(text) {
    dispatch(updateComment({ id: comment._id, text }));
  }
  function toggleLike() {
    dispatch(toggleCommentLike({ item_id: comment._id }));
  }

  return (
    <div className="my-3 p-2 border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={comment.user.image}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />

          <p className="text-sm font-semibold">{comment.user.name}</p>
          <div className="text-xs text-gray-500 flex gap-2">
            {comment.edited && "(edited)"}
            <Moment fromNow>{comment.updatedAt}</Moment>
          </div>
        </div>
        <CommentActions
          comment={comment}
          handleCommentDelete={handleCommentDelete}
          handleCommentUpdate={handleCommentUpdate}
        />
      </div>
      <div className="ml-8 px-2">
        <p>{comment.text}</p>
      </div>
      {comment.likeCount > 0 && (
        <div className="text-sm ml-8 px-2">
          <p className="text-right">
            {comment.likeCount} like{comment.likeCount > 1 ? "s" : ""}
          </p>
        </div>
      )}

      <div className="ml-8 p-2">
        {!comment.hasLiked ? (
          <Button variant="link" className="text-sm p-0" onClick={toggleLike}>
            Like
          </Button>
        ) : (
          <Button
            variant="link"
            className="text-blue-700 text-sm p-0"
            onClick={toggleLike}
          >
            Unlike
          </Button>
        )}
      </div>
    </div>
  );
}
