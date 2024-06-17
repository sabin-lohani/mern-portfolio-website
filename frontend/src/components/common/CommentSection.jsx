import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createComment, getComments } from "@/redux/slices/commentSlice";

export default function CommentSection({ itemId, itemType }) {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const commentState = useSelector((state) => state.comment);

  function onComment(e) {
    e.preventDefault();
    dispatch(
      createComment({
        item_id: itemId,
        item_type: itemType,
        text: comment,
      })
    );
  }

  useEffect(() => {
    dispatch(getComments({ item_id: itemId, item_type: itemType }));
  }, [itemId, dispatch]);
  useEffect(() => {
    setComment("");
  }, [commentState.comments]);

  return (
    <div className="my-5">
      {user && (
        <form className="flex my-3" onSubmit={onComment}>
          <img src={user.image} alt="avatar" className="w-8 h-8 rounded-full" />
          <Textarea
            placeholder="Write a comment..."
            className="mx-2"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></Textarea>
          <Button
            className={"bg-blue-700 hover:bg-blue-800 "}
            type="submit"
            disabled={!comment || commentState.isLoading}
          >
            {commentState.isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Comment"
            )}
          </Button>
        </form>
      )}
      <Separator />
      <div>
        {!user && (
          <p className="pt-3 font-semibold text-sm text-blue-700 text-center">
            Login to post your comment
          </p>
        )}
        {commentState.comments.length > 0 ? (
          commentState.comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
        ) : (
          <p className="text-center my-3">No comments yet</p>
        )}
      </div>
    </div>
  );
}
