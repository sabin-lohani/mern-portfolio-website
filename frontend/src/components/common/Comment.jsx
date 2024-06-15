import Moment from "react-moment";
import CommentActions from "./CommentActions";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "@/redux/slices/commentSlice";
import { useSelector } from "react-redux";

export default function Comment({ comment }) {
  const dispatch = useDispatch();
  const commentState = useSelector((state) => state.comment);
  function handleCommentDelete() {
    dispatch(deleteComment(comment._id));
  }
  function handleCommentUpdate(text) {
    dispatch(updateComment({ id: comment._id, text }));
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
    </div>
  );
}
