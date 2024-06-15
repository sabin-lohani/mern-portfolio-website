import { Button } from "../ui/button";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import handleShare from "@/utils/handleShare";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

export default function EngagementButtons({
  item,
  onLike,
  commentsLink,
  shareData,
}) {
  const { user } = useAuth();
  return (
    <div>
      <div className="flex justify-between p-2 text-sm">
        <div className={`${item.likeCount > 0 ? "visible" : "invisible"}`}>
          {item.likeCount + " like" + (item.likeCount > 1 ? "s" : "")}
        </div>
        <div
          className={`${item.comments?.length > 0 ? "visible" : "invisible"}`}
        >
          {item.comments?.length +
            " comment" +
            (item.comments?.length > 1 ? "s" : "")}
        </div>
      </div>
      <Separator />
      <div className="my-1 flex gap-1">
        {user && (
          <Button
            className="gap-1 w-full"
            variant="ghost"
            onClick={() => {
              user ? onLike() : toast.error("Please login to like the post");
            }}
          >
            {item.hasLiked ? (
              <AiFillLike size={20} />
            ) : (
              <AiOutlineLike size={20} />
            )}
            <span className="hidden md:block">Like</span>
          </Button>
        )}
        <Button className="gap-1 w-full" variant="ghost" asChild>
          <Link to={commentsLink}>
            <AiOutlineComment size={20} />
            <span className="hidden md:block">Comment</span>
          </Link>
        </Button>
        <Button
          className="gap-1 w-full"
          variant="ghost"
          onClick={() =>
            handleShare(shareData.title, shareData.text, shareData.url)
          }
        >
          <AiOutlineShareAlt size={20} />
          <span className="hidden md:block">Share</span>
        </Button>
      </div>
      <Separator />
    </div>
  );
}
